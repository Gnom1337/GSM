import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    Typography,
    Divider,
    Box,
    Chip,
    IconButton
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import DispatchForm from "./DispatchForm";


export default function DispatchDialog({
    open,
    mode,
    value,
    tanks,
    onClose,
    onSave,
    onEdit,
    onDelete,
    onChange
}) {

    const isView = mode === "view";
    const isEdit = mode === "edit";
    const isAdd = mode === "add";

    const title = isAdd
        ? "Добавить отпуск"
        : isEdit
            ? "Редактирование отпуска"
            : "Просмотр отпуска";


    const getStatusColor = (status) => {

        switch (status) {

            case "В ожидании":
                return {
                    background: "#fff3cd",
                    color: "#856404"
                };

            case "Не отгружен":
                return {
                    background: "#f8d7da",
                    color: "#842029"
                };

            case "Отгружен":
                return {
                    background: "#d1e7dd",
                    color: "#0f5132"
                };

            default:
                return {
                    background: "#e9ecef",
                    color: "#495057"
                };
        }
    };


    const viewField = (label, fieldValue) => {

        return (
            <Box
                sx={{
                    py: 1.25,
                    borderBottom: "1px solid rgba(0,0,0,0.06)"
                }}
            >

                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                        display: "block",
                        mb: 0.4,
                        fontWeight: 500
                    }}
                >
                    {label}
                </Typography>

                <Typography
                    variant="body1"
                    fontWeight={600}
                    color="text.primary"
                >
                    {fieldValue || "-"}
                </Typography>

            </Box>
        );
    };


    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.18)"
                }
            }}
        >

            {/* Шапка */}

            <DialogTitle
                sx={{
                    px: 3,
                    py: 2.5,
                    fontWeight: 700,
                    fontSize: 21,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >

                <Typography
                    component="span"
                    fontWeight={700}
                    fontSize={21}
                >
                    {title}
                </Typography>


                <IconButton
                    onClick={onClose}
                    aria-label="Закрыть"
                    sx={{
                        ml: 2,
                        color: "text.secondary",
                        borderRadius: 2,

                        "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.06)",
                            color: "text.primary"
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>

            </DialogTitle>


            <Divider />


            {/* Содержимое */}

            <DialogContent
                sx={{
                    px: 3,
                    py: 2.5
                }}
            >

                {isView ? (

                    <Stack spacing={0}>

                        {viewField(
                            "Дата",
                            value?.dispatchDate
                        )}

                        {viewField(
                            "Организация",
                            value?.recipientOrg
                        )}

                        {viewField(
                            "Объем",
                            value?.volumeInvoiceLiters
                                ? `${ value.volumeInvoiceLiters } л`
                                : "-"
                        )}

                        {viewField(
                            "Автоцистерна",
                            value?.truckNumber
                        )}

                        {viewField(
                            "Водитель",
                            value?.driverName
                        )}

                        {viewField(
                            "Номер накладной",
                            value?.waybillNumber
                        )}

                        <Box sx={{ py: 1.5 }}>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                    display: "block",
                                    mb: 0.8,
                                    fontWeight: 500
                                }}
                            >
                                Статус
                            </Typography>

                            <Chip
                                label={value?.status || "В ожидании"}
                                sx={{
                                    fontWeight: 600,
                                    backgroundColor:
                                        getStatusColor(
                                            value?.status
                                        ).background,
                                    color:
                                        getStatusColor(
                                            value?.status
                                        ).color
                                }}
                            />

                        </Box>

                    </Stack>

                ) : (

                    <DispatchForm
                        value={value}
                        mode={mode}
                        tanks={tanks}
                        onChange={onChange}
                    />

                )}

            </DialogContent>


            {/* Кнопки */}

            <Divider />

            <DialogActions
                sx={{
                    px: 3,
                    py: 2,
                    backgroundColor: "#fafafa"
                }}
            >

                <Stack
                    direction="row"
                    spacing={1}
                    width="100%"
                    justifyContent="flex-end"
                >

                    {isView && (
                        <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={onEdit}
                            sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 600
                            }}
                        >
                            Редактировать
                        </Button>
                    )}


                    {(isAdd || isEdit) && (
                        <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={() => onSave(value)}
                            sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 600
                            }}
                        >
                            Сохранить
                        </Button>
                    )}


                    {isEdit && (
                        <Button
                            color="error"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={() => onDelete(value)}
                            sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 600
                            }}
                        >
                            Удалить
                        </Button>
                    )}

                </Stack>

            </DialogActions>

        </Dialog>
    );
}

