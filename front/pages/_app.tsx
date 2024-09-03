import React from "react";
import Head from "next/head";
import wrapper from "../store/configureStore";

type Props = { Component: () => JSX.Element };

const NodeBird = ({ Component }: Props) => {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<title>NodeBird</title>
			</Head>
			<Component />
		</>
	);
};

export default wrapper.withRedux(NodeBird);
// export default NodeBird;
