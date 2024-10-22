type HTTPMethod =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE"
  | "PATCH";

interface FetcherConfig<S> {
  readonly method: HTTPMethod;
  readonly body?: object;
  readonly config?: RequestInit;
  readonly credentials?: "include" | "same-origin" | "omit";
  readonly headers?: Record<string, string>;
}

export async function fetcher<S>(
  path: string,
  { method = "GET", body, config, credentials, headers }: FetcherConfig<S>,
) {
  try {
    const response = await fetch(path, {
      ...config,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      credentials,
      method,
      ...(body && { body: JSON.stringify(body) }),
    });
    if (response.ok) {
      return response;
    }

    throw new ResponseError(
      response.statusText || "Something went wrong during fetching!",
      response.status,
    );
  } catch (err) {
    if (err instanceof ResponseError) {
      throw err;
    }
    throw new ResponseError("Something went wrong during fetching!");
  }
}

export class ResponseError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = "ResponseError";
    Object.setPrototypeOf(this, ResponseError.prototype);
  }
}
