import { useParams } from "react-router-dom"
import { useDoctorsAPI } from "../api/doctors/DoctorsApi"
import { DoctorsForm } from "./DoctorsForm"


export function DoctorsUpdate(){
  const { crm } = useParams()
  const doctorsAPI = useDoctorsAPI()

  return (
    <div>
      <DoctorsForm pageTitle="Atualizar informações" doctorCrm={crm} isEditForm={true} buttonTitle="Atualizar" onSubmit={doctorsAPI.updateDoctorData}/>
    </div>
  )
}