import { useEffect, useState } from "react";
import { useDoctorsAPI } from "../api/doctors/DoctorsApi";
import { PaginationState } from "@tanstack/react-table";
import { SearchBar } from "./SearchBar";
import { NavLink } from "react-router-dom";
import { DataTable } from "./DataTable";
import { DoctorsColumns } from "./DoctorsColumns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

export type Doctor = {
  name: string;
  crm: string;
  specialty: string;
}

export function Doctors() {
  const doctorsAPI = useDoctorsAPI()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  useEffect(() => {
    doctorsAPI.getDoctorsData(pagination.pageIndex)
  }, [pagination])

  return (
    <div className="mt-[70px] ml-20 w-[1000px]">
      <div className="text-2xl mb-10 pl-1 font-semibold">
        <h1>Médicos</h1>
      </div>

      <div className="mb-2 flex justify-between w-[1000px] pb-4">
        <SearchBar searchQuery={doctorsAPI.searchQuery} setSearchQuery={doctorsAPI.setSearchQuery} handleSubmit={doctorsAPI.handleSearchDoctorSubmit} handleClearSubmit={doctorsAPI.handleSearchDoctorClearSubmit} />

        <div className="flex flex-row-reverse w-[1000px]">
          <NavLink to="/medicos/novo" className="bg-teal-200 border border-gray-300 rounded-lg py-2 px-2 hover:bg-teal-300/80 transition ease-in-out select-none delay-75 flex">
            <FontAwesomeIcon icon={faUserPlus} fontSize={"1.3em"} />
            <span className="pl-2">Novo médico</span>
          </NavLink>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        
        <DataTable columns={DoctorsColumns} data={doctorsAPI.doctorsData} pagination={pagination} setPagination={setPagination} rowCount={doctorsAPI.doctorsAmount} />
      </div>


    </div>
  )
}