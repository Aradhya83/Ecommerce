import React, { useState } from 'react'
import "./CSS/Login.css"

const Login = () => {
  const adminPageUrl ='http://localhost:4000/admin';

  const [state,setState] = useState("Login");
  const [formData, setFormData] = useState({
    username : "",
    password:"", 
    email:""
  })

 const changeHandler = (e) => {
setFormData({
  ...formData, [e.target.name]:e.target.value
})
 }

  const login = async () => {
console.log("Login executed", formData);
if(state==="Admin"){
  const secrekey = prompt("Enter the secret key");
  if(secrekey !== "0987654321"){
    alert("wrong key");
    return;
  }
}

let responseData;
await fetch('http://localhost:4000/login',{
  method:"POST",
  headers:{
    Accept:'application/form-data',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
}).then((res)=>res.json()).then((data)=>responseData=data)
if(responseData.success){
  localStorage.setItem('auth-token', responseData.token);
  if(state === "Admin"){
    window.location.replace(adminPageUrl);
  }
  else{
  window.location.replace('/');
  }
}
else{
  alert(responseData.error)
 }
}

  const signup = async () => {
    console.log("Signup executed", formData)
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method : "POST",
      headers:{
        Accept: 'application/form-data',
        'Content-Type':'application/json',
      },
      body : JSON.stringify(formData),
    }).then((res)=>res.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    }
    else{
      alert(responseData.error)
    }
  }

  return (
    <div className='login'>
      <div className='login-container'>
        <h1>{state}</h1>
        <div className='login-fields'>
          {state==="Signup"?<input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name'/>:<></>}
          <input name="email" value ={formData.email} onChange={changeHandler} type="email" placeholder='Your Email Address'/>
          <input name="password" value ={formData.password} onChange={changeHandler} type="password" placeholder='Password'/>
        </div>
        <button onClick={() => {state === "Login" || state==="Admin" ?login():signup()}}>Continue</button>
        {state === "Signup"?<p className='login-login'>Already have an account? <span onClick = {()=>{setState("Login")}}>Log in.</span></p>:
        <p className='login-login'>Click <span onClick = {()=>{setState("Signup")}}>here</span> to create an account.</p>}
        <p className='login-login'>Click<span onClick = {()=>{setState("Admin")}}> here</span> to log in as admin. </p>
      </div>
    </div>
  )
}

export default Login