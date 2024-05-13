import { DataTable } from "./DataTable";
import { AppointmentsColumns } from "./AppointmentsColumns";
import { SearchBar } from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import { useEffect, useState } from "react";
import { useAppointmentsAPI } from "../api/appointments/AppointmentsApi";
import { PaginationState } from "@tanstack/react-table";
import { NavLink } from "react-router-dom";

export type Appointment = {
  id: string
  doctorName: string;
  doctorSpecialty: string;
  patientName: string;
  date: string;
}

export function Appointments() {
  const appointmentsAPI = useAppointmentsAPI()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  useEffect(() => {
    appointmentsAPI.getAppointmentsData(pagination.pageIndex)
  }, [pagination])

  return (
    <div className="mt-[70px] ml-20 w-[1000px]" >
      <div className="text-2xl mb-10 px-1 font-semibold">
        <h1>Consultas</h1>
      </div>

      <div className="mb-2 flex justify-between w-[1000px] pb-4">
        <SearchBar searchQuery={appointmentsAPI.searchQuery} setSearchQuery={appointmentsAPI.setSearchQuery} handleSubmit={appointmentsAPI.handleSearchAppointmentSubmit} handleClearSubmit={appointmentsAPI.handleSearchAppointmentClearSubmit} />

        <div className="flex flex-row-reverse w-[1000px]">
          <NavLink to='/consultas/novo' className="bg-teal-200 border border-gray-300 rounded-lg py-2 px-2 hover:bg-teal-300/80 transition ease-in-out select-none delay-75 flex">
            <FontAwesomeIcon icon={faCirclePlus} size="xl" />
            <span className="pl-2 ">Nova consulta</span>
          </NavLink>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <DataTable columns={AppointmentsColumns} data={appointmentsAPI.appointmentsData} pagination={pagination} setPagination={setPagination} rowCount={appointmentsAPI.appointmentsAmount} />
      </div>

    </div>
  )
}