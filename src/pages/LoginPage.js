import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Link, useNavigate, Navigate } from "react-router-dom";
import api from "../utils/api";

const LoginPage = ({user, setUser}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin =async(e)=>{
    e.preventDefault();
    try{  
      // 백엔드에 로그인에 관한 컨트롤러(loginWithEmail) 준비되어 있다. 그래서 성공하면 유저정보와 토큰을 프론트앤드로 보내준다.
      // 로그인주소는  localhost:5000/api/user/login 이다.
      // register주소는 localhost:5000/api/user이다.
      console.log('email password :', email, password)
      const resp = await api.post('/user/login', {email, password})
      
      console.log('로그인 성공시 resp:', resp)
      if(resp.status ===200){
        setUser(resp.data.user)
        sessionStorage.setItem("token", resp.data.token)
        api.defaults.headers['authorization'] = "Bearer "+resp.data.token
        setError('')
        navigate('/')  // 일단 TodoPage로 이동
      } else{
        throw new Error(resp.message)
      }
    }catch(e){
      setError(e.message)
      document.getElementById('formBasicEmail').value = ''; 
      document.getElementById('formBasicPassword').value = '';
    }
  }

  if(user){
    return <Navigate to='/' />
  }
  return (
    <div className="display-center">
      {error && <div className="error">{error}</div>}
      <Form className="login-box"
        onSubmit={handleLogin}
      >
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" 
            onChange={(e)=>setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" 
            onChange={(e)=>setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;