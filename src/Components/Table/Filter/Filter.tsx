import { Column } from "@tanstack/react-table";
import { useMemo, useRef, useState } from "react";
import Multiselect from "../../MultiSelect/MultiSelect";
import classNames from "classnames";
import classes from "./Filter.module.css";
import { useHandleClickOutside } from "../../../hooks/useHandleClickOutside";
import { useHandleEscKeydown } from "../../../hooks/useHandleEscKeydown";

interface Props<T> {
  column: Column<T, unknown>;
}

const Filter = <T,>(props: Props<T>) => {
  const { column } = props;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useHandleClickOutside(containerRef, handleClose);
  useHandleEscKeydown(handleClose);

  const columnFilterValue = column.getFilterValue() as string[];

  const sortedUniqueValues = useMemo(
    () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  function handleClose() {
    setIsOpen(false);
  }

  function toogleOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <div
      ref={containerRef}
      className={classNames(
        classes.filter,
        isOpen && classes["filter_is-open"],
        columnFilterValue && classes["filter_has-filters"]
      )}
    >
      <button
        type="button"
        className={classes["filter__button"]}
        aria-label="Открыть фильтр"
        onClick={toogleOpen}
      />
      {isOpen && (
        <div className={classes["filter__container"]}>
          <Multiselect
            selectedValues={columnFilterValue || []}
            setSelectedValues={(filters) => column.setFilterValue(filters)}
            options={sortedUniqueValues}
          />
        </div>
      )}
    </div>
  );
};

export default Filter;
