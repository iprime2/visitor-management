import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || "test"; // Make sure to keep the secret key safe

/**
 * Function to validate JWT token
 * @param token - The JWT token to validate
 * @returns boolean - Returns true if the token is valid, false otherwise
 */
export function isValidToken(token?: string): boolean {
  try {
    if(!token){
        return false;
    }
    // Verify the token using the secret key
    const decoded = jwt.verify(token, secretKey);
    return !!decoded; // Return true if token is valid and decoded
  } catch (error) {
    console.error('Invalid token:', error);
    return false; // Return false if token is invalid or expired
  }
}
