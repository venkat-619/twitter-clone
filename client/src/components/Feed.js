import React, { useEffect, useState } from 'react'
import './Feed.css'
import TweetBox from './TweetBox'
import Post from './Post'
import FlipMove from 'react-flip-move'
// const API_BASE="http://localhost:4000";
const API_BASE="https://twitter-backend-murex.vercel.app";

function Feed({photo}) {
    const [posts, setPosts] = useState({
        tweets: [],
        countTweets: 0
    });

    useEffect(() => {
        fetch(API_BASE + '/api/v1/getalltweets', {
            method: "GET",
            credentials: "include",
        }).then((response) => response.json())
        .then((data) => {
        console.log(data);
        setPosts({ tweets:[...data.itemsArray], countTweets:data.countTweets });})
        .catch((error) => {
            console.log(error);
        });

        console.log(posts);
    }, [])

    

    return (
        <div className = "feed">
            <div className = "feed__header">
                <h2>Home</h2>
            </div>

            <TweetBox photo={photo}/>
            {/* <Post />
            <Post />
            <Post />
            // <Post /> */}
            {/* // <Post /> */}
            <FlipMove>
                {posts.tweets.map(post => (
                    <Post 
                    key = {post.tweet_text}
                    displayName = {post.name}
                    username = {post.username}
                    verified = {true}
                    text = {post.tweet_text}
                    image = {post.tweet_image.secure_url}
                    avatar = {post.user_photo_url}
                    />
                ))}
            </FlipMove>   
        </div>
    )
}
export default Feed;