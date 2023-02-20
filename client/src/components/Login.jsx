import React, { useState } from 'react'
import { NavLink ,useNavigate} from "react-router-dom"
import VisibilityIcon from '@mui/icons-material/Visibility';
import "./mix.css"
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button } from '@mui/material';


const Login = () => {

    const [passShow, setPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate(); 

    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };


    const loginuser = async(e) => {
        e.preventDefault();

        const { email, password } = inpval;

        if (email === "") {
            alert("email is required!")
        } else if (!email.includes("@")) {
            alert("includes @ in your email!")
        } else if (password === "") {
            alert("password is required!")
        } else if (password.length < 6) {
            alert("password must be 6 char!")
        } else {
            // console.log("user login succesfully done");


            const data = await fetch("/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                     email, password
                })
            });

            const res = await data.json();
            //  console.log(res);

            if(res.status === 201){
                localStorage.setItem("usersdatatoken",res.result.token);
                navigate("/dash")
                setInpval({...inpval,email:"",password:""});
            }
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div >
                       <h1>Log in</h1>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? <VisibilityOffIcon/> :<VisibilityIcon/> }
                                </div>
                            </div>
                        </div>

                        <Box ><Button  variant='contained' style={{width: '100%'}} onClick={loginuser}>Login</Button> </Box>
                        <p>Don't have an Account? <NavLink to="/register" style={{ textDecoration : 'none' }}> Register</NavLink> </p>
                    </form>
                   
                </div> 
            </section>
        </>
    )
}

export default Login