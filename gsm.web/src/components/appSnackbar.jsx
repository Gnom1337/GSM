import {

    Snackbar,
    Slide,
    Alert

} from "@mui/material";

function SlideTransition(props) { return <Slide {...props} direction="up" />; }
export default function AppSnackbar({

    open,

    severity,

    message,

    onClose

}) {

    return (

        <Snackbar

            open={open}

            autoHideDuration={2500}
            slots={{ transition: SlideTransition }}
            onClose={onClose}

            anchorOrigin={{

                vertical: "bottom",

                horizontal: "center"

            }}

        >

            <Alert

                severity={severity}

                variant="filled"

                onClose={onClose}

                sx={{

                    minWidth: 350

                }}

            >

                {message}

            </Alert>

        </Snackbar>

    );

}