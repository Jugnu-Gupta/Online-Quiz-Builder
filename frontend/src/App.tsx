import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Test from "./pages/Test/Test";
import Tests from "./pages/Test/Tests";
import Feedbacks from "./pages/Feedback/Feedbacks";
import QuizBuilder from "./pages/QuizBuilder/QuizBuilder";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import Protected from "./components/Protected";
import MainLayout from "./components/MainLayout";

function App() {
	return (
		<div>
			<Toaster />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route
							path="/"
							element={<Protected Component={Home} />}
						/>
						<Route
							path="tests"
							element={<Protected Component={Tests} />}
						/>
						<Route
							path="tests/:testId"
							element={<Protected Component={Test} />}
						/>
						<Route
							path="feedbacks"
							element={<Protected Component={Feedbacks} />}
						/>
						<Route
							path="quizbuilder"
							element={<Protected Component={QuizBuilder} />}
						/>
					</Route>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<div>404 Not Found</div>} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
