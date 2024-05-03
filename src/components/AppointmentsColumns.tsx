import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Dropdown } from "./Dropdown";

export type Appointment = {
  doctorName: string;
  doctorSpecialty: string;
  patientName: string;
  date: string;
}

export const AppointmentsColumns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "doctorName",
    header: ({ column }) => {
      return (
        <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex" >
          <span>MÉDICO</span>
          <span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </span>

        </button>
      )
    },
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "doctorSpecialty",
    header: ({ column }) => {
      return (
        <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex" >
          <span>ESPECIALIDADE</span>
          <span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </span>

        </button>
      )
    },
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "patientName",
    header: ({ column }) => {
      return (
        <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex" >
          <span>PACIENTE</span>
          <span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </span>

        </button>
      )
    },
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex" >
          <span>DATA</span>
          <span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </span>

        </button>
      )
    },
    cell: (info) => info.getValue(),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      console.log(row.original)
      return (
        <Dropdown />
      )
    }
  }
]