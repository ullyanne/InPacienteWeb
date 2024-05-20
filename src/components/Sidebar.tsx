import { faAddressCard, faCalendarDays, faStethoscope, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons/faNotesMedical";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Outlet } from "react-router-dom";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <div className="flex max-sm:overflow-y-scroll max-md:flex-col md:overflow-y-scroll">

      <button className="self-start md:hidden ml-5 mt-5" onClick={() => { setShowSidebar(true) }}>
        <Menu />
      </button>

      <nav className={"md:block flex-none bg-white md:h-screen w-60 text-slate-900 shadow-md md:fixed z-20 " + (showSidebar ? "block fixed h-full" : "hidden")}>
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

      <div onClick={() => { setShowSidebar(false) }} className={"fixed inset-0 bg-black/10 backdrop-blur-sm z-10 " + (showSidebar ? "" : "hidden") }></div>

      <div className="mr-5 w-full md:ml-60 flex flex-col justify-between h-screen">
        <div className="md:mt-[70px] mt-10 lg:ml-20 ml-5 md:ml-20">
          <Outlet />
        </div>

        <footer className="ml-5 md:ml-20 lg:ml-20 mb-3 pb-4 text-sm flex flex-row gap-3 text-slate-700/60 ">
          <div className="flex mt-4 whitespace-pre">
            <span>Copyright</span>
            <span className="text-teal-500"> © </span>
            <span className="pr-4">2024 Ullyanne</span>
            <span className="border-l border-slate-200"></span>
          </div>

          <div className="flex pl-4">
            <div className="flex flex-col">
              <ul className="flex flex-row  gap-5 mt-3 ">
                <li className="hover:text-slate-600/90 transition ease-linear">
                  <a target="_blank" href="https://ullyanne.vercel.app/">
                    <FontAwesomeIcon icon={faAddressCard} fontSize="1.8em" />
                  </a>
                </li>

                <li className="hover:text-slate-600/90 transition ease-linear">
                  <a target="_blank" href="https://github.com/ullyanne/InPacienteweb">
                    <FontAwesomeIcon icon={faGithub} fontSize="1.7em" />
                  </a>
                </li>

                <li className="hover:text-slate-600/90 transition ease-linear">
                  <a target="_blank" href="https://www.linkedin.com/in/ullyanne-patriota/">
                    <FontAwesomeIcon icon={faLinkedin} fontSize="1.8em" />
                  </a>
                </li>
              </ul>
            </div>

          </div>



        </footer>
      </div>

    </div>
  )
}