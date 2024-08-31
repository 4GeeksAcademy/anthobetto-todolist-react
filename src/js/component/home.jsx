import React from "react";
import { FetchToDoList } from "./FetchToDoList";
import { Todolist } from "./Todolist";
const Home = () => {
	return (
		<>
		<div className="container">
			<FetchToDoList/>
		</div>
		{/*<div className="container">
			<Todolist/>
		</div>*/}
		</>
	);
};

export default Home;
