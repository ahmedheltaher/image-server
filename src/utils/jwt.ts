import jwt, { Secret } from 'jsonwebtoken';

export class JWTService {
	static generateToken(data: object, secretKey: Secret, expiresIn: number): string {
		if (!data || typeof data !== 'object') {
			throw new Error('Token data must be a non-null object.');
		}

		if (!secretKey || typeof secretKey !== 'string') {
			throw new Error('A valid secret key is required to sign the token.');
		}

		try {
			return jwt.sign(data, secretKey, { expiresIn });
		} catch (error: any) {
			throw new Error(`Error generating token: ${error.message}`);
		}
	}

	static decodeToken(token: string, secretKey: Secret): object {
		if (!token || typeof token !== 'string') {
			throw new Error('A valid token string is required for decoding.');
		}

		if (!secretKey || typeof secretKey !== 'string') {
			throw new Error('A valid secret key is required to decode the token.');
		}

		try {
			return jwt.verify(token, secretKey) as object;
		} catch (error: any) {
			throw new Error(`Error decoding token: ${error.message}`);
		}
	}
}
