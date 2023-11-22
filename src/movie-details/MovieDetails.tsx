import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, Descriptions, DescriptionsProps, Image } from "antd";
import { Content } from "antd/es/layout/layout";
import { error } from "console";
import React from "react";
import { useParams } from "react-router-dom";
import { MovieInfoType, getMovie, updateMovie } from "../database/db";
import {
	ContentCssProperties,
	ContentWrapper,
	DataWrapper,
	MovieHeaderWrapper,
	MovieTitlesWrapper,
	PosterWrapper,
	RatingWrapper,
	VideoWrapper,
} from "./styled";

interface MovieDetailsProps {
	movie: MovieInfoType;
}

const MoviePoster = (props: MovieDetailsProps) => {
	const movie = props.movie;
	return (
		<PosterWrapper>
			<Image preview={false} width={200} height={300} alt={movie.title_en} src={movie.posterUrl} />
			<MovieHeaderWrapper>
				<Image preview={false} width={700} height={300} alt={movie.title_en} src={movie.screenshotUrl} />
				<MovieTitlesWrapper>
					<span>{movie.title_bg}</span>
					<br />
					<span>{movie.title_en}</span>
					<br />
					<span style={{ fontSize: "15px" }}>{movie.year}</span>
				</MovieTitlesWrapper>
			</MovieHeaderWrapper>
		</PosterWrapper>
	);
};

const MovieRating = (props: MovieDetailsProps) => {
	const movie = props.movie;
	const handleLike = (e: any) => {
		movie.likes++;
		movie.rating = parseFloat(((10 * movie.likes) / (movie.dislikes + movie.likes)).toFixed(1));
		updateMovie(movie.id, movie);
	};

	const handleDislike = (e: any) => {
		movie.dislikes++;
		movie.rating = parseFloat(((10 * movie.likes) / (movie.dislikes + movie.likes)).toFixed(1));
		updateMovie(movie.id, movie);
	};

	return (
		<RatingWrapper>
			<Button type="primary" shape="circle" onClick={handleLike}>
				<FontAwesomeIcon icon={faThumbsUp} />
			</Button>
			<Badge count={movie.rating} showZero style={{ backgroundColor: "#52c41a", margin: "0 10px" }} />
			<Button type="primary" shape="circle" danger onClick={handleDislike}>
				<FontAwesomeIcon icon={faThumbsDown} />
			</Button>
		</RatingWrapper>
	);
};

const MovieData = (props: MovieDetailsProps) => {
	const movie = props.movie;

	const items: DescriptionsProps["items"] = [
		{
			key: "imdb",
			label: "IMDB",
			children: movie.imdb_rating,
		},
		{
			key: "genres",
			label: "Жанр",
			children: movie.genres.join(", "),
		},
		{
			key: "countries",
			label: "Държава",
			children: movie.countries.join(", "),
		},
		{
			key: "year",
			label: "Година",
			children: movie.year,
		},
		{
			key: "length",
			label: "Продължителност",
			children: movie.length,
		},
		{
			key: "director",
			label: "Режисьор",
			children: movie.director,
		},
		{
			key: "description",
			label: "Описание",
			span: 2,
			children: movie.description,
		},
	];

	return (
		<DataWrapper>
			<MovieRating movie={movie} />
			<Descriptions title={movie.title_bg} items={items} column={2}></Descriptions>
			<VideoWrapper>
				<iframe
					width="560"
					height="315"
					src={movie.trailerUrl}
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
				></iframe>
			</VideoWrapper>
		</DataWrapper>
	);
};

const MovieDetails = () => {
	const { name } = useParams();
	const [movie, setMovie] = React.useState<MovieInfoType>();

	React.useEffect(() => {
		const fetchMovie = async () => {
			const data = await getMovie(name as string);
			setMovie(data);
		};
		fetchMovie().catch(error);
	}, []);

	if (movie === undefined) return <div>Loading</div>;

	return (
		<ContentWrapper>
			<Content style={ContentCssProperties}>
				<MoviePoster movie={movie}></MoviePoster>
				<MovieData movie={movie}></MovieData>
			</Content>
		</ContentWrapper>
	);
};

export default MovieDetails;
