import chalk from "chalk";
import Table from "cli-table3";

class UserInterface {
	constructor(moves) {
		this.moves = moves;
	}

	showMenu() {
		console.log("Available moves:");
		this.moves.forEach((move, index) => console.log(`${index + 1} - ${move}`));
		console.log("0 - exit\n? - help");
	}

	getMoveFromUser() {
		return "";
	}

	showHelp(rules) {
		console.log("How to play:");
		console.log("Choose your move by entering the corresponding number.");
		console.log("For example, '1' for the first move, '2' for the second, and so on.");
		console.log("Enter '0' to exit the game, or '?' to display this help.");
		console.log("\nOutcome Rules:");
		this.showHelpTable(rules);
	}

	showHelpTable(rules) {
		const table = new Table({
			head: ["v PC\\User >", ...this.moves].map(h => chalk.cyan(h)),
			colWidths: new Array(this.moves.length + 1).fill(15),
		});

		this.moves.forEach(move => {
			const row = [move];
			this.moves.forEach(compMove => {
				const outcome = rules.getOutcome(move, compMove);
				row.push(outcome === "Win" ? chalk.green(outcome) : outcome === "Lose" ? chalk.red(outcome) : chalk.yellow(outcome));
			});
			table.push(row);
		});

		console.log("The table below shows the outcome of each move combination:");
		console.log("A 'Win' means the User move defeats the PC move.");
		console.log("A 'Draw' means both moves are the same.");
		console.log("A 'Lose' means the User move is defeated by the PC move.\n");
		console.log(table.toString());
	}
}

export default UserInterface;
