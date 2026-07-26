import api from "../components/http";

const tankMeasurementsApi = {

    getByTank: async (tankId) => {

        const response = await api.get(
            `/TankMeasurments/GetAll/${tankId}`
        );

        return response.data;

    },

    create: async (measurement) => {

        const response = await api.post(
            `/TankMeasurments/Create/${measurement.tankId}`,
            measurement
        );

        return response.data;

    },

    update: async (measurement) => {

        const response = await api.put(
            `/TankMeasurments/Update/${measurement.measurementId}`,
            measurement
        );

        return response.data;

    },

    remove: async (id) => {

        const response = await api.delete(
            `/TankMeasurments/Delete/${id}`
        );

        return response.data;

    }

};

export default tankMeasurementsApi;