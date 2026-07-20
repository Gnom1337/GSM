import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:5141/api/Users"
});

export const getUsers = () =>
    api.get("/GetAll");

export const getUser = (id) =>
    api.get(`/${id}`);

export const createUser = (user) =>
    api.post("", user);

export const updateUser = (id, user) =>
    api.put(`/${id}`, user);

export const deleteUser = (id) =>
    api.delete(`/${id}`);