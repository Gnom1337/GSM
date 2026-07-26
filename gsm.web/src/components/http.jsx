import axios from "axios";

const http = axios.create({

    baseURL: "https://localhost:5141/api",
    withCredentials: true,
    headers: {

        "Content-Type": "application/json"

    }

});

export default http;