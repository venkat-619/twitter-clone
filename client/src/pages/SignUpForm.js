import React, {useState} from "react";
import "./SignUpForm.css";
import logo from "../assets/logo-black.png";
import google from "../assets/google.png";
import Apple from "../assets/apple.png";
import {OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate} from "react-router-dom";

const API_BASE="http://localhost:4000";

const SignUpForm = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        username: "",
        country: "",
        phoneNumber: "",
        password: "",
    });

    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = React.useState("");

    const onFormSubmit = async (e) => {
        // it prevents default values
        try {
            e.preventDefault();
            
            const formData = {
                name: data.name,
                email: data.email,
                country: data.country,
                username: data.username,
                phoneNumber: data.phoneNumber,
                password: data.password,
                // files: file
            };

            // console.log(file);
            
            const formDataJSON = JSON.stringify(formData);
            // console.log(formDataJSON);
            // formData.append("photo", file);
            
            
            // console.log(formData);
            const response = await fetch(API_BASE + '/api/v1/signup', {
                method: "POST",
                headers: {
                    'Content-Type' : "application/json"
                },
                body : formDataJSON,
                credentials: "include",
            });

            const convertedRespones = await response.json();
            if(convertedRespones.success=== true){
                navigate("/home");
            }

            console.log(convertedRespones);
        } catch (error) {
            setErrorMessage("Something Went wrong... Please fill values Correctly with valid phone number and email. Try with diffenen user id");
            console.log(error);
        }
    }


    return(
        <div className="signup-box">
            <img src={logo} className="logo" alt ="logo"/>
            <h2>Sign Up to X</h2> 

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
                <button className="btn"><img src = {google} alt="" />Sign Up with Google</button>
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
                <button className="btn"><img src = {Apple} className="btn" alt="" />Sign Up with Apple</button>
            </OverlayTrigger>  
            
            <hr /><span>Or</span>

            <form action="post" onSubmit={onFormSubmit} encType="application/json">
                <input type="text" placeholder="Name" name="name" value={data.name} 
                    onChange={(item => setData({...data, name:item.target.value}))} 
                    required
                />
                <input type="text" placeholder="Email" name="email" value={data.email}
                    onChange={(item => setData({...data, email:item.target.value}))} 
                    required
                />
                <input type="text" placeholder="Username" name="username" value={data.username}
                    onChange={(item => setData({...data, username:item.target.value}))}
                    required
                />
                <input type="text" placeholder="Country" name="country" value={data.country}
                    onChange={(item => setData({...data, country:item.target.value}))}
                    required
                />
                <input type="text" placeholder="Phone Number" name="PhoneNumber" value={data.phoneNumber}
                    onChange={(item => setData({...data, phoneNumber:item.target.value}))}
                    required
                />
                <input type="password" placeholder="Password min 8 chars" name="password" value={data.password}
                    onChange={(item => setData({...data, password:item.target.value}))}
                    required
                />
                {/* <p className="photoName">Photo</p>
                <input type="file" placeholder="Photo" name="Photo" accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])} 
                /> */}
                <button className="btn-next" type="submit">Sign Up</button>
                {errorMessage && <div className="error"> {errorMessage} </div>}
            </form>

            <p>Already have an account? <Link to="/signin">Sign in</Link></p>
        </div>
    );
};

export default SignUpForm;