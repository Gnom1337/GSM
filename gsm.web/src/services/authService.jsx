import api from "../components/http";

export const login = (userName, password) => {
    return api.post("/Auth/Login", {
        userName,
        password,
    });
};

export const logout = () => {
    return api.post("/Auth/Logout");
};

export const me = () => {
    return api.get("/Auth/Me");
};