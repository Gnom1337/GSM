import { useState } from "react";

export default function useSnackbar() {

    const [snackbar, setSnackbar] = useState({

        open: false,

        severity: "success",

        message: ""

    });

    const showSnackbar = (result) => {

        setSnackbar({

            open: true,

            severity:
                result.Status || result.status
                    ? "success"
                    : "error",

            message:
                result.Message ??
                result.message ??
                "Операция выполнена"

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