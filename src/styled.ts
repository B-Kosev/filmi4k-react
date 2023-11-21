import styled from "styled-components";

export const layoutStyle: React.CSSProperties = {
	minHeight: "100vh",
};

export const siderStyle: React.CSSProperties = {
	padding: "20px",
};
export const contentStyle: React.CSSProperties = {};
export const footerStyle: React.CSSProperties = {
	background: "#F0F3FA",
};

export const FooterContentWrapper = styled.div({
	display: "flex",
	justifyContent: "space-between",
});

export const FooterSectionWrapper = styled.div({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
});
