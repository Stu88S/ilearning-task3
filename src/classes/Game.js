import RuleGenerator from "./RuleGenerator.js";
import CryptoHelper from "./CryptoHelper.js";
import UserInterface from "./UserInterface.js";

class Game {
	constructor(moves) {
		this.moves = moves;
		this.ruleGenerator = new RuleGenerator(moves);
		this.cryptoHelper = new CryptoHelper();
		this.userInterface = new UserInterface(moves);
	}

	play() {
		const computerMove = this.moves[Math.floor(Math.random() * this.moves.length)];
		const key = this.cryptoHelper.generateKey();
		const hmac = this.cryptoHelper.generateHMAC(computerMove, key);

		console.log(`HMAC: ${hmac}`);
		this.userInterface.showMenu();

		while (true) {
			const userInput = this.userInterface.getMoveFromUser();

			if (userInput === "0") {
				console.log("Exiting the game.");
				return;
			}

			if (userInput === "?") {
				this.userInterface.showHelp(this.ruleGenerator);
				continue;
			}

			const userMoveIndex = parseInt(userInput) - 1;

			if (this.isValidMoveIndex(userMoveIndex)) {
				const userMove = this.moves[userMoveIndex];
				this.displayResults(userMove, computerMove, key);
				break;
			} else {
				console.error("Invalid move. Please try again.");
			}
		}
	}

	isValidMoveIndex(index) {
		return index >= 0 && index < this.moves.length;
	}

	displayResults(userMove, computerMove, key) {
		console.log(`Your move: ${userMove}`);
		console.log(`Computer move: ${computerMove}`);
		const outcome = this.ruleGenerator.getOutcome(userMove, computerMove);
		console.log(`You ${outcome}!`);
		console.log(`HMAC key: ${key}`);
	}
}

export default Game;
