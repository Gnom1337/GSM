import api from "../components/http";

const dashboardApi = {

    getDashboard: async (from, to) => {

        const { data } = await api.get(
            "/Dashboard/GetData",
            {
                params: {
                    from,
                    to
                }
            }
        );

        return data;

    }

};

export default dashboardApi;