import Game from "./src/classes/Game.js";

const args = process.argv.slice(2);
if (args.length < 3 || args.length % 2 === 0 || new Set(args).size !== args.length) {
	console.error("Error: Invalid arguments. You must provide an odd number (>= 3) of unique strings.");
} else {
	const game = new Game(args);
	game.play();
}
