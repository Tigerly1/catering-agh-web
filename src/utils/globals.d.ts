declare module globalThis {
    var mongo: () => string[];
    var _mongoClientPromise: Promise<MongoClient>;
}