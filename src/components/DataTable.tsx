import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { useState } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  })

  return (
    <div>
      <table className="table-fixed min-w-[1000px] min-h-[300px] divide-y divide-gray-200 border border-collapse overflow-hidden text-left rounded-xl shadow-sm ">
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

      <nav className="flex flex-row-reverse w-[1000px] gap-2 pl-1 pt-3">
        <button className="bg-white border border-gray-300 rounded py-[2px] px-2 disabled:opacity-40" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
          <FontAwesomeIcon icon={faArrowRight} fontSize={"0.9em"} />
        </button>
        <button className="bg-white border border-gray-300 rounded py-[2px] px-2 disabled:opacity-40" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
          <FontAwesomeIcon icon={faArrowLeft} fontSize={"0.9em"} />
        </button>
      </nav>
    </div>
  )
}