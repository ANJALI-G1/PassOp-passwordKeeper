import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sitename: { type: String, required: true },
    username: { type: String, required: true },
    encryptedPassword: { type: String, required: true }, // bcrypt hash
    encryptedText: { 
        iv: { type: String, required: true },
        encryptedData: { type: String, required: true }
    } // AES encrypted text
});

const Password = mongoose.model('Password', passwordSchema);
export default Password;