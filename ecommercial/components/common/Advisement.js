import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import advisement from "../../assets/home/advisement.png";

const Advisement = () => {
  const [isOpen, setIsOpen] = useState(true);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={closeModal}>
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

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full cursor-pointer max-w-md transform overflow-hidden rounded-2xl bg-transparent p-6 text-left align-middle  transition-all mt-10">
                  <div className="mt-12">
                    <Image
                      src={advisement}
                      width={500}
                      height={600}
                      alt=""
                      className="bg-transparent"
                    ></Image>
                  </div>

                  <div className="absolute top-0 right-1 mt-10">
                    <button
                      type="button"
                      className="inline-flex font-bold justify-center rounded-full border border-transparent bg-gray-100 px-4 py-2 text-sm  text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 transition focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      X
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Advisement;
