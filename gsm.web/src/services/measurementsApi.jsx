import http from "../components/http";

const measurementsApi = {

    getByTank: async (tankId) => {

        const { data } = await http.get(
            `/Measurements/GetByTank/${tankId}`
        );

        return data;

    },

    getById: async (id) => {

        const { data } = await http.get(
            `/Measurements/GetById/${id}`
        );

        return data;

    },

    create: async (measurement) => {

        const { data } = await http.post(
            "/Measurements/Create",
            measurement
        );

        return data;

    },

    update: async (measurement) => {

        const { data } = await http.put(
            `/Measurements/Update/${measurement.measurementId}`,
            measurement
        );

        return data;

    },

    remove: async (id) => {

        const { data } = await http.delete(
            `/Measurements/Delete/${id}`
        );

        return data;

    }

};

export default measurementsApi;