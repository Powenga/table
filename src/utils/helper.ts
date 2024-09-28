import { Row } from "@tanstack/react-table";

export const removeEmptyFields = (
  obj: Record<string, string | null | undefined>
) => {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
      delete obj[key];
    }
  }
};

export const multiSelectFilterFunction = <T>(
  row: Row<T>,
  columnId: string,
  filterValue: string[]
) => {
  if (!filterValue?.length) {
    return true;
  }
  return filterValue.includes(row.getValue(columnId));
};
