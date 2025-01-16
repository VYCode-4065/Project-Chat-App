import jwt from 'jsonwebtoken';

export const generateRefreshToken = (userId) => {
    const refreshToken = jwt.sign({ userId: userId }, process.env.JWT_REFRESH_TOKEN_SCECRET, {
        expiresIn: '7d'
    });
    return refreshToken;
}