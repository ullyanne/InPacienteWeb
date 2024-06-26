import { BaseSyntheticEvent, createContext, useContext, useMemo, useState } from "react";
import { api } from "../api";
import { Doctor } from "../../components/doctors/Doctors";
import { toast } from "sonner";
import { DoctorFormFields } from "../../components/doctors/DoctorsForm";
import { SubmitHandler } from "react-hook-form";
import { Nullable } from "../../types/types";
import axios from "axios";

interface DoctorAPIContextType {
  allDoctorsData: Doctor[];
  setAllDoctorsData: (data: Doctor[]) => void;
  doctorsData: Doctor[];
  setDoctorsData: (data: Doctor[]) => void;
  doctorsAmount: number;
  setDoctorsAmount: (data: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  getDoctorsData: (pageIndex: number) => Promise<void>;
  getAllDoctorsData: () => Promise<void>;
  getDoctorData: (id: string | undefined) => Promise<Doctor | undefined>;
  createDoctorData: SubmitHandler<DoctorFormFields>;
  updateDoctorData: SubmitHandler<DoctorFormFields>;
  onDoctorDeleted: (doctorId: string) => Promise<void>;
  handleSearchDoctorSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSearchDoctorClearSubmit: () => Promise<void>;
}

const DoctorAPIContext = createContext<DoctorAPIContextType>({} as DoctorAPIContextType)

export const DoctorAPIProvider = ({ children }: { children: React.ReactNode }) => {
  const [allDoctorsData, setAllDoctorsData] = useState<Doctor[]>([])
  const [doctorsData, setDoctorsData] = useState<Doctor[]>([])
  const [doctorsAmount, setDoctorsAmount] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const getAllDoctorsData = async () => {
    let page = 0
    let totalPages = 1
    let allDoctors: Doctor[] = []

    try {
      while (page < totalPages) {
        const response = await api.get(`/doctors?pageIndex=${page}`)
        const newDoctors = response.data.doctors

        allDoctors = [...allDoctors, ...newDoctors]

        if (page == 0) {
          setDoctorsAmount(response.data.doctorsAmount)
          totalPages = Math.floor(response.data.doctorsAmount / 10) + (response.data.doctorsAmount % 10 > 0 ? 1 : 0)
        }
        page += 1
      }
      setAllDoctorsData(allDoctors)
    }
    catch (e) {

    }
  }

  const getDoctorsData = async (pageIndex = 0) => {
    try {
      const response = await api.get(`/doctors?pageIndex=${pageIndex}`)
      setDoctorsData(response.data.doctors)
      setDoctorsAmount(response.data.doctorsAmount)
    }
    catch (e) {

    }
  }

  const getDoctorData = async (id: string | undefined): Promise<Doctor | undefined> => {
    try {
      const response = await api.get(`/doctors/${id}`)
      return response.data.doctor
    }
    catch (e) {

    }
  }

  const createDoctorData: SubmitHandler<DoctorFormFields> = async (data: DoctorFormFields) => {
    try {
      await api.post('/doctors', data);

      toast.success("Médico criado com sucesso!")
    }
    catch (e) {


      if (axios.isAxiosError(e)) {
        if (e.response?.status == 409) {
          toast.error("Médico já existe no banco de dados")
        }
      }
    }
  }

  const updateDoctorData: SubmitHandler<DoctorFormFields> = async (data: DoctorFormFields, dirtyFields: BaseSyntheticEvent<object, any, any> | undefined) => {
    if (dirtyFields && Object.keys(dirtyFields).length != 0) {
      let filteredData: Nullable<DoctorFormFields> = {} as DoctorFormFields
      Object.keys(dirtyFields).map((key) => {
        filteredData[key as keyof DoctorFormFields] = (data[key as keyof DoctorFormFields])
      })

      try {
        await api.patch(`/doctors/${data.crm}`, filteredData);

        toast.success("Médico atualizado com sucesso!")
      }
      catch (e) {

      }
    }
  }

  const onDoctorDeleted = async (doctorId: string) => {
    try {
      await api.delete(`/doctors/${doctorId}`)
      toast.success("Médico excluído com sucesso!")
      getDoctorsData()
    }
    catch (e) {

    }
  }

  const handleSearchDoctorSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await api.get(`/doctors?search=${searchQuery}`)
      setDoctorsData(response.data.doctors)
    }
    catch (e) {

    }
  }

  const handleSearchDoctorClearSubmit = async () => {
    setSearchQuery('')
    try {
      const response = await api.get(`/doctors?search=''`)
      setDoctorsData(response.data.doctors)
    }
    catch (e) {

    }
  }

  const value = useMemo(
    () => ({
      allDoctorsData,
      setAllDoctorsData,
      doctorsData,
      setDoctorsData,
      doctorsAmount,
      setDoctorsAmount,
      searchQuery,
      setSearchQuery,
      getDoctorsData,
      createDoctorData,
      getAllDoctorsData,
      updateDoctorData,
      getDoctorData,
      onDoctorDeleted,
      handleSearchDoctorSubmit,
      handleSearchDoctorClearSubmit
    }),
    [doctorsData, doctorsAmount, allDoctorsData, searchQuery]
  )

  return (
    <DoctorAPIContext.Provider value={value}>
      {children}
    </DoctorAPIContext.Provider>
  )
}

export const useDoctorsAPI = () => {
  return useContext(DoctorAPIContext)
}