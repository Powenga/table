import { Dispatch, useState } from "react";
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
  RowSelectionState,
} from "@tanstack/react-table";
import HeaderContent from "./HeaderContent/HeaderContent";
import { useRenderCount } from "../../lib";

import classes from "./Table.module.css";

const DEFAULT_PAGESIZE = 10;

interface Props<T> {
  data: T[];
  columns: ColumnDef<T, string>[];
  enableColumnResizing?: boolean;
  pageSize?: number;
  className?: string;
  rowIdGetter?: (originalRow: T) => string;
  rowSelection?: RowSelectionState;
  setRowSelection?: Dispatch<React.SetStateAction<RowSelectionState>>;
}

export const Table = <T,>(props: Props<T>) => {
  const {
    data,
    columns,
    enableColumnResizing = false,
    pageSize = DEFAULT_PAGESIZE,
    className,
    rowIdGetter,
    rowSelection,
    setRowSelection,
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
      ...(rowSelection && { rowSelection }),
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
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    enableColumnResizing,
    columnResizeMode: "onChange",
    getRowId: rowIdGetter,
    debugTable: true,
  });

  return (
    <>
      {renders}
      <table className={classNames(classes.table, className)}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className={classes["table__header"]} key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <HeaderContent
                  key={header.id}
                  header={header}
                  className={classes["table__header-content"]}
                />
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={classes["table__body"]}>
          {table.getRowModel().rows.map((row) => (
            <tr className={classes["table__row"]} key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  className={classes["table__cell"]}
                  key={cell.id}
                  style={{ flexBasis: cell.column.getSize() }}
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
