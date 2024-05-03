import { faCalendarDays, faStethoscope, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons/faNotesMedical";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Outlet } from "react-router-dom";

export function Sidebar() {
  return (
    <div className="flex">
      <nav className="flex-none bg-white h-screen w-60 text-slate-900 shadow-md">
        <div className=" pl-7">
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

      <div className="w-screen">
        <Outlet />
      </div>

    </div>

  )
}