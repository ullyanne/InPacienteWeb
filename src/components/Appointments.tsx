import { ArrowUpDown } from "lucide-react";
import { DataTable } from "./DataTable";
import { ColumnDef } from "@tanstack/react-table"
import { AppointmentsColumns } from "./AppointmentsColumns";

export function Appointments() {
  let data = []

  for (let i = 0; i <= 13; i++) {
    data.push(
      {
        name: "Tiago Castro Ribeiro",
        cpf: "000.000.000-00",
        sus_card: "000000000",
        phone_number: "(82) 99999-9999",
        address: "rua do algodão doce"
      })
  }

  data.push(
    {
      name: "aline",
      cpf: "000.000.000-00",
      sus_card: "000000000",
      phone_number: "(82) 55555-5555",
      address: "av. brasil, n° 8"
    }
  )

  return (
    <div>
      <DataTable columns={AppointmentsColumns} data={data} />
    </div>
  )
}