import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataTable } from "./DataTable";
import { PatientsColumns } from "./PatientsColumns";
import { SearchBar } from "./SearchBar";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { usePatientsApi } from "../api/patients/PatientsApi";

export type Patient = {
  name: string;
  cpf: string;
  phoneNumber: string | null;
  address: string;
}

export function Patients() {
  const patientsAPI = usePatientsApi()

  useEffect(() => {
    patientsAPI.getPatientsData()
  }, [])

  return (
    <div className="mt-[70px] ml-20">
      <div className="text-2xl mb-10 px-1 font-semibold">
        <h1>Pacientes</h1>
      </div>

      <div className="mb-2 flex justify-between w-[1000px] pb-4">
        <SearchBar searchQuery={patientsAPI.searchQuery} setSearchQuery={patientsAPI.setSearchQuery} handleSubmit={patientsAPI.handleSearchPatientSubmit} handleClearSubmit={patientsAPI.handleSearchPatientClearSubmit} />

        <div className="flex flex-row-reverse w-[1000px]">
          <NavLink to="pacientes/novo" className="bg-teal-200 border border-gray-300 rounded-lg py-2 px-2 hover:bg-teal-300/80 transition ease-in-out select-none delay-75 flex">
            <FontAwesomeIcon icon={faUserPlus} fontSize={"1.3em"} />
            <span className="pl-2">Novo paciente</span>
          </NavLink>
        </div>
      </div>

      <DataTable columns={PatientsColumns} data={patientsAPI.patientsData} />

    </div>
  )
}
