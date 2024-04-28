import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import {useState} from 'react'

function PrivateRoute({user, children}){
  return (
    user? children : <Navigate to='/login' />
  )
}

function App() {
  const [user, setUser] = useState('')

  const getUser = async()=>{
    try{
      const token = sessionStorage.getItem('token')
      //토큰이 유효한 지 백엔드에 검증요청

    }catch(e){

    }
  }
    return (
      <Routes>
        <Route path="/" element={
            <PrivateRoute>
              <TodoPage />
            </PrivateRoute>} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    );
}

export default App;
