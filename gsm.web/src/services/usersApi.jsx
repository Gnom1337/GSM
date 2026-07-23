import http from "../components/http";

const usersApi = {

    getAll: async () => {
        const { data } = await http.get("/Users/GetAll");
        return data;
    },

    getById: async (id) => {
        const { data } = await http.get(`/Users/GetById/${id}`);
        return data;
    },

    create: async (user) => {
        const { data } = await http.post("/Users/Create", user);
        return data;
    },

    update: async (user) => {
        const { data } = await http.put(
            `/Users/Update/${user.userId}`,
            user
        );

        return data;
    },

    remove: async (id) => {
        const { data } = await http.delete(`/Users/Delete/${id}`);
        return data;
    }

};

export default usersApi;