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

        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        if (!username || !email || !password) {
            return buildResponse(res, 401, {
                message: 'All fields are required'
            })
        }
    
        const mongoUserEmail = await db.collection('users').findOne({ email:email});
        if (mongoUserEmail && mongoUserEmail.email) {
            return buildResponse(res, 401, {
                message: 'Email already exists in our database. Please choose a different email.'
            })
        }
        
        const encryptedPW = bcrypt.hashSync(password.trim(), 10);
        const user = {
            email: email,
            username: username.toLowerCase().trim(),
            password: encryptedPW
        }
        const saveUserResponse =await db.collection('users').insertOne({
            user
          });
        if (!saveUserResponse) {
    
            return buildResponse(res, 503, { message: 'Server Error. Please try again later.' });
        }
    
        return buildResponse(res, 200, { username: username });
    }catch(e)
    {
        console.log(e)
    }

   
}
