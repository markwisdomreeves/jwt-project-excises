
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";


class AuthService {
    /* This function is use to login users to the 
    database or local storage and give them access */
    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
        })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
    }


    // This function is use to logout user from the database or local storage
    logout() {
        localStorage.removeItem("user");
    }

    
    // This function is use to register users to the database or local storage
    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }


    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }


}


export default new AuthService();