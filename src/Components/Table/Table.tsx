import {
  AccessorKeyColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedUniqueValues,
  getFacetedRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import classes from "./Table.module.css";
import { useState } from "react";
import Filter from "./Filter/Filter";

interface Props<T> {
  data: T[];
  columns: AccessorKeyColumnDef<T, string>[];
  enableColumnResizing?: boolean;
}

export const Table = <T,>(props: Props<T>) => {
  const { data, columns, enableColumnResizing = false } = props;

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    enableColumnResizing,
    columnResizeMode: "onChange",
  });

  return (
    <table className={classes.table}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className={classes["table__header"]}
                style={{ width: header.getSize() }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                {header.column.getCanFilter() ? (
                  <div>
                    <Filter column={header.column} />
                  </div>
                ) : null}
                {header.column.getCanResize() && (
                  <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`${classes["table__resizer"]} ${
                      header.column.getIsResizing()
                        ? classes["table__resizer_is-resizing"]
                        : ""
                    }`}
                  />
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className={classes["table__body"]}>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                className={classes["table__cell"]}
                key={cell.id}
                style={{ width: cell.column.getSize() }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
