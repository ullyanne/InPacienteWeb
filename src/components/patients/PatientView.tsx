import { useParams } from "react-router-dom"
import { PatientAppointments, usePatientsApi } from "../../api/patients/PatientsApi"
import { useEffect, useState } from "react";
import { Patient } from "./Patients";
import moment from "moment";

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
        console.log(e)
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
        console.log(e)
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
    <div className="mt-[70px] ml-20 px-1">
      <div className="text-2xl mb-10  font-semibold">
        <h1>{patientData?.name}</h1>
      </div>

      <div className="bg-slate-200/50 w-[700px] p-6 rounded-md  shadow-sm whitespace-pre gap-3 flex flex-col">
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
          <h2 className="text-xl mt-5 mb-3 font-semibold">Próximas consultas</h2>
          <div className="">
            {patientAppointmentsData.map((appointment) => (
              <div key={appointment.id} className="mb-5">
                <h3 className="font-semibold text-teal-500">{appointment.doctor.specialty}</h3>
                <h3>{moment(appointment.date as string).utc().format('DD/MM/YYYY [às] HH[h]mm')}</h3>
                <h3>Dr(a). {appointment.doctor.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  )
}