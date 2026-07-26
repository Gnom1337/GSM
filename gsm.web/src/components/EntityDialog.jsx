import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Typography,
    Stack
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

export default function EntityDialog({
    open,
    title,
    children,
    mode,
    onClose,
    onSave,
    dialogProps = {}
}) {

    const isView = mode === "view";

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            {...dialogProps}
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 4
                }
            }}
        >

            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                <Typography variant="h6" fontWeight={600}>
                    {title}
                </Typography>

                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>

            </DialogTitle>

            <DialogContent dividers>

                <Stack spacing={3} mt={1}>

                    {children}

                </Stack>

            </DialogContent>

            <DialogActions
                sx={{
                    justifyContent: "space-between",
                    p: 2
                }}
            >

                <Button onClick={onClose}>
                    Закрыть
                </Button>

                {!isView && (

                    <Button
                        variant="contained"
                        onClick={onSave}
                    >
                        {mode === "add"
                            ? "Создать"
                            : "Сохранить"}
                    </Button>

                )}

            </DialogActions>

        </Dialog>

    );

}