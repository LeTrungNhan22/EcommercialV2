import React, { useContext, useEffect, useState } from "react";
import { GrLocation } from "react-icons/gr";
import AddressPopUp from "./AddressPopUp";
import LanguageContext from "../../context/languageContext";


export default function UserAddress({
  username,
  fullName,
  imageUrl,
  email,
  birthday,
  telephone,
  gender,
  id,
  address,
  shop,
  closeModal,
  openModal,
  isOpen,
}) {
  const [addressList, setAddressList] = useState({});

  const {languageData}=useContext(LanguageContext);
  const {
    info_my_address,
    info_delivery_address,
    order_button_change_address
  }=languageData;

  useEffect(() => {
    setAddressList(address);
  }, [address]);
  return (
    <div className="bg-white p-3 rounded-md">
      <div className="flex items-center m-4 ">
        <h3 className="text-gray-700 text-2xl font-bold  flex-1">
          {info_my_address}
        </h3>
        <AddressPopUp
          openModal={openModal}
          closeModal={closeModal}
          isOpen={isOpen}
          addressList={addressList}
          setAddressList={setAddressList}
          id={id}
          fullName={fullName}
          telephone={telephone}
        />
      </div>
      <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700 "></hr>
      <section className="bg-white w-full mb-3  ">
        <div className="address-checkout"></div>
        <div className="p-3 flex items-center space-x-3 text-amber-500 text-xl mb-3">
          <GrLocation className="text-amber-500" />
          <h3>{info_delivery_address}</h3>
        </div>

        <div className="grid grid-cols-4 mx-auto items-center justify-center px-4 pb-6">
          <div className=" flex flex-col">
            <span>{fullName}</span>
            <span className="font-bold">{telephone}</span>
          </div>
          <div className="col-span-2">
            <p>
              {addressList?.address1 == null
                ? "No address information yet"
                : addressList?.address1}
            </p>
          </div>
          <div className="space-x-10 mx-auto">
            <>
              <button
                type="button"
                onClick={openModal}
                className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                {order_button_change_address}
              </button>
            </>
          </div>
        </div>
      </section>
    </div>
  );
}
