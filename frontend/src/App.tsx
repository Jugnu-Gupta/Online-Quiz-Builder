import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Test from "./pages/Test/Test";
import Tests from "./pages/Test/Tests";
import Feedbacks from "./pages/Feedback/Feedbacks";
import QuizBuilder from "./pages/QuizBuilder/QuizBuilder";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Protected from "./components/Protected";

const routes = createBrowserRouter([
	{
		path: "/",
		element: (
			<div className="min-h-[100vh] flex flex-col justify-between bg-background">
				<div className="">
					<Navbar />
					<Outlet />
				</div>
				<Footer />
			</div>
		),

		// redirect ot login or home page
		errorElement: <div>404 Not Found</div>,
		children: [
			{
				path: "/",
				element: <Protected Component={Home} />,
			},
			{
				path: "tests",
				element: <Protected Component={Tests} />,
			},
			{
				path: "tests/:testId",
				element: <Protected Component={Test} />,
			},
			{
				path: "feedbacks",
				element: <Protected Component={Feedbacks} />,
			},
			{
				path: "quizbuilder",
				element: <Protected Component={QuizBuilder} />,
			},
		],
	},
	{
		path: "/register",
		element: <Register />,
		errorElement: <div>404 Not Found</div>,
	},
	{
		path: "/login",
		element: <Login />,
		errorElement: <div>404 Not Found</div>,
	},
]);

function App() {
	return (
		<div>
			<Toaster />
			<RouterProvider router={routes} />
		</div>
	);
}

export default App;
