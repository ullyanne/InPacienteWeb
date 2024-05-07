import { DataTable } from "./DataTable";
import { Appointment, AppointmentsColumns } from "./AppointmentsColumns";
import { SearchBar } from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import { useEffect, useState } from "react";
import { api } from "../api/api";

export async function OnAppointmentDeleted(id: string) {
  try {
    await api.delete(`/appointments/${id}`)
    window.location.reload();
  }
  catch (e) {
    console.log(e)
  }
}

export function Appointments() {
  const [appointmentsData, setAppointmentsData] = useState<Appointment[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  
  async function getAppointmentsData(){
    try {
      const response = await api.get('/appointments')
      setAppointmentsData(response.data.appointments)
    }
    catch (e) {
      console.log(e)
    }
  }

  async function handleSearchAppointmentSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const response = await api.get(`/appointments?search=${searchQuery}`)
      setAppointmentsData(response.data.appointments)
    }
    catch (e) {
      console.log(e)
    }
  }

  async function handleSearchAppointmentClearSubmit() {
    setSearchQuery('')
    try {
      const response = await api.get(`/appointments`)
      setAppointmentsData(response.data.appointments)
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getAppointmentsData()
  }, [])

  return (
    <div className="mt-[70px] ml-20" >
      <div className="text-2xl mb-10 px-1 font-semibold">
        <h1>Consultas</h1>
      </div>

      <div className="mb-2 flex justify-between w-[1000px] pb-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSubmit={handleSearchAppointmentSubmit} handleClearSubmit={handleSearchAppointmentClearSubmit}/>

        <div className="flex flex-row-reverse w-[1000px]">
          <button className="bg-teal-200 border border-gray-300 rounded-lg py-2 px-2 hover:bg-teal-300/80 transition ease-in-out select-none delay-75 flex">
            <FontAwesomeIcon icon={faCirclePlus} size="xl"/>
            <span className="pl-2 ">Nova consulta</span>
          </button>
        </div>
      </div>
      
      <DataTable columns={AppointmentsColumns} data={appointmentsData} />
    </div>
  )
}