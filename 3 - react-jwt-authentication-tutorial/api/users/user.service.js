
const config = require('config.json');
const jwt = require('jsonwebtoken');

/* This is our user hardcoded data for simplicity.
   But for production applications, we will need 
   to store our users data in a database(mongodb)
*/
const users = [{
    id: 1,
    username: 'test',
    password: 'test',
    firstName: 'Test',
    lastName: 'User',
}];



module.exports = {
    authenticate,
    getAll
}


async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) throw new Error ('username or password is incorrect');

    /* Then after that, we will create a jwt token that is 
    valid or will be valid for only 7 days */
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' }); 

    // And after all of that, we return the data and other function
    return {
        ...omitPassword(user),
        token
    };
}

// this function is to map over the users items and get all the passwords and return it
async function getAll() {
    return users.map(u => omitPassword(u));
}


// helper functions
function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
