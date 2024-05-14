import { PatientsForm } from "./PatientsForm"
import { usePatientsApi } from "../../api/patients/PatientsApi"

export function PatientsCreate() {
  const patientsAPI = usePatientsApi()

  return (
    <div>
      <PatientsForm pageTitle="Novo paciente" isEditForm={false} buttonTitle="Criar" onSubmit={patientsAPI.createPatientData} />
    </div>
  )
}