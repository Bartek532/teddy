import * as Airtable from "airtable";

export const getBase = ({ apiKey, id }: { apiKey: string; id: string }) => {
  const airtable = new Airtable({ apiKey });
  return airtable.base(id);
};

export const getTable = ({
  apiKey,
  base: baseId,
  table,
}: {
  apiKey: string;
  base: string;
  table: string;
}) => {
  const base = getBase({ apiKey, id: baseId });
  return base(table);
};
