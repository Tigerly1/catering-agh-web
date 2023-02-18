import { Collection, Db } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { RefreshToken } from './backendInterfaces';

class RefreshTokenService {
    private refreshTokens: Collection<RefreshToken>;

    constructor(private db: Db) {
        this.refreshTokens = db.collection('refreshTokens');
    }

    async create(userId: string, expiresInMinutes: number): Promise<string> {
        const token: RefreshToken = {
            _id: uuidv4(),
            userId,
            expiresAt: new Date(Date.now() + expiresInMinutes * 60 * 1000),
            createdAt: new Date(),
        };
        await this.refreshTokens.insertOne(token);
        return token._id;
    }

    async validate(id: string, userId: string): Promise<boolean> {
        const token = await this.refreshTokens.findOne({ _id: id, userId });
        return token !== null && token.expiresAt > new Date();
    }

    async delete(id: string): Promise<void> {
        await this.refreshTokens.deleteOne({ _id: id });
    }
}

export default RefreshTokenService