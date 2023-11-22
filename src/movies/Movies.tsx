import { Card, Image, Layout, Menu } from "antd";
import Meta from "antd/es/card/Meta";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { error } from "console";
import React from "react";
import { Link } from "react-router-dom";
import { MovieInfoType, getMovies } from "../database/db";
import { siderStyle } from "../styled";
import { CardListWrapper, ContentWrapper } from "./styled";
import { Genre, genreNamesMap } from "./types";

interface MoviesListProps {
	movies: MovieInfoType[];
}

interface MovieCardProps {
	movie: MovieInfoType;
}

const GenresSideNav = () => {
	const [selectedGenre, setSelectedGenre] = React.useState("all");

	const handleGenre = (genre: string) => {
		setSelectedGenre(genre);
	};

	return (
		<Sider width={200} theme="light" style={siderStyle}>
			<Menu mode="vertical" selectedKeys={[selectedGenre]}>
				{Object.keys(Genre).map((genre) => {
					return (
						<Menu.Item key={genre} onClick={() => handleGenre(genre)}>
							{genreNamesMap.get(genre)}
						</Menu.Item>
					);
				})}
			</Menu>
		</Sider>
	);
};

const MoviesList = (props: MoviesListProps) => {
	const movies = [...props.movies];
	const [sortedMovies, setSortedMovies] = React.useState(movies);
	const [sorted, setSorted] = React.useState("none");

	const handleSort = (e: any) => {
		if (sorted === e.key) {
			setSorted("none");
			setSortedMovies(movies);
			return;
		} else {
			setSorted(e.key);
		}

		switch (e.key) {
			case "year":
				setSortedMovies(sortedMovies.sort((a, b) => (a.year > b.year ? -1 : 1)));
				break;
			case "rating":
				setSortedMovies(sortedMovies.sort((a, b) => (a.rating > b.rating ? -1 : 1)));
				break;
			case "imdb":
				setSortedMovies(sortedMovies.sort((a, b) => (a.imdb_rating > b.imdb_rating ? -1 : 1)));
				break;
			case "comments":
				setSortedMovies(sortedMovies.sort((a, b) => (a.comments?.length > b.comments?.length ? -1 : 1)));
				break;
		}
	};

	React.useEffect(() => {
		setSortedMovies(movies);
	}, [props.movies]);

	return (
		<ContentWrapper>
			<Content>
				<Menu mode="horizontal" onClick={handleSort} selectedKeys={[sorted]}>
					<Menu.Item key="year">Година</Menu.Item>
					<Menu.Item key="rating">Рейтинг</Menu.Item>
					<Menu.Item key="imdb">IMDB Рейтинг</Menu.Item>
					<Menu.Item key="comments">Коментари</Menu.Item>
				</Menu>
				<CardListWrapper>
					{sortedMovies &&
						sortedMovies.map((movie: MovieInfoType) => {
							return <MovieCard movie={movie} />;
						})}
				</CardListWrapper>
			</Content>
		</ContentWrapper>
	);
};

const MovieCard = (props: MovieCardProps) => {
	const movie = props.movie;

	return (
		<Link to={`/movie/${movie.id}`}>
			<Card
				hoverable
				bordered={false}
				style={{ width: 200, height: 410 }}
				cover={<Image preview={false} width={200} height={300} alt="example" src={movie.posterUrl} />}
			>
				<Meta title={movie.title_bg} description={`${movie.year} | ${movie.director}`} />
			</Card>
		</Link>
	);
};

const Movies = () => {
	const [movies, setMovies] = React.useState<MovieInfoType[]>([]);

	React.useEffect(() => {
		const fetchMovies = async () => {
			const data = await getMovies();
			setMovies(data);
		};
		fetchMovies().catch(error);
	}, []);

	return (
		<Layout hasSider>
			<GenresSideNav />
			<MoviesList movies={movies} />
		</Layout>
	);
};

export default Movies;
