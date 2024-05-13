import { createContext, useContext, useMemo, useState } from "react";
import { api } from "../api";
import { Doctor } from "../../components/Doctors";

interface DoctorAPIContextType {
  doctorsData: Doctor[];
  setDoctorsData: (data: Doctor[]) => void;
  doctorsAmount: number;
  setDoctorsAmount: (data: number) => void;
  getDoctorsData: () => Promise<void>;
}

const DoctorAPIContext = createContext<DoctorAPIContextType>({} as DoctorAPIContextType)

export const DoctorAPIProvider = ({ children }: { children: React.ReactNode }) => {
  const [doctorsData, setDoctorsData] = useState<Doctor[]>([])
  const [doctorsAmount, setDoctorsAmount] = useState<number>(0)
  // const [searchQuery, setSearchQuery] = useState<string>('')

  const getDoctorsData = async () => {
    try {
      const response = await api.get(`/doctors`)
      setDoctorsData(response.data.doctors)
      setDoctorsAmount(response.data.doctorsAmount)
    }
    catch (e) {
      console.log(e)
    }
  }

  const value = useMemo(
    () => ({
      doctorsData,
      setDoctorsData,
      doctorsAmount,
      setDoctorsAmount,
      getDoctorsData,
    }),
    [doctorsData, doctorsAmount]
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