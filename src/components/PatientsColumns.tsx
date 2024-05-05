import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Dropdown } from "./Dropdown";
import { OnPatientDeleted } from "./Patients";

export type Patient = {
  name: string;
  cpf: string;
  phone_number: string;
  address: string;
}

export const PatientsColumns: ColumnDef<Patient>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex" >
          <span>NOME</span>
          <span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </span>

        </button>
      )
    },
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "cpf",
    header: "CPF",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "phoneNumber",
    header: "Telefone",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "address",
    header: "Endereço",
    cell: (info) => info.getValue(),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (        
        <Dropdown contentId={row.original.cpf} onDeleteButton={OnPatientDeleted}/>
      )
    }
  }
]