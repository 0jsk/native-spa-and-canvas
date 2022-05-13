import "./assets/global-styles.css";
import { renderApp } from "./app";

const app = () => {
	const container = document.getElementById("app")!;

	renderApp(container);
};

document.addEventListener('DOMContentLoaded', app);
