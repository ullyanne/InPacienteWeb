import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Appointment = {
  name: string;
  cpf: string;
  sus_card: string;
  phone_number: string;
  address: string;
}

export const AppointmentsColumns: ColumnDef<Appointment>[] = [
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
    accessorKey: "sus_card",
    header: "Cartão do SUS",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "phone_number",
    header: "Telefone",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "address",
    header: "Endereço",
    cell: (info) => info.getValue(),
  },
]