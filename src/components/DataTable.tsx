/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Pagination from "./Pagination";
import DataRenderer, { type ApiError } from "./DataRenderer";

export type Column<T> = {
  key: keyof T;
  header: string;
  render?: (value: any, row?: T) => React.ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  currentPage?: number;
  totalPages?: number;
  isLoading: boolean;
  error: ApiError | null;
  isError: boolean;
  onPageChange?: (page: number) => void;
  onRowClick?: (row: T) => void;
  className?: string;
  emptyMessage?: string;
  paging: boolean;
};

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  currentPage,
  totalPages,
  isLoading=false,
  error=null,
  isError=false,
  onPageChange,
  onRowClick,
  className = "",
  paging,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  return (
    <div className={`${className}  bg-white `}>
      <div className="border h-full border-Primary-50 rounded-xl block overflow-scroll">
        <DataRenderer isLoading={isLoading} isError={isError} error={error}>
          <table className="w-full ">
            <thead>
              <tr className="bg-Primary-50 sticky top-0">
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={`px-4 py-2 text-left text-nowrap text-base font-semibold text-Primary-500 ${
                      index === 0 ? "rounded-tl-xl" : ""
                    } ${index === columns.length - 1 ? "rounded-tr-xl" : ""} ${
                      column.className || ""
                    }`}>
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-8 text-center text-slate-500">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr
                    key={index}
                    onClick={() => onRowClick?.(row)}
                    className={`border-b text-nowrap border-Primary-50 hover:bg-Primary-5 transition-colors cursor-pointer`}>
                    {columns.map((column,index) => (
                      <td
                        key={index}
                        className={`px-4 py-2 text-base font-normal h-10 text-Black ${
                          column.className || ""
                        }`}>
                        {column.render
                          ? column.render(row[column.key], row)
                          : String(row[column.key] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
            {paging && currentPage && totalPages && onPageChange && totalPages > 1 && (
              <tfoot className="sticky -bottom-0 w-full">
                <tr>
                  <td colSpan={columns.length}>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={onPageChange}
                    />
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </DataRenderer>
      </div>
    </div>
  );
  
}

export default DataTable;
