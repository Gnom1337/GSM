import http from "../components/http";

const tanksApi = {

    getAll: async () => {

        const { data } = await http.get("/Tanks/GetAll");

        return data;

    },

    getById: async (id) => {

        const { data } = await http.get(`/Tanks/GetById/${id}`);

        return data;

    },

    create: async (tank) => {

        const { data } = await http.post(
            "/Tanks/Create",
            tank
        );

        return data;

    },

    update: async (tank) => {

        const { data } = await http.put(
            `/Tanks/Update/${tank.tankId}`,
            tank
        );

        return data;

    },

    remove: async (id) => {

        const { data } = await http.delete(
            `/Tanks/Delete/${id}`
        );

        return data;

    }

};

export default tanksApi;