import styled from "styled-components";

export const ContentCssProperties: React.CSSProperties = {
	padding: "30px",
	backgroundColor: "white",
	borderRadius: "10px",
};

export const ContentWrapper = styled.div({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	padding: "20px",
	// background: "white",
});

export const PosterWrapper = styled.div({
	display: "flex",
});

export const MovieHeaderWrapper = styled.div({
	position: "relative",
});

export const MovieTitlesWrapper = styled.div({
	position: "absolute",
	width: "100%",
	left: "0",
	bottom: "0",
	backgroundColor: " rgba(0, 0, 0, 0.2)",
	color: "white",
	fontWeight: "bold",
	fontSize: "20px",
	padding: "15px",
});

export const RatingWrapper = styled.div({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
});

export const DataWrapper = styled.div({
	marginTop: "20px",
	// display: "flex",
	width: "900px",
});

export const VideoWrapper = styled.div({
	display: "flex",
	justifyContent: "center",
});
