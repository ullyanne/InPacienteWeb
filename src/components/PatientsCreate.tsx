import { SubmitHandler, useForm } from "react-hook-form"
import { api } from "../api/api"
import { toast } from "sonner"

export type PatientFormFields = {
  name: string
  cpf: string
  phoneNumber: string
  address: string
}

export function PatientsCreate() {
  const { register, handleSubmit, formState: { errors } } = useForm<PatientFormFields>()

  const onSubmit: SubmitHandler<PatientFormFields> = async (data) => {
    try {
      await api.post('/patients', data);

      toast.success("Paciente criado com sucesso!")
    }
    catch (e) {
      console.log(e)
    }
    console.log(data)
  }

  return (
    <div className="mt-[70px] ml-20 px-1">
      <div className="text-2xl mb-10  font-semibold">
        <h1>Novo paciente</h1>
      </div>

      <div className="max-w-96">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <span className="block text-sm font-medium text-slate-700">Nome completo</span>
            <input {...register("name", {
              required: "Nome é obrigatório",
              pattern: /^[a-zA-Zà-úÀ-Ú ]+$/,
            })}
              type="name"

              className="mt-1 block w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-teal-300 focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
            {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name.message}</div>}
          </div>

          <div className="flex gap-6">
            <div>
              <span className="block text-sm font-medium text-slate-700">CPF</span>
              <input {...register("cpf", {
                required: "CPF é obrigatório",
                pattern: /^[\d+$]/
              })}
                type="cpf"

                className="mt-1 block w-40 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-teal-300 focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
              {errors.cpf && <div className="text-red-500 text-xs mt-1">{errors.cpf.message}</div>}
            </div>

            <div>
              <span className="block text-sm font-medium text-slate-700">Número de telefone</span>
              <input {...register("phoneNumber", {
                maxLength: 11,
                setValueAs: (value) => value === "" ? null : value
              })}
                type="phoneNumber"

                className="mt-1 block w-[200px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-teal-300 focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
            </div>

          </div>

          <div>
            <span className="block text-sm font-medium text-slate-700">Endereço</span>
            <input {...register("address", {
              required: "Endereço é obrigatório",
              pattern: /^[a-zA-Zà-úÀ-Ú ]+$/
            })}
              type="address"

              className="mt-1 block w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-teal-300 focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
            {errors.address && <div className="text-red-500 text-xs mt-1">{errors.address.message}</div>}
          </div>

          <div className="flex flex-row-reverse">
            <button className="mt-2 bg-teal-300 hover:bg-teal-400 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold transition ease-linear text-right select-none text-slate-800" type="submit">
              Criar
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}