import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ColumnDef, PaginationState, SortingState, Updater, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { useState } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pagination: PaginationState
  setPagination: (updater: Updater<PaginationState>) => void
  rowCount: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  setPagination,
  rowCount
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
      pagination: pagination,
    },
    onSortingChange: setSorting,
    rowCount: rowCount,
    onPaginationChange: setPagination
  })

  const firstPosition = table.getState().pagination.pageSize * table.getState().pagination.pageIndex + 1
  const itemsSoFar = firstPosition + table.getRowModel().rows.length - 1

  return (
    <div>
      <table className="table-fixed min-w-[1100px] min-h-[300px] divide-y divide-gray-200 border border-collapse overflow-hidden text-left rounded-xl shadow-sm ">
        <thead className="text-xs text-gray-700 uppercase bg-white/45">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-6 py-3">
                  <div>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="even:bg-white/65 border-b bg-white">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={"px-6 py-4 text-sm " + (cell.column.id === "name" ? "font-semibold" : "text-slate-600/80")} >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="flex">
        <nav className="flex justify-between min-w-[1100px] pl-1 pt-3">
          <span className="text-xs pt-1 text-slate-600/70 select-none">{firstPosition} - {itemsSoFar} de {rowCount}</span>

          <div className="flex w-[170px] justify-between">
            <span className="text-xs pt-[7px] text-slate-600/70 select-none">Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}</span>
            <div className="flex flex-row-reverse gap-2">
              <button className="bg-white border border-gray-300 rounded py-[2px] px-2 disabled:opacity-40" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
                <FontAwesomeIcon icon={faArrowRight} fontSize={"0.9em"} />
              </button>
              <button className="bg-white border border-gray-300 rounded py-[2px] px-2 disabled:opacity-40" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
                <FontAwesomeIcon icon={faArrowLeft} fontSize={"0.9em"} />
              </button>
            </div>
          </div>


        </nav>
      </footer>


    </div>
  )
}