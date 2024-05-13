import { useAppointmentsAPI } from "../api/appointments/AppointmentsApi";
import { AppointmentsForm } from "./AppointmentsForm";

export function AppointmentsCreate() {
  const appointmentsAPI = useAppointmentsAPI()

  return (
    <div>
      <AppointmentsForm pageTitle="Agendar consulta" isEditForm={true} buttonTitle="Agendar" onSubmit={appointmentsAPI.createAppointmentData}/>
    </div>
  )
}