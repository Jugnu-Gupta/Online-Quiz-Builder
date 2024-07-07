import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function MainLayout() {
	return (
		<div className="min-h-[100vh] flex flex-col justify-between bg-background">
			<div>
				<Navbar />
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}

export default MainLayout;
