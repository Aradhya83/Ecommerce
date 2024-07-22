import React, { useState } from 'react'
import "./CSS/Login.css"

const Login = () => {
  const adminPageUrl ='http://localhost:4000/admin/*';    
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
      username: "",
      password: "",
      email: "",
      secretKey: "" 
    });
    const [emailError, setEmailError] = useState("");
    const [secretKeyError, setSecretKeyError] = useState(""); 
  
    const changeHandler = (e) => {
      setFormData({
        ...formData, [e.target.name]: e.target.value
      });
      if (e.target.name === "email") {
        setEmailError("");
      }
      if (e.target.name === "secretKey") {
        setSecretKeyError(""); 
      }
    };
  
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const login = async () => {
      if (!validateEmail(formData.email)) {
        setEmailError("Invalid email address");
        return;
      }
  
      if (state === "Admin" && formData.secretKey !== "0987654321") {
        setSecretKeyError("Wrong secret key");
        return;
      }
  
      console.log("Login executed", formData);
  
      let responseData;
      await fetch('http://localhost:4000/login', {
        method: "POST",
        headers: {
          Accept: 'application/form-data',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      }).then((res) => res.json()).then((data) => responseData = data);
  
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        if (state === "Admin") {
          window.location.replace(adminPageUrl);
        } else {
          window.location.replace('/');
        }
      } else {
        alert(responseData.error);
      }
    };
  
    const signup = async () => {
      if (!validateEmail(formData.email)) {
        setEmailError("Invalid email address");
        return;
      }
  
      console.log("Signup executed", formData);
  
      let responseData;
      await fetch('http://localhost:4000/signup', {
        method: "POST",
        headers: {
          Accept: 'application/form-data',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then((res) => res.json()).then((data) => responseData = data);
  
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace('/');
      } else {
        alert(responseData.error);
      }
    };
  
    return (
      <div className='login'>
        <div className='login-container'>
          <h1>{state}</h1>
          <div className='login-fields'>
            {state === "Signup" && 
              <input 
                name="username" 
                value={formData.username} 
                onChange={changeHandler} 
                type="text" 
                placeholder='Your Name' 
              />
            }
            <input 
              name="email" 
              value={formData.email} 
              onChange={changeHandler} 
              type="email" 
              placeholder='Your Email Address' 
            />
            {emailError && <p className="error">{emailError}</p>}
            <input 
              name="password" 
              value={formData.password} 
              onChange={changeHandler} 
              type="password" 
              placeholder='Password' 
            />
            {state === "Admin" && 
              <>
                <input 
                  name="secretKey" 
                  value={formData.secretKey} 
                  onChange={changeHandler} 
                  type="password" 
                  placeholder='Secret Key' 
                />
                {secretKeyError && <p className="error">{secretKeyError}</p>}
              </>
            }
          </div>
          <button onClick={() => { state === "Login" || state === "Admin" ? login() : signup() }}>
            Continue
          </button>
          {state === "Signup" ? 
            <p className='login-login'>
              Already have an account? 
              <span onClick={() => { setState("Login") }}>Log in.</span>
            </p> 
            : 
            <p className='login-login'>
              Click <span onClick={() => { setState("Signup") }}>here</span> to create an account.
            </p>
          }
          {state !== 'Admin' && 
            <p className='login-login'>
              Click <span onClick={() => { setState("Admin") }}>here</span> to log in as admin.
            </p>
          }
        </div>
      </div>
    );
  };
  
  export default Login;
  
