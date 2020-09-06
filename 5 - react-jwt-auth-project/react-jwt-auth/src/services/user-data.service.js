
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test";


class UserDataService {

    /* This function is use to get "All Data / All the Public User" data */
    getPublicContent() {
        return axios.get(API_URL + "all");
    }

    /*  This function is use to get only the "User Board data"
        and after that, we call the authHeader function to check: 
        If there is a logged in user with accessToken (JWT) in the localStorage, it will return HTTP Authorization header. Otherwise, return an empty object. 
    */
    getUserBoard() {
        return axios.get(API_URL + "user", {
            headers: authHeader()
        })
    }

    /*  This function is use to get only the "Moderator Board data"
        and after that, we call the authHeader function to check: 
        If there is a logged in user with accessToken (JWT) in the localStorage, it will return HTTP Authorization header. Otherwise, return an empty object. 
    */
    getModeratorBoard() {
        return axios.get(API_URL + "mod", {
            headers: authHeader()
        })
    }

    /*  This function is use to get only the "Administrator Board data"
        and after that, we call the authHeader function to check: 
        If there is a logged in user with accessToken (JWT) in the localStorage, it will return HTTP Authorization header. Otherwise, return an empty object. 
    */
    getAdminBoard() {
        return axios.get(API_URL + "admin", {
            headers: authHeader()
        })
    }


}


export default new UserDataService();