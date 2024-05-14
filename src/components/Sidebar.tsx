import { faAddressCard, faCalendarDays, faStethoscope, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons/faNotesMedical";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Outlet } from "react-router-dom";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";

export function Sidebar() {
  return (
    <div className="flex">
      <nav className="flex-none bg-white h-screen w-60 text-slate-900 shadow-md fixed">
        <div className="pl-7">
          <div className="pt-8 font-bold" >
            <FontAwesomeIcon icon={faNotesMedical} style={{ color: "#2dd4bf", }} fontSize={"2.2em"} />
            <span className="pl-3 text-2xl">InPaciente</span>
          </div>

          <div className="border-b border-gray-200 -ml-7 mt-7">
          </div>

          <ul className="flex flex-col gap-14 mt-12 text-lg font-semibold select-none">
            <li>
              <NavLink to="/" className={({ isActive }) =>
                isActive ?
                  "text-teal-400"
                  :
                  "hover:text-teal-400 transition ease-in-out delay-75"
              }>
                <div>
                  <FontAwesomeIcon icon={faUserGroup} fontSize={"1.4em"} />
                  <span className="pl-4">
                    Pacientes
                  </span>
                </div>

              </NavLink>
            </li>

            <li>
              <NavLink to="/consultas" className={({ isActive }) =>
                isActive ?
                  "text-teal-400"
                  :
                  "hover:text-teal-400 transition ease-in-out delay-75"
              }>
                <div>
                  <FontAwesomeIcon icon={faCalendarDays} fontSize={"1.6em"} />
                  <span className="pl-[1.3rem]">
                    Consultas
                  </span>
                </div>

              </NavLink>
            </li>

            <li>
              <NavLink to="/medicos" className={({ isActive }) =>
                isActive ?
                  "text-teal-400"
                  :
                  "hover:text-teal-400 transition ease-in-out delay-75"
              }>
                <div>
                  <FontAwesomeIcon icon={faStethoscope} fontSize={"1.4em"} />
                  <span className="pl-[1.15rem]">
                    Médicos
                  </span>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <div className="w-60" >
      </div>

      <div className="h-screen flex flex-col justify-between w-full">
        <Outlet />

        <footer className="w-screen -ml-60 text-sm flex flex-col justify-center mt-16 text-slate-700/60">
          <div className="flex justify-center mt-10">
            <div className="flex flex-col">
              <ul className="flex flex-row justify-center gap-10 mt-3 ">
                <li className="hover:text-slate-600/90 transition ease-linear">
                  <a target="_blank" href="https://ullyanne.vercel.app/">
                    <FontAwesomeIcon icon={faAddressCard} fontSize="2.1em" />
                  </a>
                </li>

                <li className="hover:text-slate-600/90 transition ease-linear">
                  <a target="_blank" href="https://github.com/ullyanne/InPacienteweb">
                    <FontAwesomeIcon icon={faGithub} fontSize="2em" />
                  </a>
                </li>

                <li className="hover:text-slate-600/90 transition ease-linear">
                  <a target="_blank" href="https://www.linkedin.com/in/ullyanne-patriota/">
                    <FontAwesomeIcon icon={faLinkedin} fontSize="2.1em" />
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="flex justify-center mt-4 mb-5 whitespace-pre">
            <span>Copyright</span>
            <span className="text-teal-500"> © </span>
            <span>2024 Ullyanne</span>
          </div>

        </footer>
      </div>

    </div>

  )
}