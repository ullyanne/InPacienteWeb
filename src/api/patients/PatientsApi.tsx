import { createContext, useContext, useMemo, useState } from "react"
import { Patient } from "../../components/PatientsColumns"
import { api } from "../api"
import { toast } from "sonner";

interface PatientAPIContextType {
  patientsData: Patient[];
  setPatientsData: (data: Patient[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  getPatientsData: () => Promise<void>;
  onPatientDeleted: (patientId: string) => Promise<void>;
  handleSearchPatientSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSearchPatientClearSubmit: () => Promise<void>;
}

const PatientAPIContext = createContext<PatientAPIContextType>({} as PatientAPIContextType)

export const PatientAPIProvider = ({ children }: { children: React.ReactNode }) => {
  const [patientsData, setPatientsData] = useState<Patient[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')

  const getPatientsData = async () => {
    try {
      const response = await api.get('/patients')
      setPatientsData(response.data.patients)
    }
    catch (e) {
      console.log(e)
    }
  }

  const onPatientDeleted = async (patientId: string) => {
    try {
      await api.delete(`/patients/${patientId}`)
      getPatientsData()
    }
    catch (e) {
      console.log(e)
    }

    toast.success("Paciente excluído com sucesso!")
  }

  const handleSearchPatientSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await api.get(`/patients?search=${searchQuery}`)
      setPatientsData(response.data.patients)
    }
    catch (e) {
      console.log(e)
    }
  }

  const handleSearchPatientClearSubmit = async () => {
    setSearchQuery('')
    try {
      const response = await api.get(`/patients?search=''`)
      setPatientsData(response.data.patients)
    }
    catch (e) {
      console.log(e)
    }
  }

  const value = useMemo(
    () => ({
      patientsData,
      setPatientsData,
      searchQuery,
      setSearchQuery,
      getPatientsData,
      onPatientDeleted,
      handleSearchPatientSubmit,
      handleSearchPatientClearSubmit
    }),
    [patientsData, searchQuery]
  )

  return (
    <PatientAPIContext.Provider value={value}>
      {children}
    </PatientAPIContext.Provider>
  )
}

export const usePatientsApi = () => {
  return useContext(PatientAPIContext)
}