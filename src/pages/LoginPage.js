import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin =async(e)=>{
    e.preventDefault();
    // userInfo에 있는 email, password(암호화) 와 입력된 email, password가 일치할 경우 TodoPage로 이동하게 한다. 아니면 error메시지 (에러 핸들링)
    try{  // 백엔드에 로그인에 관한 컨트롤러(loginWithEmail) 준비되어 있다. 그래서 성공하면 유저정보와 토큰을 프론트앤드로 보내준다.
      // 로그인주소는  localhost:5000/api/user/login 이다.
      // register주소는 localhost:5000/api/user이다.
      console.log('email password :', email, password)
      const resp = await api.post('/user/login', {email, password})
      
      console.log('로그인 성공시 resp:', resp)
      if(resp.status ===200){

        // navigate('/')  // 일단 TodoPage로 이동
      } else{
        throw new Error(resp.message)
      }
    }catch(e){
      setError(e.message)
      setEmail(''); setPassword('')
    }
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
            onClick={(e)=>setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" 
            onClick={(e)=>setPassword(e.target.value)}
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