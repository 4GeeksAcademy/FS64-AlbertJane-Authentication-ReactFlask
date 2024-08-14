import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Demo = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    
    useEffect(() => {
        const checkUserLogin = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await actions.checkLogin(token);  // Ensure this returns a promise
                    if (!response.ok) {
                        navigate('/signin');
                    }
                } catch (error) {
                    console.error("Error checking login:", error);
                    navigate('/signin');
                }
            } else {
                navigate('/signin');
            }
        };

        checkUserLogin();
    }, [actions, navigate]);  // Make sure to include actions and navigate as dependencies

    return (
        <div className="container">
            <ul className="list-group">
                {store.demo.map((item, index) => (
                    <li
                        key={index}
                        className="list-group-item d-flex justify-content-between"
                        style={{ background: item.background }}
                    >
                        <Link to={"/single/" + index}>
                            <span>Link to: {item.title}</span>
                        </Link>
                        {item.background === "orange" && (
                            <p style={{ color: item.initial }}>
                                Check store/flux.js scroll to the actions to see the code
                            </p>
                        )}
                        <button 
                            className="btn btn-success" 
                            onClick={() => actions.changeColor(index, "orange")}
                        >
                            Change Color
                        </button>
                    </li>
                ))}
            </ul>
            <br />
            <Link to="/">
                <button className="btn btn-primary">Back home</button>
            </Link>
        </div>
    );
};
