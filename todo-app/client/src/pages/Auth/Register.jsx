import React,{useState} from 'react'
import styles from './Login.module.css';
import login from '../../assests/login.png'
import {Link, useNavigate} from 'react-router-dom'
import {Input,Button,message} from 'antd';
import { getErrorMessage } from '../../util/GetError';
import AuthServices from '../../services/authServices';


function Register() {

  const[username,setUsername] = useState("");
  const[password,setPassword] = useState("");
  const[firstname,setFirstname] = useState("");
  const[lastname,setLastname] = useState("");
  const[loading,setLoading] = useState(false);
  const navigate = useNavigate();



  const handleSubmit = async () =>
  {
    setLoading(true);
    try
    {
      const data = {
        firstname,
        lastname,
        username,
        password
      }
      const response = await AuthServices.registerUser(data);   //In this place itself, axios throws an error.
      if(response.status === 400)
      {
       return message.error("User already exists")
      }
      //console.log(response);
      message.success("Registered Successfully");
      navigate('/login');
      setLoading(false);

    }
    catch(err)
    {
      console.log("clinet side error:");
      console.log(err);
      message.error(err.response.data.message);
      //message.error(getErrorMessage(err));
    }
  }
  return (
    <div>
      <div className={styles.login__card}>
             <img src={login} alt="' '"/>
             <h2>Register</h2>
             <div className={styles.input__inline__wrapper}>
                  <Input placeholder="Firstname"
                  value ={firstname}
                  onChange={(e)=>setFirstname(e.target.value)}
                  />
                  <Input placeholder="Lastname"
                  style={{ marginLeft: '10px' }}
                  value ={lastname}
                  onChange={(e)=>setLastname(e.target.value)}
                  />
               </div>


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
                Existing User? <Link to="/login">Login</Link>
              </div>
<br></br>
              <div id="p-btn">
              <Button loading={loading} style={{ marginTop: '20px' }}  type = "primary" size = "large" disabled={!username || !password} onClick={handleSubmit}>Register</Button>
              </div>
              




        </div>

      </div>
    
  )
}

export default Register