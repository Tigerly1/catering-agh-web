export interface RefreshToken {
    _id: string;
    userId: string;
    expiresAt: Date;
    createdAt: Date;
}