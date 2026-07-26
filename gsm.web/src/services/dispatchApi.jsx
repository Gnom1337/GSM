import api from "../components/http";

const dispatchApi = {
    getAll: async () => {
        const { data } = await api.get("/Dispatches/GetAll");
        return data;
    },

    create: async (model) => {
        const { data } = await api.post("/Dispatches/Create", model);
        return data;
    },

    update: async (model) => {
        const { data } = await api.put("/Dispatches/Update", model);
        return data;
    },

    remove: async (id) => {
        const { data } = await api.delete(`/Dispatches/Delete/${id}`);
        return data;
    }
};

export default dispatchApi;