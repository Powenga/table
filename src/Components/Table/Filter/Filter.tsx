import { useMemo, useState } from "react";
import { Column } from "@tanstack/react-table";
import { Popover } from "@mui/material";
import classNames from "classnames";
import Multiselect from "../../MultiSelect/MultiSelect";

import classes from "./Filter.module.css";

const POPOVER_ID = "filter_popover_id";

interface Props<T> {
  column: Column<T, unknown>;
}

const Filter = <T,>(props: Props<T>) => {
  const { column } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const columnFilterValue = column.getFilterValue() as string[];

  const sortedUniqueValues = useMemo(
    () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className={classNames(
        classes.filter,
        !!anchorEl && classes["filter_is-open"],
        columnFilterValue && classes["filter_has-filters"]
      )}
    >
      <button
        type="button"
        className={classes["filter__button"]}
        aria-label="Открыть фильтр"
        onClick={handleClick}
      />
      <Popover
        id={POPOVER_ID}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Multiselect
          selectedValues={columnFilterValue || []}
          setSelectedValues={(filters) => column.setFilterValue(filters)}
          options={sortedUniqueValues}
        />
      </Popover>
    </div>
  );
};

export default Filter;
