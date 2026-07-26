import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    Typography,
    Divider,
    Box
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
    onDelete


}) {



    const isView =
        mode === "view";


    const isEdit =
        mode === "edit";


    const isAdd =
        mode === "add";





    const title =

        isAdd

            ? "Добавить отпуск"

            :

            isEdit

                ? "Редактирование отпуска"

                :

                "Просмотр отпуска";







    const viewField = (label, value) => {


        return (

            <Box mb={1}>


                <Typography

                    variant="caption"

                    color="text.secondary"

                >

                    {label}

                </Typography>


                <Typography

                    fontWeight={600}

                >

                    {value || "-"}

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


        >



            <DialogTitle>


                {title}



            </DialogTitle>





            <DialogContent>



                <Divider sx={{ mb: 2 }} />





                {

                    isView ?



                        (



                            <>



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
                                    `${value?.volumeInvoiceLiters || 0} л`
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



                            </>



                        )



                        :

                        (



                            <DispatchForm


                                value={value}


                                mode={mode}


                                tanks={tanks}



                            />



                        )



                }




            </DialogContent>







            <DialogActions>



                <Stack

                    direction="row"

                    spacing={1}

                    width="100%"

                    justifyContent="flex-end"

                >



                    {


                        isView &&


                        (


                            <Button


                                variant="contained"


                                startIcon={<EditIcon />}



                                onClick={onEdit}



                            >


                                Редактировать


                            </Button>


                        )



                    }







                    {


                        (isAdd || isEdit)

                        &&


                        (


                            <Button


                                variant="contained"


                                startIcon={<SaveIcon />}



                                onClick={() => {


                                    onSave(value);


                                }}



                            >


                                Сохранить


                            </Button>



                        )


                    }







                    {


                        isEdit &&


                        (


                            <Button


                                color="error"


                                variant="outlined"


                                startIcon={<DeleteIcon />}



                                onClick={() => {


                                    onDelete(value);


                                }}



                            >


                                Удалить


                            </Button>



                        )


                    }








                    <Button


                        variant="outlined"


                        startIcon={<CloseIcon />}



                        onClick={onClose}


                    >


                        Закрыть


                    </Button>





                </Stack>



            </DialogActions>






        </Dialog>


    );


}