import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Dropdown } from "./Dropdown";
import { usePatientsApi } from "../api/patients/PatientsApi";
import { Patient } from "./Patients";

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
    sortingFn: 'alphanumeric'
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
      const patientsAPI = usePatientsApi()
      const editPatientPath = "/pacientes/editar/" + `${row.original.cpf}`
      return (
        <Dropdown contentId={row.original.cpf} onDeleteButton={patientsAPI.onPatientDeleted} editInfoPath={editPatientPath} />
      )
    }
  }
]