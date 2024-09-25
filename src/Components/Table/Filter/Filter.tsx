import { Column } from "@tanstack/react-table";
import { useMemo } from "react";

interface Props<T> {
  column: Column<T, unknown>;
}

const Filter = <T,>(props: Props<T>) => {
  const { column } = props;

  const columnFilterValue = column.getFilterValue() as string[];

  const sortedUniqueValues = useMemo(
    () =>
      Array.from(column.getFacetedUniqueValues().keys()).sort().slice(0, 5000),
    [column.getFacetedUniqueValues()]
  );

  return (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      <option value="">Все</option>
      {sortedUniqueValues.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default Filter;
