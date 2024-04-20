import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Login(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      userId: id,
      userPassword: password,
    };

    // 서버로 POST 요청 보내기
    axios.post("http://localhost:3001/login", userData)
      .then((response) => {            
        const json = response.data;
        if(json.isLogin==="True"){
          props.setMode("WELCOME");
        }
        else {
          alert(json.isLogin)
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return <>
    <h2>로그인</h2>

    <form className="form" onSubmit={handleSubmit}>
      <p><input className="login" type="text" value={id} onChange={event => setId(event.target.value)} placeholder="아이디" /></p>
      <p><input className="login" type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="비밀번호" /></p>

      <p><input className="btn" type="submit" value="로그인" /></p>
    </form>

    <p>계정이 없으신가요?  <button onClick={() => {
      props.setMode("SIGNIN");
    }}>회원가입</button></p>
  </> 
}


function Signin(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      userId: id,
      userPassword: password,
      userPassword2: password2,
    };

    // 서버로 POST 요청 보내기
    axios.post("http://localhost:3001/signin", userData)
      .then((response) => {            
        const json = response.data;
        if(json.isSuccess==="True"){
          alert('회원가입이 완료되었습니다!')
          props.setMode("LOGIN");
        }
        else{
          alert(json.isSuccess)
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return <>
    <h2>회원가입</h2>

    <form className="form" onSubmit={handleSubmit}>
      <p><input className="login" type="text" value={id} onChange={event => setId(event.target.value)} placeholder="아이디" /></p>
      <p><input className="login" type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="비밀번호" /></p>
      <p><input className="login" type="password" value={password2} onChange={event => setPassword2(event.target.value)} placeholder="비밀번호 확인" /></p>

      <p><input className="btn" type="submit" value="회원가입" /></p>
    </form>

    <p>로그인화면으로 돌아가기  <button onClick={() => {
      props.setMode("LOGIN");
    }}>로그인</button></p>
  </> 
}

function App() {
  const [mode, setMode] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/authcheck")
      .then((response) => {        
        const json = response.data;
        if (json.isLogin === "True") {
          setMode("WELCOME");
        }
        else {
          setMode("LOGIN");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []); 

  let content = null;  

  if(mode==="LOGIN"){
    content = <Login setMode={setMode}></Login> 
  }
  else if (mode === 'SIGNIN') {
    content = <Signin setMode={setMode}></Signin> 
  }
  else if (mode === 'WELCOME') {
    content = <>
    <h2>메인 페이지에 오신 것을 환영합니다</h2>
    <p>로그인에 성공하셨습니다.</p> 
    <a href="/logout">로그아웃</a>   
    </>
  }

  return (
    <>
      <div className="background">
        {content}
      </div>
    </>
  );
}

export default App;
