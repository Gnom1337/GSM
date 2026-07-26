import api from "../components/http";

const controller = "/WagonReceipts";

const wagonReceiptsApi = {

    getAll: async () => {

        const { data } = await api.get(
            `${controller}/GetAll`
        );

        return data;

    },

    getById: async (id) => {

        const { data } = await api.get(
            `${controller}/Get/${id}`
        );

        return data;

    },

    create: async (model) => {

        const { data } = await api.post(
            `${controller}/Create`,
            model
        );

        return data;

    },

    update: async (model) => {

        const { data } = await api.put(
            `${controller}/Update`,
            model
        );

        return data;

    },

    remove: async (id) => {

        const { data } = await api.delete(
            `${controller}/Delete/${id}`
        );

        return data;

    }

};

export default wagonReceiptsApi;