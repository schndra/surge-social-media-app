import { Routes, Route } from "react-router-dom";
import { Posts, Register, Error } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
