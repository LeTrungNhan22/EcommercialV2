import axios from "axios";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { FaDollarSign, FaTicketAlt } from "react-icons/fa";
import { getError } from "../../utils/error";
import GooglePayButton from "@google-pay/button-react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-hot-toast";

export const UpdateQuantity = ({
  quantity,
  cartId,
  totalPrice,
  price,
  cartDetail,
}) => {
  const basUrl = process.env.NEXT_PUBLIC_API_URL;
  const [qty, setQty] = useState(0);
  const [ttprice, setTtprice] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    console.log(cartDetailByUserId);
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    setQty(quantity);
    setTtprice(totalPrice);
  }, [quantity, totalPrice]);
  const deleteItemCart = async () => {
    try {
      await axios
        .delete(
          `${basUrl}/cart/1.0.0/cart-item/${cartId}/deleted
            `
        )
        .then(function (response) {
          if (response.status == 200) {
            const { data } = response;

            toast.success("Đã xóa sản phẩm");
          }
        })
        .catch(function (error) {
          console.error(getError(error));
        });
    } catch (error) {
      console.log(getError(error));
    }
  };

  const updateQtyInc = async () => {
    try {
      await axios
        .put(
          `${basUrl}/cart/1.0.0/cart-item/${cartId}/update-quantity?quantity=${
            qty + 1
          }`
        )
        .then(function (response) {
          if (response.status == 200) {
            const { data } = response;
            const { itemToShops } = data;
            const updateQty = itemToShops.find((id) => (id = cartId));

            setQty(updateQty.quantity);
            setTtprice(updateQty.totalPrice);
          }
        })
        .catch(function (error) {
          console.error(getError(error));
        });
    } catch (error) {
      console.log(getError(error));
    }
  };
  const updateQtyDec = async () => {
    try {
      await axios
        .put(
          `${basUrl}/cart/1.0.0/cart-item/${cartId}/update-quantity?quantity=${
            qty - 1
          }`
        )
        .then(function (response) {
          if (response.status == 200) {
            const { data } = response;
            const { itemToShops } = data;
            const updateQty = itemToShops.find((id) => (id = cartId));

            setQty(updateQty.quantity);
            setTtprice(updateQty.totalPrice);
          }
        })
        .catch(function (error) {
          console.error(getError(error));
        });
    } catch (error) {
      console.log(getError(error));
    }
  };

  return (
    <div className="w-1/2 flex items-center justify-between">
      <span className="ml-2">{price}</span>
      <div>
        <div className="ml-2">
          <div className="  flex border  border-gray-300 text-gray-300 w-max divide-x divide-gray-300">
            <div
              onClick={() => updateQtyDec()}
              className="text-green-500 select-none h-8 w-8 text-xl flex items-center justify-center cursor-pointer"
            >
              -
            </div>
            <div className="select-none font-semibold text-black h-8 w-8 text-base flex items-center justify-center">
              {qty}
            </div>
            <div
              onClick={() => updateQtyInc()}
              className=" text-red-500 select-none h-8 w-8 text-xl flex items-center justify-center cursor-pointer"
            >
              +
            </div>
          </div>
        </div>
      </div>
      <span>{ttprice}</span>
      <div>
        <span
          onClick={() => deleteItemCart()}
          className="text-red-500 cursor-pointer"
        >
          Xóa
        </span>
      </div>
    </div>
  );
};
