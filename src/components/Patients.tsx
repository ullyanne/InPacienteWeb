import { faArrowLeft, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SortingState, createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

export type User = {
  name: string;
  cpf: string;
  sus_card: string;
  phone_number: string;
  address: string;
}

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('name', {
    header: ({ column }) => {
      return(
        <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex" >
          <span>NOME</span>
          <span>
            <ArrowUpDown className="ml-2 h-4 w-4"/>
          </span>
          
        </button>
      )
    },
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('cpf', {
    header: () => "CPF",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('sus_card', {
    header: () => "Cartão do SUS",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('phone_number', {
    header: () => "Telefone",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('address', {
    header: () => "Endereço",
    cell: (info) => info.getValue(),
  }),
]

export function Patients() {
  let data = []

  for (let i = 0; i <= 13; i++) {
    data.push(
      {
        name: "ullyanne julia freire patriota",
        cpf: "000.000.000-00",
        sus_card: "000000000",
        phone_number: "(82) 99950-2695",
        address: "rua do algodão doce"
      })
  }

  data.push(
    {
      name: "aline",
      cpf: "000.000.000-00",
      sus_card: "000000000",
      phone_number: "(82) 99950-2695",
      address: "rua do algodão doce"
    }
  )


  const [users, setUsers] = useState(data)
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: users,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  })

  return (
    <div className="mt-[70px] ml-20">
      <div className="text-2xl mb-10 px-1 font-semibold">
        <h1>Pacientes</h1>
      </div>

      <div className="mb-2 flex justify-between w-[1000px] pb-4">
        <div className="relative">
          <FontAwesomeIcon className="absolute inset-y-2.5 start-0 ps-3 pointer-events-none rtl:inset-r-0" icon={faMagnifyingGlass} />
          <input type="text" className="block p-2 ps-9 text-sm text-gray-900 border border-gray-300 rounded-lg w-sm bg-gray-50" placeholder="Pesquisar..." />
        </div>

        <div className="flex flex-row-reverse w-[1000px]">
          <button className="bg-teal-200 border border-gray-300 rounded-lg py-2 px-2 hover:bg-teal-300/80 transition ease-in-out select-none delay-75">
            <FontAwesomeIcon icon={faUserPlus} fontSize={"1.3em"} />
            <span className="pl-2">Novo paciente</span>
          </button>
        </div>
      </div>

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

    </div>
  )
}
