import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import {Context} from '../store/appContext.js'
import { useNavigate } from "react-router-dom";
export const Navbar = () => {

	const {store,actions} = useContext(Context)
	const navigate = useNavigate();

	const handleLogOut = () => {
		localStorage.removeItem('token');
		actions.logout()
		navigate('/signin')
		
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{
					!localStorage.getItem('token') ? 
					
					<>
						<Link to="/signin">
							<button className="btn btn-primary mx-5">Sign In</button>
						</Link>
						<Link to="/signup">
							<button className="btn btn-primary mx-5">Sign Up</button>
						</Link></> 
					: 
						
						<button onClick={handleLogOut} className="btn btn-primary">Log Out</button>
					}
					
				</div>
			</div>
		</nav>
	);
};
