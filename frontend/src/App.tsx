import { Provider } from "react-redux";
import { store } from "./context/store";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Test from "./pages/Test/Test";
import Feedbacks from "./pages/Feedback/Feedbacks";
import QuizBuilder from "./pages/QuizBuilder/QuizBuilder";
import { Toaster } from "react-hot-toast";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <Outlet />,
		// redirect ot login or home page
		errorElement: <div>404 Not Found</div>,
		children: [
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "register",
				element: <Register />,
			},
			{
				path: "test",
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
]);

function App() {
	return (
		<Provider store={store}>
			<Toaster />
			<RouterProvider router={routes} />
		</Provider>
	);
}

export default App;
