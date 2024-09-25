import { Column } from "@tanstack/react-table";
import { useMemo } from "react";
import Multiselect from "../../MultiSelect/MultiSelect";

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
    <Multiselect
      selectedValues={columnFilterValue || []}
      setSelectedValues={(filters) => column.setFilterValue(filters)}
      options={sortedUniqueValues}
    />
  );
};

export default Filter;
