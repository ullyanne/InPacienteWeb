import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Dropdown } from "../Dropdown";
import { Doctor } from "../doctors/Doctors";
import { useDoctorsAPI } from "../../api/doctors/DoctorsApi";

export const DoctorsColumns: ColumnDef<Doctor>[] = [
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
    sortingFn: 'alphanumeric'
  },
  {
    accessorKey: "crm",
    header: "CRM",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "specialty",
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
    sortingFn: 'alphanumeric'
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const doctorsAPI = useDoctorsAPI()
      const editDoctorPath = "/medicos/editar/" + `${row.original.crm}`
      return (
        <Dropdown contentId={row.original.crm} onDeleteButton={doctorsAPI.onDoctorDeleted} editInfoPath={editDoctorPath} isPatientPage={false} />
      )
    }
  }
]