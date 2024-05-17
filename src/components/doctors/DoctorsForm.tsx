import { SubmitHandler, useForm } from "react-hook-form"
import { useDoctorsAPI } from "../../api/doctors/DoctorsApi"
import { useEffect } from "react"

export type DoctorFormFields = {
  name: string
  crm: string
  specialty: string
}

interface DoctorsFormProps {
  pageTitle: string
  buttonTitle: string
  doctorCrm?: string
  isEditForm: boolean
  onSubmit: SubmitHandler<DoctorFormFields>
}

export function DoctorsForm({ pageTitle, buttonTitle, doctorCrm, isEditForm, onSubmit }: DoctorsFormProps) {

  const { register, handleSubmit, reset, formState: { errors, dirtyFields } } = useForm<DoctorFormFields>()

  const doctorsAPI = useDoctorsAPI()

  useEffect(() => {
    if (isEditForm) {
      (async () => {
        try {
          const response = await doctorsAPI.getDoctorData(doctorCrm)
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
              <span className="block text-sm font-medium text-slate-700">CRM</span>
              <input {...register("crm", {
                required: "CRM é obrigatório",
              })}
                type="crm"
                className="mt-1 block w-40 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-teal-300 focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
              {errors.crm && <div className="text-red-500 text-xs mt-1">{errors.crm.message}</div>}
            </div>

            <div>
              <span className="block text-sm font-medium text-slate-700">Especialidade</span>
              <input {...register("specialty", {
                required: "Especialidade é obrigatória",
                pattern: /^[a-zA-Zà-úÀ-Ú ]+$/
              })}
                type="specialty"
                className="mt-1 block w-[200px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-teal-300 focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
              {errors.specialty && <div className="text-red-500 text-xs mt-1">{errors.specialty.message}</div>}
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