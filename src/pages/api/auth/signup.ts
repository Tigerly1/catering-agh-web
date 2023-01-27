
const bcrypt = require('bcryptjs')

export default async (req: any, res: any) => {
    if (req.method === 'GET') {
        res.status(405).send('Not Allowed');
    }


    const email = req.body.userInfo.email;
    const username = req.body.userInfo.username;
    const password = req.body.userInfo.password;
    if (!username || !email || !password) {
        return util.buildResponse(401, {
            message: 'All fields are required'
        })
    }

    const dynamoUser = await getUser(username.toLowerCase().trim());
    if (dynamoUser && dynamoUser.username) {
        return util.buildResponse(401, {
            message: 'username already exists in our database. please choose a different username'
        })
    }

    const encryptedPW = bcrypt.hashSync(password.trim(), 10);
    const user = {
        name: name,
        email: email,
        username: username.toLowerCase().trim(),
        password: encryptedPW
    }

    const saveUserResponse = await saveUser(user);
    if (!saveUserResponse) {

        return util.buildResponse(503, { message: 'Server Error. Please try again later.' });
    }

    return util.buildResponse(200, { username: username });
}

async function getUser(username) {
    const params = {
        TableName: userTable,
        Key: {
            username: username.toLowerCase().trim()
        }
    }

    return await dynamodb.get(params).promise().then(response => {
        return response.Item;
    }, error => {
        console.error('There is an error getting user: ', error)
    })
}

async function saveUser(user) {
    const params = {
        TableName: userTable,
        Item: user
    }

    return await dynamodb.put(params).promise().then(() => {
        return true;
    }, error => {
        console.error('There is an error saving user: ', error)
    })
}

module.exports.register = register;
}