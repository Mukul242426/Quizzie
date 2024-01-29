import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./Components/Register/Register";
import Dashboard from "./Components/Dashboard/Dashboard";
import Quiz from "./Components/Quiz/Quiz";
import { Toaster } from "react-hot-toast";
import { UserContext } from "./contexts/UserContext";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false)

  useEffect(()=>{
    if(localStorage.getItem('token')){
      setIsLoggedIn(true);
    }
  },[])

  return (
    <>
      <Toaster/>
      <UserContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz/:id" element={<Quiz/>}/>
      </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
