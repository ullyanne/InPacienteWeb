import { useDoctorsAPI } from "../../api/doctors/DoctorsApi";
import { DoctorsForm } from "./DoctorsForm";


export function DoctorsCreate() {
  const doctorsAPI = useDoctorsAPI()

  return (
    <div>
      <DoctorsForm pageTitle="Novo médico" isEditForm={false} buttonTitle="Criar" onSubmit={doctorsAPI.createDoctorData} />
    </div>
  )
}