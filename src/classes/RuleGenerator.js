class RuleGenerator {
	constructor(moves) {
		this.moves = moves;
		this.rulesTable = this.generateRules();
	}

	generateRules() {
		const rules = new Map();
		const n = this.moves.length;
		const half = Math.floor(n / 2);

		this.moves.forEach((move, i) => {
			const outcomes = new Map();
			for (let j = 0; j < n; j++) {
				outcomes.set(this.moves[j], i === j ? "Draw" : (j - i + n) % n <= half ? "Win" : "Lose");
			}
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
