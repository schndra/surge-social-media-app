import { Routes, Route } from "react-router-dom";
import { Posts, Register, Error, Protected } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "./context/context";

function App() {
  const { user } = useGlobalContext();
  console.log(user);
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route
          path="posts"
          element={
            <Protected user={user}>
              <Posts user={user} />
            </Protected>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
