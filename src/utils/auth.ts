import jwt from 'jsonwebtoken';

export function generateAccessToken(username: string) {
    return jwt.sign(
        { user: username },
        process.env.JWT_SECRET ?? "",
        {
            expiresIn: '5h',
        }
    );
}

export function generateRefreshToken(username: string) {
    return jwt.sign(
        { user: username },
        process.env.JWT_REFRESH_SECRET ?? "",
        {
            expiresIn: '30d',
        }
    );
}

export async function verifyToken(token: any, res: any) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "");
        return decoded;
    } catch (err) {
        return res.status(405).send('Token is invalid');
    }
}

export function getUserFromToken(token: any) {
    return jwt.verify(token, process.env.JWT_SECRET ?? "", (error: any, response: any) => {
        if (error) {
            return {
                verified: false,
                message: 'invalide token'
            }
        }
        return {
            verified: true,
            user: response.user
        }
    })
}