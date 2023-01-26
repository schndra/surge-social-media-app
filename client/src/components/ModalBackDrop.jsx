import React from "react";
import { useGlobalContext } from "../context/context";

const ModalBackDrop = () => {
  const { isModalOpen, closeSidebar } = useGlobalContext();

  return (
    <div
      className={`${
        isModalOpen
          ? "fixed w-full h-full bg-black opacity-25 lg:hidden z-[40]"
          : "hidden"
      }`}
      onClick={closeSidebar}
    ></div>
  );
};

export default ModalBackDrop;
