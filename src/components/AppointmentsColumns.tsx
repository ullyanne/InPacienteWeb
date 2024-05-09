import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Dropdown } from "./Dropdown";
import { OnAppointmentDeleted } from "./Appointments";

export type Appointment = {
  id: string
  doctorName: string;
  doctorSpecialty: string;
  patientName: string;
  date: string;
}

export const AppointmentsColumns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "doctor.name",
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
    accessorKey: "doctor.specialty",
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
    accessorKey: "patient.name",
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
      const editAppointmentPath = "consultas/editar/" + `${row.original.id}`
      
      return (
        <Dropdown contentId={row.original.id} onDeleteButton={OnAppointmentDeleted} editInfoPath={editAppointmentPath}/>
      )
    }
  }
]