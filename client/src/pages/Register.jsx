import React, { useState } from "react";
import BgImage from "../assets/bgImage.jpg";
import { FormInputRow, Sidebar, ModalBackDrop } from "../components";
import { toast } from "react-toastify";
import { RxHamburgerMenu } from "react-icons/rx";
import { useGlobalContext } from "../context/context";

const state = {
  name: "",
  username: "",
  email: "",
  password: "",
  isUser: true,
};

const Register = () => {
  const [value, setValue] = useState(state);
  const { openSidebar, isSidebarOpen } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, password, email, isUser } = value;
    if (!email || !password || (!name && !isUser)) {
      toast.warn("provide all values", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleChange = (e) => {
    // console.log(e.target);
    console.log("im changed");
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const toggleUser = () => {
    //reset the vals

    setValue({
      ...value,
      isUser: !value.isUser,
      name: "",
      password: "",
      email: "",
      username: "",
    });
  };

  return (
    <>
      <ModalBackDrop />
      {isSidebarOpen && <Sidebar />}
      <main className="lg:flex">
        <button
          className="absolute right-7 lg:hidden top-2 "
          onClick={openSidebar}
        >
          <RxHamburgerMenu className="text-white" size={30} />
        </button>
        <section className="lg:flex-1 lg:relative">
          <img
            src={BgImage}
            alt="background-img"
            className="fixed h-full w-full object-cover -z-40"
          />
          <div className="z-50 w-full h-full bg-black opacity-25"></div>
          <div className="w-[400px] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-8 rounded-lg drop-shadow-md">
            <form onSubmit={handleSubmit}>
              <h3 className="text-center mb-9">
                {value.isUser ? "Login" : "SignUp"}
              </h3>
              {/* <div className="flex flex-col mb-4">
              <label htmlFor="email">email</label>
              <input
                type="text"
                name="email"
                className="px-2 py-1 border border-gray-300 rounded-md "
              />
            </div> */}
              <FormInputRow
                labelText={"username"}
                name={"username"}
                type={"text"}
                handleChange={handleChange}
                value={value.username}
              />
              {!value.isUser && (
                <FormInputRow
                  labelText={"name"}
                  name={"name"}
                  type={"text"}
                  handleChange={handleChange}
                  value={value.name}
                />
              )}

              {!value.isUser && (
                <FormInputRow
                  labelText={"email"}
                  name={"email"}
                  type={"email"}
                  handleChange={handleChange}
                  value={value.email}
                />
              )}
              <FormInputRow
                labelText={"password"}
                name={"password"}
                type={"password"}
                handleChange={handleChange}
                value={value.password}
              />
              <button
                type="submit"
                className="bg-slate-500 w-full font-black   text-white rounded-lg px-2 py-1 uppercase tracking-widest  hover:bg-slate-600 my-2 "
              >
                {value.isUser ? "Login" : "register"}
              </button>
              <p className="capitalize text-xs text-end">
                {value.isUser ? "not registered?" : "registered?"}
                <span
                  className="text-blue-400 hover:cursor-pointer hover:text-blue-600 pl-1"
                  onClick={toggleUser}
                >
                  {value.isUser ? "sign up" : "login"}
                </span>{" "}
              </p>
            </form>
          </div>
        </section>
        <section className="bg-white h-screen p-4 items-center hidden lg:flex">
          <div>
            <h2>Surge SE Internship</h2>
            <h2>March 2023</h2>
            <h3 className="mt-8">Abhishek Sachindra</h3>
          </div>
        </section>
      </main>
    </>
  );
};

export default Register;
