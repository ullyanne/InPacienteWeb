import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SearchBar() {
  return (
    <div className="relative">
      <FontAwesomeIcon className="absolute inset-y-2.5 start-0 ps-3 pointer-events-none rtl:inset-r-0" icon={faMagnifyingGlass} />
      <input type="text" className="block p-2 ps-9 text-sm text-gray-900 border border-gray-300 rounded-lg w-sm bg-gray-50" placeholder="Pesquisar..." />
    </div>
  )
}