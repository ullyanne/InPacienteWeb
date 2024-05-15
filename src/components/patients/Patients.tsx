import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { PaginationState } from "@tanstack/react-table";
import { SearchBar } from "../SearchBar";
import { usePatientsApi } from "../../api/patients/PatientsApi";
import { PatientsColumns } from "../table/PatientsColumns";
import { DataTable } from "../table/DataTable";

export type Patient = {
  name: string;
  cpf: string;
  phoneNumber: string | null;
  address: string;
}

export function Patients() {
  const patientsAPI = usePatientsApi()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  useEffect(() => {
    patientsAPI.getPatientsData(pagination.pageIndex)
  }, [pagination])

  return (
    <div className="mt-[70px] ml-20 w-[1100px]">
      <div className="text-2xl mb-10 pl-1 font-semibold">
        <h1>Pacientes</h1>
      </div>

      <div className="mb-2 flex justify-between w-[1100px] pb-4">
        <SearchBar searchQuery={patientsAPI.searchQuery} setSearchQuery={patientsAPI.setSearchQuery} handleSubmit={patientsAPI.handleSearchPatientSubmit} handleClearSubmit={patientsAPI.handleSearchPatientClearSubmit} />

        <div className="flex flex-row-reverse w-[1100px]">
          <NavLink to="pacientes/novo" className="bg-teal-200 border border-gray-300 rounded-lg py-2 px-2 hover:bg-teal-300/80 transition ease-in-out select-none delay-75 flex">
            <FontAwesomeIcon icon={faUserPlus} fontSize={"1.3em"} />
            <span className="pl-2">Novo paciente</span>
          </NavLink>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <DataTable columns={PatientsColumns} data={patientsAPI.patientsData} pagination={pagination} setPagination={setPagination} rowCount={patientsAPI.patientsAmount} />
      </div>


    </div>
  )
}
