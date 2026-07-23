import http from "../components/http";

const productsApi = {

    getAll: async () => {
        const { data } = await http.get("/Products/GetAll");
        return data;
    },

    getById: async (id) => {
        const { data } = await http.get(`/Products/GetById/${id}`);
        return data;
    },

    create: async (product) => {
        const { data } = await http.post(
            "/Products/Create",
            product
        );

        return data;
    },

    update: async (product) => {
        const { data } = await http.put(
            `/Products/Update/${product.productId}`,
            product
        );

        return data;
    },

    remove: async (id) => {
        const { data } = await http.delete(`/Products/Delete/${id}`);
        return data;
    }

};

export default productsApi;