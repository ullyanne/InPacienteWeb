import { Link } from "react-router-dom";

export default function NotFoundPage(){
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <img className="rounded-full round shadow-md border border-gray-400" src="src/assets/not-found.png" alt="" />
        <div className="p-5 space-y-2 flex flex-col justify-center items-center text-xl">
          <h1>Ooops! Esta página não existe.</h1>
          <Link className="font-semibold hover:text-teal-500 transition ease-in-out delay-75" to="/">Voltar para a página inicial</Link>
        </div>

      </div>
    </div>

  )
}