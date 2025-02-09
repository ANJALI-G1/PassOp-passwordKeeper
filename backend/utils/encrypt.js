import bcrypt from 'bcrypt';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // Ensure this is a 32-byte key (64 hexadecimal characters)

export const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const verifyPassword = async (password, hash) => {
    if (!hash || !password) {
        throw new Error('data and hash arguments required');
    }
    return await bcrypt.compare(password, hash);
}

export const encryptText = (text) => {
    if (!text || typeof text !== 'string') {
        throw new Error('Text must be a non-empty string');
    }
    const iv = crypto.randomBytes(16); // Generate a new IV for each encryption
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { iv: iv.toString('hex'), encryptedData: encrypted };
}

export const decryptText = (text) => {
    if (!text || !text.iv || !text.encryptedData) {
        throw new Error('Invalid text object for decryption');
    }
    const iv = Buffer.from(text.iv, 'hex');
    const encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString('utf8');
}