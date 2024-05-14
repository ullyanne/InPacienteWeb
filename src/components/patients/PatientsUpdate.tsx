import { useParams } from "react-router-dom";
import { PatientsForm } from "./PatientsForm";
import { usePatientsApi } from "../../api/patients/PatientsApi";

export function PatientsUpdate() {
  const { cpf } = useParams()
  const patientsAPI = usePatientsApi()

  return (
    <div>
      <PatientsForm pageTitle="Atualizar informações" patientCpf={cpf} isEditForm={true} buttonTitle="Atualizar" onSubmit={patientsAPI.updatePatientData} />
    </div>
  )
}