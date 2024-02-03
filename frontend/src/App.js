import Login from "./components/Login";
import { Routes,Route } from "react-router-dom";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Task from "./components/Task";

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/login"  element={<Login/>}  />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/task" element={<Task/>} />
      </Routes>
    </div>
  );
}

export default App;
