

export default function authHeader() {

    /*
    The code below checks the Local Storage for user item. If there is a logged in user with accessToken (JWT), it will return HTTP Authorization header. Otherwise, return an empty object.
     */
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.accessToken) {
        return {
            Authorization: 'Bearer ' + user.accessToken
        };
    } else {
        return {};
    }
}