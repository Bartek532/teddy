import * as Airtable from "airtable";

export const getBase = ({
  apiKey,
  baseId,
}: {
  apiKey: string;
  baseId: string;
}) => {
  const airtable = new Airtable({ apiKey });
  return airtable.base(baseId);
};

export const getTable = ({
  apiKey,
  baseId,
  table,
}: {
  apiKey: string;
  baseId: string;
  table: string;
}) => {
  const base = getBase({ apiKey, baseId });
  return base(table);
};
