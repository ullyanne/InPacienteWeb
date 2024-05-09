import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { NavLink } from "react-router-dom";

interface DropdownProps {
  contentId: string
  onDeleteButton: (contentId: string) => Promise<void>
  editInfoPath: string
}

export function Dropdown({ contentId, onDeleteButton, editInfoPath }: DropdownProps) {
  return (
    <Dialog.Root >
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="-ml-9 rounded-lg w-[25px] h-[25px] inline-flex items-center justify-center outline-none focus:shadow-[0_0_0_2px] text-slate-900"
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content side="right"
            className="min-w-[120px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            sideOffset={5}
          >

            <NavLink to={editInfoPath} >
              <DropdownMenu.Item className="group text-[13px] leading-none rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[highlighted]:bg-gray-100"
              >
                Editar{' '}
              </DropdownMenu.Item>
            </NavLink>

            <Dialog.Trigger className="w-full" >
              <DropdownMenu.Item className="group text-[13px] leading-none rounded-[3px] flex items-center w-full h-[25px] px-[5px] relative pl-[25px] select-none outline-none  data-[highlighted]:bg-red-100"

              >
                <span className="text-red-500">
                  Deletar{' '}
                </span>
              </DropdownMenu.Item>
            </Dialog.Trigger>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/40 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none selec"
        >
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Deletar registro de paciente
          </Dialog.Title>
          <Dialog.Description className="mt-[10px] mb-5 text-[15px] leading-normal">
            <span>Você tem certeza de que deseja deletar o registro de paciente?</span> <span className="font-semibold">Esta ação não poderá ser desfeita.</span>
          </Dialog.Description>
          <div className="mt-[25px] flex justify-end gap-3">
            <Dialog.Close asChild>
              <button type="button" onClick={() => onDeleteButton(contentId)} className="inline-flex h-[35px] items-center justify-center rounded-md px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px]  bg-red-600 text-slate-50 border hover:bg-red-500 transition ease-in-out select-none focus-outline:none">
                Deletar
              </button>
            </Dialog.Close>

            <Dialog.Close asChild>
              <button className="inline-flex h-[35px] items-center justify-center rounded-md px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none border hover:bg-gray-100/85 transition ease-in-out select-none">
                Cancelar
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none hover:bg-gray-50 transition ease-in-out"
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}