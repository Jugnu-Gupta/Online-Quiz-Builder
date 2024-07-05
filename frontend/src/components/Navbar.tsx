import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../contants";

function Navbar() {
	const fullName = localStorage.getItem("fullName");

	const logoutHandler = async () => {
		const token = localStorage.getItem("token");
		const res = await axios.post(`${BASE_URL}/api/v1/users/logout`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		if (res.status === 200) {
			console.log("Logged out successfully");
			localStorage.removeItem("fullName");
			localStorage.removeItem("email");
			localStorage.removeItem("token");
			localStorage.removeItem("login");
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
							{fullName}
						</button>
					</div>
				</nav>
			</div>
		</div>
	);
}

export default Navbar;
