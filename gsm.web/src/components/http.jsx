import axios from "axios";

export default axios.create({
    baseURL: "https://localhost:5141/api",
    headers: {
        "Content-Type": "application/json"
    }
});