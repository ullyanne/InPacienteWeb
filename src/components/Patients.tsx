import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataTable } from "./DataTable";
import { Patient, PatientsColumns } from "./PatientsColumns";
import { SearchBar } from "./SearchBar";
import { useEffect, useState } from "react";
import { api } from "../api/api";

export async function OnPatientDeleted(patientId: string) {
  try {
    const response = await api.delete(`/patients/${patientId}`)
    window.location.reload();
  }
  catch (e){
    console.log(e)
  }
}

export function Patients() {
  const [patientsData, setPatientsData] = useState<Patient[]>([])

  async function getPatientsData() {
    try {
      const response = await api.get('/patients')
      setPatientsData(response.data.patients)
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getPatientsData()
  }, [])

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

      <DataTable columns={PatientsColumns} data={patientsData} />

    </div>
  )
}
