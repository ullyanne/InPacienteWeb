import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Dropdown } from "./Dropdown";
import { Appointment } from "./Appointments";
import moment from 'moment';
import { useAppointmentsAPI } from "../api/appointments/AppointmentsApi";

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
    cell: (info) => {
      const date = info.getValue()
      const formattedDate = moment(date as string).format('DD/MM/YYYY [às] HH[h]mm')
      return formattedDate
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const appointmentsAPI = useAppointmentsAPI()
      const editAppointmentPath = "/consultas/editar/" + `${row.original.id}`
      
      return (
        <Dropdown contentId={row.original.id} onDeleteButton={appointmentsAPI.onAppointmentDeleted} editInfoPath={editAppointmentPath}/>
      )
    }
  }
]