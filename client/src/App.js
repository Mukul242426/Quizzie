import './App.css';
import {Routes,Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import Register from './Components/Register/Register';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  return (
    <>
    <ToastContainer/>
    <Routes>
     <Route path="/" element={<Register/>}/>
     <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
      
    </>
  );
}

export default App;
