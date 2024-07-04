import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
	let email = "";
	let fullName = "";

	useEffect(() => {
		email = localStorage.getItem("email");
		fullName = localStorage.getItem("fullName");
	}, []);

	const logoutHandler = async () => {
		const res = await axios.post(
			"http://localhost:4000/api/v1/users/logout"
		);
		if (res.status === 200) {
			console.log("Logged out successfully");
			localStorage.removeItem("fullName");
			localStorage.removeItem("email");
		} else {
			toast.error("Error logging out");
		}
	};

	return (
		<div className="w-full bg-gray-800">
			<div className="max-w-6xl w-11/12 mx-auto">
				<nav className="flex items-center justify-between flex-wrap p-6">
					<div className="flex items-center text-white mr-6">
						<span className="font-semibold  text-xl tracking-tight">
							Quiz App
						</span>
					</div>
					<div>
						<Link to="/">
							<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
								Home
							</button>
						</Link>
						<Link to="/login" onClick={logoutHandler}>
							<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
								Logout
							</button>
						</Link>
						<button className="truncate max-w-20 text-white pl-4">
							{fullName}jbkjbjkjbaskjcbkj
						</button>
					</div>
				</nav>
			</div>
		</div>
	);
}

export default Navbar;
