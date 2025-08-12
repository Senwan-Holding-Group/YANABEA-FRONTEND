/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Pagination from "./Pagination";

export type Column<T> = {
  key: keyof T;
  header: string;
  render?: (value: any, row?: T) => React.ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onRowClick: (row: T) => void;
  className?: string;
  emptyMessage?: string;
};

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  currentPage,
  totalPages,
  onPageChange,
  onRowClick,
  className = "",
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  return (
    <div className={`${className}  bg-white `}>
      <div className="border h-full border-Primary-50 rounded-xl block overflow-scroll">
        <table className="w-full ">
          <thead>
            <tr className="bg-Primary-50 sticky top-0">
              {columns.map((column ,index) => (
                <th
                  key={String(column.key)}
                  className={`px-4 py-2 text-left text-nowrap text-base font-semibold text-Primary-500 ${index === 0 ? 'rounded-tl-xl' : ''} ${index === columns.length - 1 ? 'rounded-tr-xl' : ''} ${column.className || ""}`}>
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
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className={`px-4 py-2 text-base font-normal h-10 text-RT-Black ${
                        column.className || ""
                      }`}>
                      {column.render
                        ? column.render(row[column.key], row)
                        : String(row[column.key] || "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
          <tfoot className="sticky -bottom-0 w-full">
            <tr>
              <td colSpan={columns.length}>
                
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={onPageChange}
                    />
                  )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
