import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import React, { useState } from 'react'
import './TweetBox.css'
import ProtectedRoutes from './ProtectedRoutes';
// import db from './firebase'
// const API_BASE="http://localhost:4000";
const API_BASE="https://twitter-backend-murex.vercel.app";

function TweetBox({photo}) {
    const [tweetMessage, setTweetMessage] = useState("");
    // const [tweetImage, setTweetImage] = useState("");
    const [file, setFile] = useState(null);

    const sendTweet = async (e) => {
        e.preventDefault();

        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append('file', file);
            formData.append('tweet_text', tweetMessage);

            // fetch('/upload', {
            // method: 'POST',
            // body: formData
            // })
            const response = await fetch(API_BASE + '/api/v1/tweet', {
                method: "POST",
                body : formData,
                credentials: "include",
            });

            const convertedRespones = await response.json();
            // if(convertedRespones.success=== true){
            //     navigate("/home");
            // }

            console.log(convertedRespones);
        } catch (error) {
            // setErrorMessage("Tweet is not posted...");
            console.log(error);
        }

        setTweetMessage("");
        setFile();
    }
    console.log(ProtectedRoutes.photo);

    return (
        <div className = "tweetBox" on>
            <form>
                <div className = "tweetBox__input">
                    <Avatar
                        src = {photo}
                        // src = "https://res.cloudinary.com/ddxco6opc/image/upload/v1691867097/statuscode/sh7iwxyinjjnq2njkugv.jpg"
                    />
                    <input 
                        onChange = {(e) => setTweetMessage(e.target.value)}
                        value = {tweetMessage} 
                        placeholder = "What's happening" 
                        type = "text" 
                    />
                </div>
                {/* <input 
                    onChange = { (e) => setTweetImage(e.target.value) }
                    value = {tweetImage}
                    className = "tweetBox__imageInput"
                    placeholder = "Optional : Enter Image URL"
                    type = "text"
                /> */}
                <input type="file" placeholder="Optional : Enter Image URL" className = "tweetBox__imageInput"
                name="file" accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}/>
                <Button 
                onClick = { sendTweet }
                className = "tweetBox__tweetButton">Post</Button>
            </form>
        </div>
    )
}

export default TweetBox