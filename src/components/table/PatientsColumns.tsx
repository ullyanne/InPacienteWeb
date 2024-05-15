import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Dropdown } from "../Dropdown";
import { usePatientsApi } from "../../api/patients/PatientsApi";
import { Patient } from "../patients/Patients";
import { formatCpf } from "../../utils/CpfFormatter";
import { formatPhone } from "../../utils/PhoneFormatter";

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
    cell: ({ row }) => {
      return formatCpf(row.original.cpf)
    }
  },
  {
    accessorKey: "phoneNumber",
    header: "Telefone",
    cell: ({ row }) => {
      return formatPhone(row.original.phoneNumber)
    }
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
      const viewPatientPath = "/pacientes/visualizar/" + `${row.original.cpf}`
      return (
        <Dropdown contentId={row.original.cpf} onDeleteButton={patientsAPI.onPatientDeleted} editInfoPath={editPatientPath} isPatientPage={true} viewInfoPath={viewPatientPath} />
      )
    }
  }
]