import React, {useState} from "react";
import "./SigninForm.css";
import logo from "../assets/logo-black.png";
import google from "../assets/google.png";
import Apple from "../assets/apple.png";
import { Link, useNavigate} from "react-router-dom";
import {OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

// const API_BASE="http://localhost:4000";
const API_BASE="https://twitter-backend-murex.vercel.app";
const SigninForm = () => {

    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = React.useState("");

    const navigate = useNavigate();
    // const location = useLocation();


    const onFormSubmit = async (e) => {
        // it prevents default values
        try {
            e.preventDefault();
            
            const formData = {
                email: data.email,
                password: data.password,
            };
            
            const formDataJSON = JSON.stringify(formData);
            console.log(formDataJSON);
        
            const response = await fetch(API_BASE + '/api/v1/login', {
                method: "POST",
                headers: {
                    'Content-Type' : "application/json"
                },
                body : formDataJSON,
                credentials:"include",
            });

            const convertedRespones = await response.json();
            if(convertedRespones.success=== true){
                navigate("/home");
            }

            // console.log(convertedRespones);
        } catch (error) {
            setErrorMessage("Email or Password does not match or not exist!!!");
            console.log(error);
        }
    }

    return(
        <div className="login-box">
            <img src={logo} className="logo" alt ="logo"/>
            <h2>Sign in to X</h2>
            <OverlayTrigger
                placement="bottom"
                overlay={
                <Tooltip className="custom-tooltip" id="comming-soon">
                    <div>
                    <FontAwesomeIcon icon={faCircleInfo} />
                    {"   "}
                    <span>Comming soon!</span>
                    </div>
                </Tooltip>
                }
            >
                <button className="btn"><img src = {google} alt="" />Sign in with Google</button>
            </OverlayTrigger>

            <OverlayTrigger
                placement="bottom"
                overlay={
                <Tooltip className="custom-tooltip" id="comming-soon">
                    <div>
                    <FontAwesomeIcon icon={faCircleInfo} />
                    {"   "}
                    <span>Comming soon!</span>
                    </div>
                </Tooltip>
                }
            >
                <button className="btn"><img src = {Apple} className="btn" alt="" />Sign in with Apple</button>
            </OverlayTrigger>  
            
            <hr /><span>Or</span>

            <form action="post" onSubmit={onFormSubmit}>
                <input type="text" placeholder="Email" name="email" value={data.email}
                    onChange={(item => setData({...data, email:item.target.value}))} 
                    required/>
                <input type="password" placeholder="Password" name="password"
                    value={data.password}
                    onChange={(item => setData({...data, password:item.target.value}))}
                 required/>
                <button className="btn-next" type="submit">next</button>
                {errorMessage && <div className="error"> {errorMessage} </div>}
            </form>

            <OverlayTrigger
                placement="bottom"
                overlay={
                <Tooltip className="custom-tooltip" id="comming-soon">
                    <div>
                    <FontAwesomeIcon icon={faCircleInfo} />
                    {"   "}
                    <span>Comming soon!</span>
                    </div>
                </Tooltip>
                }
            >
                <button className="btn" >Forgot Password?</button>
            </OverlayTrigger>  

            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
    );
};

export default SigninForm;