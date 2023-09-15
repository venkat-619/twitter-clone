import React from "react";
import "./LandingPage.css";
import logo from "../assets/logo-black.png";
import { Link, useNavigate} from "react-router-dom";
import {OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="home">
            <div className="home_top">
                <div className="home_top-left">
                    <img className= "home_top-left--img" width="100" height="100" src= {logo} alt="twiter_home"/>
                </div>
                <div className="home_top-right">
                    <h1 className="home_top-right--title">Happening Now</h1>
                    <h2 className="home_top-right--subtitle">Join today.</h2>
                    <div className="home_top-right--btns">
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
                        <button className="btn-primary">Sign up with Google</button>
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
                        <button className="btn-primary">Sign up with Apple</button>
                    </OverlayTrigger>  
                    <hr /><span>Or</span>
                        {/* <p>or</p> */}
                        <button 
                            className="btn-secondary" 
                            onClick={() => navigate("/signup")}
                        >Create Account</button>
                        <p className="home_top-right--policies">
                            By signing up, you agree to the <a href="/">Terms of Service</a> and {" "} 
                            <Link to="/">Privacy Policy</Link> , including{" "} 
                            <Link to="/">Cookie Use</Link>.
                        </p>
                    </div>
                    <div className="home_top-right--btns">
                        <h3>Already have an account?</h3>
                        <button 
                            className="btn-secondary btn-secondary-bottom" 
                            onClick={() => navigate("/signin")}
                        >Sign in</button>
                    </div>
                </div>
            </div>
            
            <footer className="footer">
                <ul className="footer-list">
                    <li className="footer-list-item">
                        <Link to="/">About</Link>
                    </li>
                    <li className="footer-list-item">
                        <Link to="/">Help center</Link>
                    </li>
                    <li className="footer-list-item">
                        <Link to="/">Terms of Service</Link>
                    </li>
                    <li className="footer-list-item">
                        <Link to="/">Privacy policy</Link>
                    </li>
                    <li className="footer-list-item">
                        <Link to="/">Cookie Policy</Link>
                    </li>
                    <li className="footer-list-item">
                        <Link to="/">Accessibility</Link>
                    </li>
                    <li className="footer-list-item">
                        <Link to="/">Adds info</Link>
                    </li>
                    <li className="footer-list-item">
                        <Link to="/">Blog</Link>
                    </li>
                    <li className="footer-list-item">
                        <Link to="/">Status</Link>
                    </li>
                    <li className="footer-list-item">
                        <Link to="/">Careers</Link>
                    </li>
                    <li className="footer-list-item">
                        <Link to="/">Brand resources</Link>
                    </li>
                    <li className="footer-list-item">
                        <Link to="/">Adverstising</Link>
                    </li>
                    <li className="footer-list-item">
                        <Link to="/">Marketing</Link>
                    </li>
                    <li className="footer-list-item">
                        <Link to="/">X for Business</Link>
                    </li>
                    <li className="footer-list-item">
                        <Link to="/">Developers</Link>
                    </li>
                    <li className="footer-list-item">
                        <Link to="/">Directory</Link>
                    </li>
                </ul>
                <p className="footer--copyright">
                    {" "} 
                    <Link to="/">Settings</Link>
                    <span>&copy; Twitter clone V A VENKAT</span>
                </p>
            </footer>
        </div>
    );
};

export default LandingPage;