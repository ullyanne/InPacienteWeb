import { BaseSyntheticEvent, createContext, useContext, useMemo, useState } from "react";
import { Appointment } from "../../components/appointments/Appointments";
import { api } from "../api";
import { AppointmentsFormFields } from "../../components/appointments/AppointmentsForm";
import { toast } from "sonner";
import { SubmitHandler } from "react-hook-form";
import { Nullable } from "../../types/types";
import { doesPatientExist } from "../patients/PatientsApi";

interface AppointmentAPIContextType {
  appointmentsData: Appointment[];
  setAppointmentsData: (data: Appointment[]) => void;
  appointmentsAmount: number;
  setAppointmentsAmount: (data: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  getAppointmentsData: (pageIndex: number) => Promise<void>;
  getAppointmentData: (id: string | undefined) => Promise<AppointmentsFormFields | undefined>;
  createAppointmentData: SubmitHandler<AppointmentsFormFields>;
  updateAppointmentData: SubmitHandler<AppointmentsFormFields>;
  onAppointmentDeleted: (appointmentId: string) => Promise<void>;
  handleSearchAppointmentSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSearchAppointmentClearSubmit: () => Promise<void>;
}

const AppointmentAPIContext = createContext<AppointmentAPIContextType>({} as AppointmentAPIContextType)

export const AppointmentAPIProvider = ({ children }: { children: React.ReactNode }) => {
  const [appointmentsData, setAppointmentsData] = useState<Appointment[]>([])
  const [appointmentsAmount, setAppointmentsAmount] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const getAppointmentsData = async (pageIndex = 0) => {
    try {
      const response = await api.get(`/appointments?pageIndex=${pageIndex}`)
      setAppointmentsData(response.data.appointments)
      setAppointmentsAmount(response.data.appointmentsAmount)
    }
    catch (e) {

    }
  }

  const getAppointmentData = async (id: string | undefined): Promise<AppointmentsFormFields | undefined> => {
    try {
      const response = await api.get(`/appointments/${id}`)
      return response.data.appointment
    }
    catch (e) {

    }
  }

  const createAppointmentData: SubmitHandler<AppointmentsFormFields> = async (data: AppointmentsFormFields) => {
    if (! await doesPatientExist(data.patientCpf)) {
      toast.error("Paciente não existe na base de dados.")
      return
    }

    try {
      await api.post('/appointments', data);

      toast.success("Consulta criada com sucesso!")
    }
    catch (e) {

    }
  }

  const updateAppointmentData: SubmitHandler<AppointmentsFormFields> = async (data: AppointmentsFormFields, dirtyFields: BaseSyntheticEvent<object, any, any> | undefined) => {
    if (dirtyFields && Object.keys(dirtyFields).length != 0) {
      let filteredData: Nullable<AppointmentsFormFields> = {} as AppointmentsFormFields
      Object.keys(dirtyFields).map((key) => {
        filteredData[key as keyof AppointmentsFormFields] = (data[key as keyof AppointmentsFormFields])
      })

      if (filteredData.patientCpf != null && ! await doesPatientExist(data.patientCpf)) {
        toast.error("Paciente não existe na base de dados.")
        return
      }

      try {
        await api.patch(`/appointments/${data.id}`, filteredData);

        toast.success("Consulta atualizada com sucesso!")
      }
      catch (e) {

      }
    }
  }

  const onAppointmentDeleted = async (appointmentId: string) => {
    try {
      await api.delete(`/appointments/${appointmentId}`)
      getAppointmentsData()
    }
    catch (e) {

    }
  }

  const handleSearchAppointmentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await api.get(`/appointments?search=${searchQuery}`)
      setAppointmentsData(response.data.appointments)
    }
    catch (e) {

    }
  }

  const handleSearchAppointmentClearSubmit = async () => {
    setSearchQuery('')
    try {
      const response = await api.get(`/appointments`)
      setAppointmentsData(response.data.appointments)
    }
    catch (e) {

    }
  }

  const value = useMemo(
    () => ({
      appointmentsData,
      appointmentsAmount,
      setAppointmentsData,
      setAppointmentsAmount,
      searchQuery,
      setSearchQuery,
      getAppointmentsData,
      getAppointmentData,
      createAppointmentData,
      updateAppointmentData,
      onAppointmentDeleted,
      handleSearchAppointmentSubmit,
      handleSearchAppointmentClearSubmit
    }),
    [appointmentsData, searchQuery, appointmentsAmount]
  )

  return (
    <AppointmentAPIContext.Provider value={value}>
      {children}
    </AppointmentAPIContext.Provider>
  )
}

export const useAppointmentsAPI = () => {
  return useContext(AppointmentAPIContext)
}