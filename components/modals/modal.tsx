import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import IconButton, {
  IconButtonVariant,
} from "@/components/buttons/icon-button";

export default function Modal({
  isOpen,
  closeModal,
  title,
  children,
}: {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div
          className={`fixed inset-0 flex items-center justify-center overflow-y-auto p-4 ${
            isOpen && "sm:mr-[15px]"
          }`}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-gray-600 bg-gray-800 p-6 text-gray-50 shadow-lg shadow-gray-600/50">
              {/* Modal header and close button */}
              <div className="flex items-center justify-between">
                <Dialog.Title as="h3" className="text-xl font-semibold">
                  {title}
                </Dialog.Title>
                <IconButton
                  onClick={closeModal}
                  variant={IconButtonVariant.Close}
                />
              </div>
              {/* Modal content */}
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
