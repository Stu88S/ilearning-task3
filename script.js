import Game from "./src/classes/Game.js";

function isValidArguments(args) {
	return args.length >= 3 && args.length % 2 === 1 && new Set(args).size === args.length;
}

const args = process.argv.slice(2);

if (isValidArguments(args)) {
	const game = new Game(args);
	game.play();
} else {
	console.error("Error: Invalid arguments. You must provide an odd number (>= 3) of unique strings.");
}
