import {Link, useNavigate} from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import firebaseApp from "../firebaseConfig";
import { useState } from 'react';


// Import AntDesign
import React from 'react';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space, Tooltip  } from 'antd';

function Register(){

    const [username, setUsername] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = React.useState(false);

    let navigate = useNavigate();

    const handleRegistration = () => {

        if (username !== '' && email !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword){
            const auth = getAuth(firebaseApp);
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed up 
              const user = userCredential.user;

              updateProfile(auth.currentUser, {
                    displayName : username
                });
                navigate("/");

              alert('Registration successful!'); 
              
              setEmail('');
            })
            .catch((error) => {
                alert(error);
                setEmail('');
              // ..
            });
            
        }else{
            alert('Incorrect or missing credentials!');
        }
    
    }

    return(
        <div className="container border p-5 rounded mt-5">
            <h1 className="fw-bold">Registration</h1>
            <p>Create your account here.</p>
            <label htmlFor="username" className='mt-3'>Username</label>
            <Input
                id="username" type="text"
                onChange={(e)=> setUsername(e.target.value)}
                value={username}
                placeholder="Enter your username"
                prefix={<UserOutlined className="site-form-item-icon" />}
                size='large'
                suffix={
                    <Tooltip title="Extra information">
                    <InfoCircleOutlined
                        style={{
                        color: 'rgba(0,0,0,.45)',
                        }}
                    />
                    </Tooltip>
                }
             />
            <label htmlFor="email" className='mt-3'>Email</label>
            <input id="email" type="email" className="form-control" onChange={(e)=> setEmail(e.target.value)} value={email}/>
            
             <div className="row">
                <div className='col-md-5'>
                <label htmlFor="password" className="mt-3">Password</label>
                <br />
                <Space direction="vertical">
                    <Input.Password
                        id="password" type="password"
                        onChange={(e)=> setPassword(e.target.value)} 
                        value={password}
                        size='large'
                        className="site-form-item-icon"
                        placeholder="Input password"
                        style={{width:345}}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                 </Space>
                </div>
                <div className='col-md-4'>
                <label htmlFor="confirmPassword" className="mt-3">Confirm Password</label>
                <Space direction="vertical">
                    <Input.Password
                        id="confirmPassword" type="password"
                        onChange={(e)=> setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        size='large'
                        placeholder="Confirm Password"
                        style={{width:345}}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Space>
                </div>
             </div>

            <br />
            
           


            <button className="btn btn-dark mt-3 form-control" onClick={()=>handleRegistration()}>Register</button>
            <hr />
            
            <Link to="/login">Already have an account? Login here.</Link>
        </div>
        
    )
}

export default Register;