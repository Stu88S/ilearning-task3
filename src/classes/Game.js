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
		this.userInterface.showHelp(this.ruleGenerator);

		let userMoveIndex;
		let userMove;

		while (true) {
			const userInput = this.userInterface.getMoveFromUser();

			if (userInput === "exit") return;

			if (userInput === "help") {
				this.userInterface.showHelp(this.ruleGenerator);
				continue;
			}

			userMoveIndex = parseInt(userInput) - 1;

			if (userMoveIndex >= 0 && userMoveIndex < this.moves.length) {
				userMove = this.moves[userMoveIndex];
				break;
			} else {
				console.error("Invalid move. Please try again.");
			}
		}

		console.log(`Your move: ${userMove}`);
		console.log(`Computer move: ${computerMove}`);

		const outcome = this.ruleGenerator.getOutcome(userMove, computerMove);
		console.log(`You ${outcome}!`);
		console.log(`HMAC key: ${key}`);
	}
}

export default Game;
