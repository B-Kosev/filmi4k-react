import { CopyrightOutlined, FacebookFilled, FacebookOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import MovieDetails from "./movie-details/MovieDetails";
import Movies from "./movies/Movies";
import { FooterContentWrapper, FooterSectionWrapper, footerStyle, layoutStyle } from "./styled";
import TopMovies from "./top-movies/TopMovies";

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
			<Footer style={footerStyle}>
				<FooterContentWrapper>
					<FooterSectionWrapper>
						<Link to="/">FILMI4K</Link>
					</FooterSectionWrapper>
					<FooterSectionWrapper>
						<CopyrightOutlined />
						Всички права запазени. 2023
					</FooterSectionWrapper>
					<FooterSectionWrapper>
						<p>За разработчика:</p>
						<Link target="_blank" to="https://www.facebook.com/Bogi4a/">
							<FacebookFilled />
							Bogdan Kosev
						</Link>
					</FooterSectionWrapper>
				</FooterContentWrapper>
			</Footer>
		</Layout>
	);
}

export default SkeletonPage;
