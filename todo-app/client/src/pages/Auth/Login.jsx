import React,{useState} from 'react'
import styles from './Login.module.css';
import login from '../../assests/login.png'
import {Link, useNavigate} from 'react-router-dom'
import {Input,Button,message} from 'antd';
import AuthServices from '../../services/authServices';
import { getErrorMessage } from '../../util/GetError';

function Login() {

  const[username,setUsername] = useState("");
  const[password,setPassword] = useState("");
  const[loading,setLoading] = useState(false);
  const navigate = useNavigate(); //constructor


  const handleSubmit = async () =>
  {
    console.log("Logged successfully");

    try
    {
      setLoading(true);
      let data=
      {
        username,
        password
      }

      const response = await AuthServices.loginUser(data);
     
      console.log(response.data);
      localStorage.setItem('toDoAppUser',JSON.stringify(response.data));   //convertimg JSON or string into localstorage  //contains token also
      navigate('/to-do-list'); //path name
      setLoading(false)

    }catch(err)
    {
      console.log(err);
     // message.error(err.message);
        message.error(getErrorMessage(err));

      setLoading(false)
    }
  }
  return (
    <div>
      <div className={styles.login__card}>
        
             <img src={login} alt="' '"/>
             <h2>Login</h2>
             
               <div className={styles.input__wrapper}>
                  <Input placeholder="Username"
                  value ={username}
                  onChange={(e)=>setUsername(e.target.value)}
                  />
               </div>

               <div className={styles.input__wrapper}>
                  <Input.Password
                  placeholder="Password"
                  value ={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  />
              </div>

              <div className='styles.input__info'>
                New User? <Link to="/register">Register</Link>
              </div><br></br>

              <div>
              <Button loading={loading}  loadingstyle={{ marginTop: '20px' }} type = "primary" size = "large" disabled={!username || !password} onClick={handleSubmit}>Login</Button>
              </div>
              




        </div>

      </div>
    
  )
}

export default Login