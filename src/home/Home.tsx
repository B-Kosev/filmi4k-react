import { Button } from "antd";
import { addMovies } from "../database/db";

const Home = () => {
	return (
		<div>
			Home
			<Button onClick={addMovies}>add movies</Button>
		</div>
	);
};

export default Home;
