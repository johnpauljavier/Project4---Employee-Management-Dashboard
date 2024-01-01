import {Link, useNavigate} from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../firebaseConfig";
import { useState } from 'react';

// Import AntDesign
import { UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';

// import sweetalert2 to this component
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import "sweetalert2/dist/sweetalert2.js";


function Login(){
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    let navigate = useNavigate();

    const handleLogin = () => {

        if (email !== '' && password !== ''){
            const auth = getAuth(firebaseApp);
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

            // Signed in 
            const user = userCredential.user;
            Swal.fire({
            title: "You successfully logged in!",
            
            icon: "success"
        });

        
            navigate("/"); 
            
        // ...
        })


                .catch((error) => { 
                    alert("error!");
                    const errorCode = error.code;
                    const errorMessage = error.message;
        });
        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Missing crredentials!",
                footer: '<a href="#">Please fill in the missing fields</a>'
            });
            
        }

    }



    return(
        <main className="container position-absolute top-50 start-50 translate-middle pb-5">
            <h1>Employee Management System</h1>
            <div className='row'>
                <div className="col-md-6 bg-dark hidden md:flex md:justificy-center md-items-center px-20 py-10 mt-10 md:rounded-l-lg rounded">
                    <img src="./images/student.svg" alt="student" className="h-60 w-50"/>
                </div>
                    <div className="col-md-5">
                        <h1 className="fw-bold">Welcome Back!</h1>
                        <small className='pb-5 ms-2'>Please login to your account.</small>
                        <div className="container pb-2">
                            <label htmlFor="email" className="form-label fw-light d-flex mt-3">Email</label>
                            <Input type="email" onChange={(e)=> setEmail(e.target.value)} value={email} id="email" size="large" placeholder="ex. name@domain.com" prefix={<UserOutlined />} required />
                        </div>  
                        <div className="container pb-2">
                            <label htmlFor="password" className="form-label fw-light d-flex">Password</label>
                            <Input type="password" onChange={(e)=> setPassword(e.target.value)} value={password} id="password" size="large" required/>
                        </div> 
                        <div className="container pb-2 pt-1">
                            <button className='btn btn-dark form-control' onClick={()=>handleLogin()}>Login</button>
                        </div> 
                        <hr />
                        <div className="container-fluid">
                            <Link to="/register">Don't have an account? Register here.</Link>
                        </div>
                    </div> 
            </div>
            
        
        </main>
    )
}

export default Login;