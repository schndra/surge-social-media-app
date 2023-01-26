import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useGlobalContext } from "../context/context";

const Sidebar = () => {
  const { closeSidebar } = useGlobalContext();

  return (
    <aside className="bg-white h-screen p-4 flex items-center z-50 lg:hidden absolute w-[375px] right-0">
      <IoCloseOutline
        className="absolute top-2 right-4 hover:cursor-pointer"
        size={50}
        onClick={closeSidebar}
      />
      <div>
        <h2>Surge SE Internship</h2>
        <h2>March 2023</h2>
        <h3 className="mt-8">Abhishek Sachindra</h3>
      </div>
    </aside>
  );
};

export default Sidebar;
