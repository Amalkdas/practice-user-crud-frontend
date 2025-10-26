
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Home'
import { ToastContainer, toast } from "react-toastify";
import Display from './Display';



function App() {
 

  return (
    <>
        <ToastContainer position='top-center' style={{marginTop:'30px'}} />
    <Routes>


      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/display' element={<Display></Display>}></Route>
    </Routes>
     
    </>
  )
}

export default App
