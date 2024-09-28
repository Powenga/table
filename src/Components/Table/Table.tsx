import { useState } from "react";
import classNames from "classnames";
import { Stack, Pagination } from "@mui/material";
import {
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
  ColumnDef,
} from "@tanstack/react-table";
import HeaderContent from "./HeaderContent/HeaderContent";

import classes from "./Table.module.css";
import { useRenderCount } from "../../hooks/useRenderCount";

const DEFAULT_PAGESIZE = 10;

interface Props<T> {
  data: T[];
  columns: ColumnDef<T, string>[];
  enableColumnResizing?: boolean;
  pageSize?: number;
  className?: string;
}

export const Table = <T,>(props: Props<T>) => {
  const {
    data,
    columns,
    enableColumnResizing = false,
    pageSize = DEFAULT_PAGESIZE,
    className,
  } = props;
  const renders = useRenderCount();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
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
    enableRowSelection: true,
    enableColumnResizing,
    columnResizeMode: "onChange",
    debugTable: true,
  });

  return (
    <>
      {renders}
      <table className={classNames(classes.table, className)}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <HeaderContent
                  key={header.id}
                  header={header}
                  className={classes["table__header"]}
                />
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
      <div className={classes["table__pagination"]}>
        <Stack spacing={2}>
          <Pagination
            count={table.getPageCount()}
            variant="outlined"
            shape="rounded"
            onChange={(_event, value) => {
              setPagination((pagination) => ({
                ...pagination,
                pageIndex: value - 1,
              }));
            }}
            page={pagination.pageIndex + 1}
          />
        </Stack>
      </div>
    </>
  );
};
