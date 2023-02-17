import { buildResponse } from "@/utils/buildResponse";
import clientPromise from "src/utils/mongodb";
const bcrypt = require('bcrypt')

export default async (req: any, res: any) => {
    if (req.method === 'GET') {
        res.status(405).send('Not Allowed');
    } 
    try {
        const client = await clientPromise;
        const db = client.db("cateringwebagh");

        const username = req.body.username;
        const password = req.body.password;
        if (!username  || !password) {
            return buildResponse(res, 401, {
                message: 'Username and password are required.'
            })
        }
        const mongoUserLogin = await db.collection('users').findOne({ username:username});
        if (!mongoUserLogin || !mongoUserLogin.username) {
            return buildResponse(res, 401, {
                message: 'User does not exist.'
            })
        }

        if (!bcrypt.compareSync(password, mongoUserLogin.password)) {
            return buildResponse(res, 403, { message: 'password is incorrect' });
        }


        //const token = auth.generateToken(userInfo)

        // const response = {
        //     user: userInfo,
        //     token: token
        // }
        return buildResponse(res, 200, {message: "login succesfull"})
}
