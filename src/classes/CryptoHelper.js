import crypto from "crypto";

class CryptoHelper {
	generateKey() {
		return crypto.randomBytes(32).toString("hex");
	}

	generateHMAC(move, key) {
		return crypto.createHmac("sha256", key).update(move).digest("hex");
	}
}

export default CryptoHelper;
