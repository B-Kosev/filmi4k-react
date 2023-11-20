import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { siderStyle, contentStyle } from "../styles";
import React from "react";
import { getMovies } from "../database/db";
import { debug, error } from "console";
import { Genre, genreNamesMap } from "./types";

const Movies = () => {
	const [movies, setMovies] = React.useState([]);
	const [selectedGenre, setSelectedGenre] = React.useState("all");

	const handleGenre = (genre: string) => {
		setSelectedGenre(genre);
	};

	React.useEffect(() => {
		const fetchMovies = async () => {
			const data = await getMovies();
			setMovies(data);
		};
		fetchMovies().catch(error);
	}, []);

	return (
		<Layout hasSider>
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
			<Content style={contentStyle}>content</Content>
		</Layout>
	);
};

export default Movies;
