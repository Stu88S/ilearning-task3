class RuleGenerator {
	constructor(moves) {
		this.moves = moves;
		this.rulesTable = this.generateRules();
	}

	generateRules() {
		const rules = new Map();
		const half = Math.floor(this.moves.length / 2);

		this.moves.forEach((move, i) => {
			const outcomes = new Map();
			this.moves.forEach((compMove, j) => {
				const result = i === j ? "Draw" : (j - i + this.moves.length) % this.moves.length <= half ? "Win" : "Lose";
				outcomes.set(compMove, result);
			});
			rules.set(move, outcomes);
		});

		return rules;
	}

	getOutcome(move1, move2) {
		const outcome = this.rulesTable.get(move1)?.get(move2);
		if (outcome === undefined) {
			throw new Error(`No outcome found for move pair: ${move1}, ${move2}`);
		}
		return outcome;
	}
}

export default RuleGenerator;
