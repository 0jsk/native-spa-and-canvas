import { drawStar } from "./strokeStar.js";

const primaryCanvas = document.getElementById("canvas-primary");
const secondaryCanvas = document.getElementById("canvas-secondary");

primaryCanvas.width = 600;
primaryCanvas.height = 600;

secondaryCanvas.width = 600;
secondaryCanvas.height = 50;

const primaryCtx = primaryCanvas.getContext("2d");
const secondaryCtx = secondaryCanvas.getContext("2d");

const starsColors = ["red", "blue", "green", "yellow", "black"];

const starSize = 30;
const starWidth = starSize * 2;

const starsInPathFunctions = starsColors.map(
	(color, i) => drawStar(
		primaryCtx,
		i * (starWidth * 2) + starWidth,
		starWidth,
		starsColors[i],
		starSize,
		5
	)
);

const setBackgroundColor = (canvas, ctx, color) => {
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

primaryCanvas.addEventListener("click", (event) => {
	const clickedStarIndex = starsInPathFunctions.findIndex(
		isInStar => isInStar(event.offsetX, event.offsetY)
	);

	const setBackgroundOfSecondaryCanvas = (color) => setBackgroundColor(secondaryCanvas, secondaryCtx, color);

	if (~clickedStarIndex) {
		const starColor = starsColors[clickedStarIndex];

		setBackgroundOfSecondaryCanvas(starColor);
	} else {
		setBackgroundOfSecondaryCanvas("white");
	}
});
