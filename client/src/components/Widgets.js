import React from 'react'
import './Widgets.css'
import {
    TwitterTimelineEmbed,
    TwitterShareButton,
    TwitterTweetEmbed
} from 'react-twitter-embed'
import SearchIcon from '@mui/icons-material/Search';

function Widgets() {
    return (
        <div className = "widgets">
            <div className = "widgets__input">
                <SearchIcon 
                    className = "widgets__SearchIcon" 
                />
                <input placeholder = "Search Twitter" type = "text" />
            </div>
            <div className = "widgets__widgetContainer">
                <h2>
                    Whats'happening
                </h2>
                <TwitterTweetEmbed tweetId = {"1702529114455109652"} />

                <TwitterTimelineEmbed 
                    sourceType = "profile"
                    screenName = "Venkat87436105"
                    options = {{ height: 400 }}
                />

                <TwitterShareButton 
                    url = {"https://twitter.com/Venkat87436105"}
                    options = { { text : "Please Follow me On twitter so i get popular..." , via :  "@Venkat87436105" }}
               />
            </div>
        </div>
    )
}

export default Widgets