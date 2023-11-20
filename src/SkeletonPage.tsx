import { Layout, Menu, MenuProps } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MovieDetails from "./movie-details/MovieDetails";
import Movies from "./movies/Movies";
import TopMovies from "./top-movies/TopMovies";
import { footerStyle, layoutStyle } from "./styles";
import Home from "./home/Home";

function SkeletonPage() {
	const [current, setCurrent] = React.useState("home");

	const handleClick = (e: any) => {
		setCurrent(e.key);
	};
	return (
		<Layout style={layoutStyle}>
			<Header>
				<Menu mode="horizontal" onClick={handleClick} selectedKeys={[current]} theme="dark">
					<Menu.Item key="home">
						<Link to="/">FILMI4K</Link>
					</Menu.Item>
					<Menu.Item key="movies">
						<Link to="/movies">Филми</Link>
					</Menu.Item>
					<Menu.Item key="top">
						<Link to="/top">ТОП 10 Филми</Link>
					</Menu.Item>
				</Menu>
			</Header>
			<Content>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/movies" element={<Movies />} />
					<Route path="/top" element={<TopMovies />} />
					<Route path="/movie/:name" element={<MovieDetails />} />
				</Routes>
			</Content>
			<Footer style={footerStyle}>footer</Footer>
		</Layout>
	);
}

export default SkeletonPage;
