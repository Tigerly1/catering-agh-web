import { generateAccessToken, generateRefreshToken, getUserFromToken } from "@/utils/auth";
import { buildResponse } from "@/utils/buildResponse";
import clientPromise from "src/utils/mongodb";
const bcrypt = require('bcrypt')
import { getCookie } from 'cookies-next';


export default async (req: any, res: any) => {
    if (req.method === 'GET') {
        res.status(405).send('Not Allowed');
    }
    try {
        const authToken: any = getCookie('authorization', { req, res }); // => { 'name1': 'value1', name2: 'value2' }
        const tokenA = authToken && authToken.split(' ')[1];

        const rToken: any = getCookie('x-refresh-token', { req, res }); // => { 'name1': 'value1', name2: 'value2' }
        const tokenR = rToken && rToken.split(' ')[1];


        if (tokenA || tokenR) {
            console.log("SIGNED IN")
            let resUser: any = getUserFromToken(tokenA)
            if (resUser && resUser.user) {
                const response = {
                    user: resUser.user,
                }
                return buildResponse(res, 200, response)
            }

        }

        const client = await clientPromise;
        const db = client.db("cateringwebagh");

        const username = req.body.username;
        const password = req.body.password;
        if (!username || !password) {
            return buildResponse(res, 401, {
                message: 'Username and password are required.'
            })
        }
        const mongoUserLogin = await db.collection('users').findOne({ 'user.username': username });
        if (!mongoUserLogin || !mongoUserLogin.user.username) {
            return buildResponse(res, 401, {
                message: 'User does not exist.'
            })
        }

        if (!bcrypt.compareSync(password, mongoUserLogin.user.password)) {
            return buildResponse(res, 403, { message: 'password is incorrect' });
        }


        const accToken = generateAccessToken(mongoUserLogin.user.username)
        const refToken = generateRefreshToken(mongoUserLogin.user.username)


        res.setHeader('Set-Cookie', [`authorization=Bearer ${accToken}; Secure; HttpOnly; SameSite=None; Path=/; Max-Age=99999999;`,
        `x-refresh-token=Bearer ${refToken}; Secure; HttpOnly; SameSite=None; Path=/; Max-Age=99999999;`]);

        const response = {
            user: mongoUserLogin.user.username,
        }
        return buildResponse(res, 200, response)
    } catch (err: any) {
        return buildResponse(res, 401, {
            message: 'Error'
        })
    }
};