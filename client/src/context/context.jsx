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

  const customFetch = axios.create({
    baseURL: `${BASE_URL}`,
  });
  customFetch.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${state.token}`;

  // Add a request interceptor
  // customFetch.interceptors.request.use(
  //   (config) => {
  //     // Do something before request is sent
  //     console.log(config.headers);
  //     // config.headers.common["Authorization"] = `Bearer ${state.token}`;
  //     return config;
  //   },
  //   (error) => {
  //     // Do something with request error
  //     return Promise.reject(error);
  //   }
  // );

  const addUserToLocalStorage = (data) => {
    const { token, user } = data;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };
  //remove from local ---> logout
  const removeUser = () => {
    console.log("im remove");
    dispatch({ type: "LOGOUT_USER" });
    toast.success("Logged out successfully");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

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
      // const response = await customFetch.get(`${BASE_URL}/posts`, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      const response = await customFetch("/posts");
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
    setIsModalOpen(!isModalOpen);
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
        removeUser,
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
