import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAppointmentsAPI } from "../../api/appointments/AppointmentsApi";
import * as Select from "@radix-ui/react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { useDoctorsAPI } from "../../api/doctors/DoctorsApi";
import { IMask, IMaskInput } from 'react-imask';

export type AppointmentsFormFields = {
  id: string
  date: string
  doctorCrm: string
  patientCpf: string
}

interface AppointmentsFormProps {
  pageTitle: string
  buttonTitle: string
  appointmentId?: string
  isEditForm: boolean
  onSubmit: SubmitHandler<AppointmentsFormFields>
}

export function AppointmentsForm({ pageTitle, buttonTitle, appointmentId, isEditForm, onSubmit }: AppointmentsFormProps) {

  const { register, handleSubmit, reset, control, formState: { errors, dirtyFields } } = useForm<AppointmentsFormFields>(
    { defaultValues: { id: "", date: "", doctorCrm: "", patientCpf: "" } }
  )

  const appointmentsAPI = useAppointmentsAPI()
  const doctorsAPI = useDoctorsAPI()
  const cpfMask = { mask: '000.000.000-00' }
  const [cpf, setCpf] = useState('')

  useEffect(() => {
    if (isEditForm) {
      (async () => {
        try {
          const response = await appointmentsAPI.getAppointmentData(appointmentId)

          const utcDate = new Date(response!.date)
          const formattedDate = utcDate.toISOString().slice(0, -8)

          const masked = IMask.createMask(cpfMask);
          masked.resolve(response!.patientCpf)!
          const formattedCpf = masked.value

          setCpf(formattedCpf)

          reset({ ...response, date: formattedDate })
        }
        catch (e) {
          console.log(e)
        }
      })();
    }
  }, [reset, isEditForm]);

  useEffect(() => {
    getDoctors()
  }, []);

  const getDoctors = async () => {
    try {
      await doctorsAPI.getAllDoctorsData()
    }
    catch (e) {
      console.log(e)
    }
  }

  const crm = useWatch({ control, name: "doctorCrm" })

  return (
    <div className="mt-[70px] ml-20 px-1">
      <div className="text-2xl mb-10  font-semibold">
        <h1>{pageTitle}</h1>
      </div>

      <div className="w-[420px]">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit((data) => onSubmit(data, dirtyFields as any))}>

          <Controller
            name="doctorCrm"
            control={control}
            rules={{
              required: "Nome do médico é obrigatório"
            }}
            key={crm}
            render={({ field }) => (
              <div className="w-[420px]">
                <span className="block text-sm font-medium text-slate-700 mb-1">Nome do médico</span>
                <Select.Root onValueChange={field.onChange} defaultValue={crm}>
                  <Select.Trigger
                    className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white shadow-[0_2px_10px] shadow-black/10 hover:bg-gray-100/10  focus:ring-1 focus:ring-teal-400 data-[placeholder]:text-violet9 outline-none transition ease-linear "
                    aria-label="Food"
                  >
                    <Select.Value placeholder="Selecione um médico…" />
                    <Select.Icon className="pl-2">
                      <FontAwesomeIcon icon={faChevronDown} fontSize={"1em"} />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                      <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                      </Select.ScrollUpButton>
                      <Select.Viewport className="p-[6px]">
                        <Select.Group>
                          <Select.Label className="px-[25px] pt-1 text-xs leading-[25px]">
                          </Select.Label>

                          {doctorsAPI.allDoctorsData.map((doctor) => (
                            <Select.Item
                              key={doctor.crm}
                              value={doctor.crm}
                              className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-teal-100 data-[highlighted]:text-slate-900"
                            >
                              <Select.ItemText>{doctor.name}</Select.ItemText>
                              <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                <FontAwesomeIcon icon={faCheck} fontSize={"1em"} />
                              </Select.ItemIndicator>
                            </Select.Item>
                          ))}


                        </Select.Group>
                      </Select.Viewport>
                      <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white cursor-default">
                      </Select.ScrollDownButton>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>

            )}

          />
          {errors.doctorCrm && <div className="text-red-500 text-xs -mt-2">{errors.doctorCrm.message}</div>}

          <div className="flex justify-between">
            <div>
              <span className="block text-sm font-medium text-slate-700">CPF do paciente</span>

              <Controller
                name="patientCpf"
                control={control}
                key={cpf}
                rules={{
                  required: "CPF do paciente é obrigatório"
                }}
                render={({ field }) => (
                  <IMaskInput
                    mask="000.000.000-00"
                    defaultValue={isEditForm ? cpf : ""}
                    unmask={true}
                    onAccept={(value) => field.onChange(value)}

                    className="mt-1 block w-40 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-teal-300 focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 
                  disabled:cursor-not-allowed"
                  />

                )}
              />

              {errors.patientCpf && <div className="text-red-500 text-xs mt-1">{errors.patientCpf.message}</div>}
            </div>

            <div>
              <span className="block text-sm font-medium text-slate-700">Data da consulta</span>
              <input {...register("date", {
                required: "Data da consulta é obrigatória",
                setValueAs: (value) => value + ":00Z"
              })}
                type="datetime-local"
                className="mt-1 block w-[210px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-teal-300 focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
              {errors.date && <div className="text-red-500 text-xs mt-1">{errors.date.message}</div>}
            </div>
          </div>

          <div className="flex flex-row-reverse">
            <button className="mt-2 bg-teal-300 hover:bg-teal-400 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold transition ease-linear text-right select-none text-slate-800" type="submit">
              {buttonTitle}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}