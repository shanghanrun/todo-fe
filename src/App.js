import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import {useState, useEffect} from 'react'
import api from "./utils/api";
import PrivateRoute from "./routes/PrivateRoute";


function App() {
  const [user, setUser] = useState('')

  const getUser = async()=>{  //토큰을 통해 유저정보를 가져온다.
    try{
      const storedToken = sessionStorage.getItem('token')
      //토큰이 유효한 지 백엔드에 검증요청
      if(storedToken){
        const resp = await api.get('/user/me')
        console.log('user정보 :', resp.data.user)
        setUser(resp.data.user)
        console.log('user정보를 set 함')
      }

    }catch(e){
      setUser(null)
    }
  }

  useEffect(()=>{
    getUser()
  },[])
    return (
      <Routes>
        <Route path="/" element={
            <PrivateRoute  user={user}>
              <TodoPage setUser={setUser}/>
            </PrivateRoute>} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/login" element={<LoginPage user={user} setUser={setUser}/>} />
      </Routes>
    );
}

export default App;
