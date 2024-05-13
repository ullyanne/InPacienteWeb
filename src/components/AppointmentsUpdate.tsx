import { useParams } from "react-router-dom";
import { useAppointmentsAPI } from "../api/appointments/AppointmentsApi";
import { AppointmentsForm } from "./AppointmentsForm";

export function AppointmentsUpdate() {
  const { id } = useParams()
  const appointmentsAPI = useAppointmentsAPI()

  return (
    <div>
      <AppointmentsForm pageTitle="Atualizar informações" appointmentId={id} isEditForm={true} buttonTitle="Atualizar" onSubmit={appointmentsAPI.updateAppointmentData}/>
    </div>
  )
}