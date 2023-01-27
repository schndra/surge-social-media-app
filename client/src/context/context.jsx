import React, { useContext, useState, useReducer } from "react";
import { toast } from "react-toastify";
import reducer from "./reducer";
import axios from "axios";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token,
  posts: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostSidebar, setIsPostSidebar] = useState(false);

  const BASE_URL = import.meta.env.VITE_MY_URL;
  // console.log(BASE_URL);

  const addUserToLocalStorage = (data) => {
    const { token, user } = data;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };
  //remove from local ---> logout

  const setUser = async (userData) => {
    const { currUser, url, textAlert, captchaToken } = userData;
    // console.log(captchaToken);
    const newData = {
      ...currUser,
      captchaToken,
    };

    try {
      const response = await axios.post(`${BASE_URL}/user/${url}`, newData);
      // console.log(response);
      const { user, token } = response.data;
      dispatch({
        type: "USER_SUCCESS",
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
      toast.success(`${textAlert}`);
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.msg}`);
      // dispatch({ type: "SET_USER_ERROR" });
    }

    // console.log(currUser, url, textAlert);
  };

  const getAllPosts = async () => {
    try {
      // console.log(token);
      const response = await axios.get(`${BASE_URL}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { posts } = response.data;
      // console.log(response);
      dispatch({
        type: "GET_ALL_POSTS",
        payload: { posts },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
    setIsModalOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setIsModalOpen(false);
  };

  const togglePostSidebar = () => {
    setIsPostSidebar(!isPostSidebar);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        isSidebarOpen,
        isPostSidebar,
        togglePostSidebar,
        isModalOpen,
        setUser,
        getAllPosts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
