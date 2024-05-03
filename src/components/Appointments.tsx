import { DataTable } from "./DataTable";
import { AppointmentsColumns } from "./AppointmentsColumns";
import { SearchBar } from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons/faCirclePlus";

export function Appointments() {
  let data = []

  for (let i = 0; i <= 13; i++) {
    data.push(
      {
        doctorName: "Lúcia Campos",
        doctorSpecialty: "Oftalmologia",
        patientName: "Beatriz Oliveira",
        date: "03-05-2024"
      })
  }

  data.push(
    {
      doctorName: "Isabella Rodrigues Gomes",
      doctorSpecialty: "Cardiologia",
      patientName: "Paulo Pereira Sousa",
      date: "23-06-2024"
    }
  )

  return (
    <div className="mt-[70px] ml-20" >
      <div className="text-2xl mb-10 px-1 font-semibold">
        <h1>Consultas</h1>
      </div>

      <div className="mb-2 flex justify-between w-[1000px] pb-4">
        <SearchBar />

        <div className="flex flex-row-reverse w-[1000px]">
          <button className="bg-teal-200 border border-gray-300 rounded-lg py-2 px-2 hover:bg-teal-300/80 transition ease-in-out select-none delay-75 flex">
            <FontAwesomeIcon icon={faCirclePlus} size="xl"/>
            <span className="pl-2 ">Nova consulta</span>
          </button>
        </div>
      </div>
      
      <DataTable columns={AppointmentsColumns} data={data} />
    </div>
  )
}