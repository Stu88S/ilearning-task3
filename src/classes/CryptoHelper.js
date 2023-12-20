import crypto from "crypto";

class CryptoHelper {
	/**
	 * Generates a cryptographically strong pseudo-random key.
	 * @returns {string} The generated key as a hexadecimal string.
	 */
	generateKey() {
		return crypto.randomBytes(32).toString("hex");
	}

	/**
	 * Generates an HMAC (Hash-based Message Authentication Code).
	 * @param {string} move The move to be hashed.
	 * @param {string} key The key for HMAC generation.
	 * @returns {string} The generated HMAC as a hexadecimal string.
	 */
	generateHMAC(move, key) {
		return crypto.createHmac("sha256", key).update(move).digest("hex");
	}
}

export default CryptoHelper;
