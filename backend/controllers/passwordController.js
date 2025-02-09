import Password from "../models/Password.js";
import { encryptPassword, encryptText, decryptText } from "../utils/encrypt.js";

// Create a new password
export const createPassword = async (req, res) => {
    const { sitename, username, password } = req.body;
    try {
        if (!sitename || !username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const encryptedPassword = await encryptPassword(password);
        const encryptedText = encryptText(password); // Encrypt the plaintext password
        const newPassword = new Password({
            sitename,
            username,
            encryptedPassword,
            encryptedText,
            user: req.user.id,
        });

        await newPassword.save();
        res.json(newPassword);
    } catch (err) {
        console.error('Error creating password:', err.message);
        res.status(500).send('Server Error');
    }
};

// Get all passwords for a user and decrypt them
export const getPassword = async (req, res) => {
    try {
        const passwords = await Password.find({ user: req.user.id });
        const decryptedPasswords = passwords.map(password => {
            const decryptedPassword = decryptText(password.encryptedText); // Decrypt the plaintext password
            return {
                ...password._doc,
                password: decryptedPassword
            };
        });
        res.json(decryptedPasswords);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update an existing password
export const updatePassword = async (req, res) => {
    const { sitename, username, password } = req.body;
    try {
        const encryptedPassword = await encryptPassword(password);
        const encryptedText = encryptText(password); // Encrypt the plaintext password
        let passwordObj = await Password.findById(req.params.id);
        if (!passwordObj) {
            return res.status(404).json({ msg: 'Password not found' });
        }
        if (passwordObj.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        passwordObj.sitename = sitename;
        passwordObj.username = username;
        passwordObj.encryptedPassword = encryptedPassword;
        passwordObj.encryptedText = encryptedText;

        await passwordObj.save();
        res.json(passwordObj);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a password
export const deletePassword = async (req, res) => {
    try {
        let passwordObj = await Password.findById(req.params.id);
        if (!passwordObj) {
            return res.status(404).json({ msg: 'Password not found' });
        }
        if (passwordObj.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await Password.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Password deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};