import { useState } from "react";

export default function useSnackbar() {

    const [snackbar, setSnackbar] = useState({

        open: false,

        severity: "success",

        message: ""

    });

    const showSnackbar = (result) => {
        const status = result.Status ?? result.status;
        const message = result.Message ?? result.message;

        setSnackbar({
            open: true,
            severity: status === "Success" ? "success" : "error",
            message,
        });
    };

    const closeSnackbar = () => {

        setSnackbar(prev => ({

            ...prev,

            open: false

        }));

    };

    return {

        snackbar,

        showSnackbar,

        closeSnackbar

    };

}