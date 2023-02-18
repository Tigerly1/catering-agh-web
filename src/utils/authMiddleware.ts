import jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';
import clientPromise from './mongodb';
import { getCookies } from 'cookies-next';

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

async function authMiddleware(req: any, res: any, next: any) {
  // Extract the JWT token from the request header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  console.log("MIDDLEWARE")
  if (!token) {
    // If there's no token, return a 401 unauthorized error
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the access token using the secret key
    const decoded: any = jwt.verify(token, JWT_SECRET ?? "");

    // Attach the user ID to the request for future use
    req.userId = decoded.id;

    // Call the next middleware
    return next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      // If the access token has expired, try to refresh the token using the refresh token
      const refreshHeader = req.headers['x-refresh-token'];
      const refresh_token = refreshHeader && refreshHeader.split(' ')[1];

      if (!refresh_token) {
        // If there's no refresh token, return a 401 unauthorized error
        return res.status(401).json({ message: 'Unauthorized' });
      }

      try {
        // Verify the refresh token using the refresh secret key
        const decoded: any = jwt.verify(refresh_token, JWT_REFRESH_SECRET ?? "");

        const client = await clientPromise;
        const db = client.db("cateringwebagh");
        // Connect to the MongoDB database


        // Find the user in the database
        const user = await db.collection('users').findOne({ _id: decoded.id });

        if (!user) {
          // If the user doesn't exist, return a 401 unauthorized error
          return res.status(401).json({ message: 'Unauthorized' });
        }

        // Generate a new access token
        const newAccessToken = jwt.sign({ id: user._id }, JWT_SECRET ?? "", { expiresIn: '5h' ?? "" });

        // Attach the user ID and the new access token to the request for future use
        req.userId = user._id;
        req.accessToken = newAccessToken;

        // Set the new access token and refresh token in the response headers
        res.set('authorization', `Bearer ${newAccessToken}`);
        res.set('x-refresh-token', `Bearer ${refresh_token}`);

        // Call the next middleware
        return next();
      } catch (err) {
        // If there's an error, return a 401 unauthorized error
        return res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      // If there's another error, return a 401 unauthorized error
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}

export default authMiddleware;