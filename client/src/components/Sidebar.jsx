import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useGlobalContext } from "../context/context";
import UserSVG from "../assets/user.svg";

const Sidebar = (props) => {
  const { closeSidebar, togglePostSidebar, user } = useGlobalContext();

  if (props.register) {
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
  }
  if (props.posts) {
    return (
      <aside className="bg-white  h-screen p-4 flex items-center justify-center z-50 lg:hidden fixed w-[375px] right-0 shadow-2xl top-0">
        <IoCloseOutline
          className="absolute top-2 right-4 hover:cursor-pointer"
          size={50}
          onClick={togglePostSidebar}
        />
        <div>
          <div className="rounded-full bg-slate-300 w-24 mx-auto mb-4 p-2">
            <img
              src={
                user.profileImage && user.profileImage !== null
                  ? user.profileImage
                  : UserSVG
              }
              alt="profile image"
              className="w-full "
            />
          </div>
          <h4 className="capitalize">{user.name}</h4>
          <p className="text-center text-gray-500">{user.username}</p>
        </div>
      </aside>
    );
  }

  return <></>;
};

export default Sidebar;
