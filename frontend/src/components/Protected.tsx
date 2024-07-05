import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedProps {
	Component: React.FC;
}

const Protected: React.FC<ProtectedProps> = ({ Component }: ProtectedProps) => {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		const login = localStorage.getItem("login");
		if (login !== "true" || !token) {
			navigate("/login");
		}
	});

	return (
		<div>
			<Component />
		</div>
	);
};

export default Protected;
