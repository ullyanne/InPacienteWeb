import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { usePatientsApi } from "../../api/patients/PatientsApi";
import { IMaskInput } from "react-imask";

export type PatientFormFields = {
  name: string
  cpf: string
  phoneNumber: string | null
  address: string
}

interface PatientsFormProps {
  pageTitle: string
  buttonTitle: string
  patientCpf?: string
  isEditForm: boolean
  onSubmit: SubmitHandler<PatientFormFields>
}

export function PatientsForm({ pageTitle, buttonTitle, patientCpf, isEditForm, onSubmit }: PatientsFormProps) {

  const { register, handleSubmit, reset, control, formState: { errors, dirtyFields } } = useForm<PatientFormFields>(
    {
      defaultValues: {
        phoneNumber: null
      }
    }
  )

  const patientsAPI = usePatientsApi()
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (isEditForm) {
      (async () => {
        try {
          const response = await patientsAPI.getPatientData(patientCpf)
          setPhone(response?.phoneNumber!)
          reset(response)
        }
        catch (e) {
          console.log(e)
        }
      })();
    }
  }, [reset, isEditForm]);

  return (
    <div className="px-1">
      <div className="text-2xl mb-10  font-semibold">
        <h1>{pageTitle}</h1>
      </div>

      <div className="max-sm:min-w-96 w-96">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit((data) => onSubmit(data, dirtyFields as any))}>
          <div>
            <span className="block text-sm font-medium text-slate-700">Nome completo</span>
            <input {...register("name", {
              required: isEditForm ? "" : "Nome é obrigatório",
              pattern: /^[a-zA-Zà-úÀ-Ú ]+$/,
            })}
              type="name"
              disabled={isEditForm}
              className="mt-1 block w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-teal-300 focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:cursor-not-allowed"
            />
            {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name.message}</div>}
          </div>

          <div className="flex gap-6">
            <div>
              <span className="block text-sm font-medium text-slate-700">CPF</span>
              <Controller
                name="cpf"
                control={control}
                key={patientCpf}
                rules={{
                  required: isEditForm ? "" : "CPF do paciente é obrigatório"
                }}
                render={({ field }) => (
                  <IMaskInput
                    mask="000.000.000-00"
                    defaultValue={isEditForm ? patientCpf : ""}
                    unmask={true}
                    disabled={isEditForm}
                    onAccept={(value) => field.onChange(value)}

                    className="mt-1 block w-40 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-teal-300 focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 
                  disabled:cursor-not-allowed"
                  />

                )}
              />
              {errors.cpf && <div className="text-red-500 text-xs mt-1">{errors.cpf.message}</div>}
            </div>

            <div>
              <span className="block text-sm font-medium text-slate-700">Número de telefone</span>

              <Controller
                name="phoneNumber"
                control={control}
                key={phone}
                rules={{
                  minLength: {
                    value: 11,
                    message: "Telefone incompleto. Considere adicionar o prefixo 9"
                  }
                }}
                render={({ field }) => (
                  <IMaskInput
                    mask="(00) 00000-0000"
                    defaultValue={isEditForm ? phone : ""}
                    unmask={true}
                    onAccept={(value) => field.onChange(value)}

                    className="mt-1 block w-[200px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-teal-300 focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 
                  disabled:cursor-not-allowed"
                  />

                )}
              />
              {errors.phoneNumber && <div className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</div>}
            </div>
          </div>

          <div>
            <span className="block text-sm font-medium text-slate-700">Endereço</span>
            <input {...register("address", {
              required: "Endereço é obrigatório",
            })}
              type="address"
              className="mt-1 block w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-teal-300 focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
            {errors.address && <div className="text-red-500 text-xs mt-1">{errors.address.message}</div>}
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