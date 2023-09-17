import React, { useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import App from '../App';
// const API_BASE="http://localhost:4000";
const API_BASE="https://twitter-backend-murex.vercel.app";

const useAuth = async () => {
    
    const navigate = useNavigate();


    try {
        const response = await fetch(API_BASE + '/api/v1/userdashboard', {
            method: "GET",
            credentials: "include"
        });

        // const convertedRespones = await response.json();
        // console.log(convertedRespones);
        // // console.log("Hi");
        return (<App />);
    } catch (error) {
        console.log(error);
        navigate("/");
        console.log("hi");
        return false;
    }
}

// const ProtectedRoutes = () => {
//     const navigate = useNavigate();
//     const isAuth = useAuth();

//     return isAuth ? (<App />) : (navigate("/"));
// }
const ProtectedRoutes = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(API_BASE + '/api/v1/userdashboard', {
                    method: "GET",
                    credentials: "include"
                });

                if(!response.ok) {
                navigate("/"); 
                return;
                }

                const convertedRespones = await response.json();
                setPhoto(convertedRespones.user.photo.secure_url);

                setLoading(false);

                // navigation logic 
            } catch (error) {
                console.log(error);
                navigate("/");
                return;
            }
        }

        checkAuth();

    }, [navigate]);

    if(!isLoading){
        return <App photo={photo}/>;
    }
    
}

export default ProtectedRoutes;
