import { BaseSyntheticEvent, createContext, useContext, useMemo, useState } from "react"
import { api } from "../api"
import { toast } from "sonner";
import { SubmitHandler } from "react-hook-form";
import { PatientFormFields } from "../../components/PatientsForm";
import { Nullable } from "../../types/types";
import { Patient } from "../../components/Patients";

interface PatientAPIContextType {
  patientsData: Patient[];
  setPatientsData: (data: Patient[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  getPatientsData: () => Promise<void>;
  getPatientData: (id: string | undefined) => Promise<Patient | undefined>;
  createPatientData: SubmitHandler<PatientFormFields>;
  updatePatientData: SubmitHandler<PatientFormFields>;
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

  const getPatientData = async (id: string | undefined): Promise<Patient | undefined> => {
    try {
      const response = await api.get(`/patients/${id}`)
      return response.data.patient
    }
    catch (e) {
      console.log(e)
    }
  }

  const createPatientData: SubmitHandler<PatientFormFields> = async (data: PatientFormFields) => {
    try {
      await api.post('/patients', data);

      toast.success("Paciente criado com sucesso!")
    }
    catch (e) {
      console.log(e)
    }
  }

  const updatePatientData: SubmitHandler<PatientFormFields> = async (data: PatientFormFields, dirtyFields: BaseSyntheticEvent<object, any, any> | undefined) => {
    if (dirtyFields && Object.keys(dirtyFields).length != 0) {
      let filteredData: Nullable<PatientFormFields> = {} as PatientFormFields
      Object.keys(dirtyFields).map((key) => {
        filteredData[key as keyof PatientFormFields] = (data[key as keyof PatientFormFields])
      })

      try {
        await api.patch(`/patients/${data.cpf}`, filteredData);

        toast.success("Paciente atualizado com sucesso!")
      }
      catch (e) {
        console.log(e)
      }
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
      getPatientData,
      createPatientData,
      updatePatientData,
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