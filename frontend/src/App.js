import Login from "./components/Login";
import { Routes,Route } from "react-router-dom";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Task from "./components/Task";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <AuthProvider>
        
        <Navbar/>
        
        
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login"  element={<Login/>}  />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/task" element={<Task/>} />
        </Routes>


        
      </AuthProvider>


    </div>
  );
}

export default App;
