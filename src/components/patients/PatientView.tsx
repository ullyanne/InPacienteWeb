import { useParams } from "react-router-dom"
import { PatientAppointments, usePatientsApi } from "../../api/patients/PatientsApi"
import { useEffect, useState } from "react";
import { Patient } from "./Patients";
import moment from "moment";
import { CalendarFold, Clock } from "lucide-react";

export function PatientView() {
  const { cpf } = useParams()
  const patientsAPI = usePatientsApi()
  const [patientData, setPatientData] = useState<Patient>()
  const [patientAppointmentsData, setPatientAppointmentsData] = useState<PatientAppointments[]>([])

  useEffect(() => {
    (async () => {
      try {
        const response = await patientsAPI.getPatientAppointments(cpf)
        if (response != undefined) {
          setPatientAppointmentsData(response)
        }
      }
      catch (e) {
        (e)
      }
    })();

  }, [patientAppointmentsData]);

  useEffect(() => {
    (async () => {
      try {
        const response = await patientsAPI.getPatientData(cpf)
        setPatientData(response)
      }
      catch (e) {
        (e)
      }
    })();

  }, []);

  const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
  const formattedCpf = patientData?.cpf.replace(cpfRegex, "$1.$2.$3-$4")
  let formattedPhoneNumber = ''
  const phoneNumberRegex = /^(\d{2})(\d{5})(\d{4})$/;
  if (patientData?.phoneNumber != null) {
    formattedPhoneNumber = patientData?.phoneNumber.replace(phoneNumberRegex, "($1) $2-$3");
  }

  return (
    <div className="px-1">
      <div className="text-2xl mb-10  font-semibold">
        <h1>{patientData?.name}</h1>
      </div>

      <div className="bg-slate-200/40 w-[700px] p-6 rounded-md  shadow-sm whitespace-pre gap-3 flex flex-col">
        <div>
          <span className="font-semibold">CPF: </span>
          <span>{formattedCpf}</span>
        </div>

        <div>
          <span className="font-semibold">Número de Telefone: </span>
          <span>{patientData?.phoneNumber ? formattedPhoneNumber : "-"}</span>
        </div>

        <div>
          <span className="font-semibold">Endereço: </span>
          <span>{patientData?.address}</span>
        </div>

        <div className="mb-3">
          <h2 className="text-xl mt-5 mb-4 font-semibold">Próximas consultas</h2>
          <div className="flex flex-col gap-5">
            {patientAppointmentsData.map((appointment) => (
              <div key={appointment.id} className=" border bg-white rounded-md p-5 shadow-sm">
                <h3 className="font-semibold text-teal-500 text-lg">{appointment.doctor.specialty}</h3>
                <h3>Dr(a). {appointment.doctor.name}</h3>

                <div className="flex pt-2 items-center gap-5">
                  <div className="flex pt-2 items-center">
                    <CalendarFold className="w-[20px] text-slate-900" />
                    <h3 className="text-sm pl-2 pt-1">{moment(appointment.date as string).utc().format('DD/MM/YYYY')}</h3>
                  </div>

                  <div className="flex pt-2 items-center">
                    <Clock className="w-[20px] text-slate-900" />
                    <h3 className="text-sm pl-2 pt-1">{moment(appointment.date as string).utc().format('HH[h]mm')}</h3>
                  </div>

                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}