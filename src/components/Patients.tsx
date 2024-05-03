import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataTable } from "./DataTable";
import { PatientsColumns } from "./PatientsColumns";
import { SearchBar } from "./SearchBar";

export function Patients() {
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
    <div className="mt-[70px] ml-20">
      <div className="text-2xl mb-10 px-1 font-semibold">
        <h1>Pacientes</h1>
      </div>

      <div className="mb-2 flex justify-between w-[1000px] pb-4">
        <SearchBar />

        <div className="flex flex-row-reverse w-[1000px]">
          <button className="bg-teal-200 border border-gray-300 rounded-lg py-2 px-2 hover:bg-teal-300/80 transition ease-in-out select-none delay-75 flex">
            <FontAwesomeIcon icon={faUserPlus} fontSize={"1.3em"} />
            <span className="pl-2">Novo paciente</span>
          </button>
        </div>
      </div>

      <DataTable columns={PatientsColumns} data={data} />

    </div>
  )
}
