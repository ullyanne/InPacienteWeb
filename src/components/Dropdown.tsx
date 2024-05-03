import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export function Dropdown(){
  return (
    <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className="-ml-9 rounded-lg w-[25px] h-[25px] inline-flex items-center justify-center text-violet11 outline-none focus:shadow-[0_0_0_2px] text-slate-900"
              aria-label="Customise options"
            >
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content side="right"
              className="min-w-[120px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
              sideOffset={5}
            >
              <DropdownMenu.Item className="group text-[13px] leading-none rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[highlighted]:bg-gray-100">
                Editar{' '}
              </DropdownMenu.Item>
              <DropdownMenu.Item className="group text-[13px] leading-none rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none  data-[highlighted]:bg-red-100">
                <span className="text-red-500">
                  Deletar{' '}
                </span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
  )
}