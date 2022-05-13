export const drawStar = (ctx, centerX, centerY, color = "black", size = 20, n = 5) => {
	const star = new Path2D();

	for (let i = 0; i < n * 2; i += 1) {
		const rotation = Math.PI * 0.5;
		const angle = (i / (n * 2)) * Math.PI * 2 + rotation;

		const dist = size * (i % 2) + size;
		const x = centerX + Math.cos(angle) * dist;
		const y = centerY + Math.sin(angle) * dist;

		star.lineTo(x, y);
	}

	star.closePath();

	ctx.fillStyle = color;
	ctx.fill(star);

	return (offsetX, offsetY) => ctx.isPointInPath(star, offsetX, offsetY);
}
