import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId) => {

    const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_TOKEN_SCECRET, {
        expiresIn: '2h',
    })

    return accessToken;
}