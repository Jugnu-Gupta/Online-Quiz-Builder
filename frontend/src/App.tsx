import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Test from "./pages/Test/Test";
import Tests from "./pages/Test/Tests";
import Feedbacks from "./pages/Feedback/Feedbacks";
import QuizBuilder from "./pages/QuizBuilder/QuizBuilder";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const routes = createBrowserRouter([
	{
		path: "/",
		element: (
			<div className="min-h-[100vh] flex flex-col justify-between">
				<div>
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
				element: <Home />,
			},
			{
				path: "tests",
				element: <Tests />,
			},
			{
				path: "tests/:testId",
				element: <Test />,
			},
			{
				path: "feedbacks",
				element: <Feedbacks />,
			},
			{
				path: "quizbuilder",
				element: <QuizBuilder />,
			},
		],
	},
	{
		path: "/register",
		element: <Login />,
	},
	{
		path: "/login",
		element: <Register />,
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
