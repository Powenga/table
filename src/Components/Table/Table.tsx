import { useState } from "react";
import classNames from "classnames";
import {
  AccessorKeyColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedUniqueValues,
  getFacetedRowModel,
  ColumnFiltersState,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";
import HeaderContent from "./HeaderContent/HeaderContent";

import classes from "./Table.module.css";

interface Props<T> {
  data: T[];
  columns: AccessorKeyColumnDef<T, string>[];
  enableColumnResizing?: boolean;
  className?: string;
}

export const Table = <T,>(props: Props<T>) => {
  const { data, columns, enableColumnResizing = false, className } = props;

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      sorting,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    enableColumnResizing,
    columnResizeMode: "onChange",
  });

  return (
    <table className={classNames(classes.table, className)}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className={classes["table__header"]}
                style={{ width: header.getSize() }}
              >
                <HeaderContent header={header} />
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
