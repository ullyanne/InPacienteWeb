import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (value: string) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  handleClearSubmit: () => Promise<void>
}

export function SearchBar({ searchQuery, setSearchQuery, handleSubmit, handleClearSubmit }: SearchBarProps) {
  return (
    <form className="relative flex" onSubmit={handleSubmit}>
      <FontAwesomeIcon className="absolute inset-y-2.5 start-0 ps-3 pointer-events-none rtl:inset-r-0" icon={faMagnifyingGlass} />
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        className="block p-2 ps-9 text-sm text-gray-900 border border-gray-300 rounded-lg w-sm bg-gray-50"
        placeholder="Pesquisar..." />
      {searchQuery &&
        <button type="button" onClick={() => handleClearSubmit()}>
          <FontAwesomeIcon className="absolute inset-y-3 right-0 pr-3" icon={faXmark} />
        </button>
      }
    </form>
  )
}