import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:5141/api/Products"
});

export const getProducts = () =>
    api.get("/GetAll");

export const getProduct = (id) =>
    api.get(`GetById/${id}`);

export const createProduct = (product) =>
    api.post("", product);

export const updateProduct = (id, product) =>
    api.put(`/${id}`, product);

export const deleteProduct = (id) =>
    api.delete(`/${id}`);