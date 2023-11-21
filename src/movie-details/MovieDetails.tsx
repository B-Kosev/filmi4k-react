import { debug } from "console";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
	const { name } = useParams();

	return <div>Movie details</div>;
};

export default MovieDetails;
