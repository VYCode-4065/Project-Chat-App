import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new Schema({

    fullName: {
        type: String,
        required: true,

    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
    },
    profilePic: {
        type: String,
        default: null,

    },
    gender: {
        type: String,
        default: 'male',

    },
    refresh_token: {
        type: String,
        default: '',
    }
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}



const User = mongoose.model("User", userSchema);

export default User;