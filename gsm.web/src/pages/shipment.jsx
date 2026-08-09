import { useEffect, useState } from "react";

import {
    Box,
    Stack,
    Typography
} from "@mui/material";

import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import DispatchDialog from "../components/DispatchDialog";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import ruLocale from "@fullcalendar/core/locales/ru";

import format from "date-fns/format";

import dispatchApi from "../services/dispatchApi";
import tanksApi from "../services/tanksApi";



import AppSnackbar from "../components/AppSnackbar";
import useSnackbar from "../hooks/useSnackbar";


export default function ShipmentPage() {


    const {
        snackbar,
        showSnackbar,
        closeSnackbar
    } = useSnackbar();


    const [events,setEvents] = useState([]);

    const [tanks,setTanks] = useState([]);

    const [dialog,setDialog] = useState({
        open:false,
        mode:null,
        value:null
    });

    const [form,setForm] = useState(null);



    const loadData = async()=>{

        try{

            const dispatches = await dispatchApi.getAll();

            const tankList = await tanksApi.getAll();


            setTanks(tankList);


            setEvents(
                dispatches.map(item=>({

                    id:item.dispatchId,

                    title:
                        `${item.recipientOrg} (${item.volumeInvoiceLiters} л) - ${item.status}`,

                    start:
                        item.dispatchDate,

                    allDay:true,

                    extendedProps:{
                        data:item
                    }

                }))
            );


        }
        catch(e){

            console.error(e);

        }

    };



    useEffect(()=>{

        loadData();

    },[]);





    const closeDialog=()=>{

        setDialog({
            open:false,
            mode:null,
            value:null
        });

        setForm(null);

    };





    const addDispatch=(date)=>{


        const model={

            dispatchDate:
                format(date,"yyyy-MM-dd"),

            tankId:"",
            truckNumber:"",
            driverName:"",
            recipientOrg:"",
            volumeInvoiceLiters:"",
            waybillNumber:"",
            status: "В ожидании"
        };


        setForm(model);


        setDialog({

            open:true,

            mode:"add",

            value:model

        });

    };
    const editCurrentDispatch = () => {

        setDialog(prev => ({
            ...prev,
            mode: "edit"
        }));

    };
    const deleteDispatch = async (value) => {

        if (!value?.dispatchId) {
            return;
        }

        const confirmed = window.confirm(
            "Вы действительно хотите удалить этот отпуск?"
        );

        if (!confirmed) {
            return;
        }

        try {

            const result =
                await dispatchApi.remove(value.dispatchId);

            showSnackbar(
                result.data ?? result
            );

            closeDialog();

            await loadData();

        } catch (e) {

            console.error(e);

            showSnackbar({
                Status: "Error",
                Message: "Ошибка удаления."
            });

        }
    };



    const viewDispatch=(info)=>{


        const item =
            info.event.extendedProps.data;


        setForm(item);


        setDialog({

            open:true,

            mode:"view",

            value:item

        });

    };





    const editDispatch=(info)=>{


        const item =
            info.event.extendedProps.data;


        setForm(item);


        setDialog({

            open:true,

            mode:"edit",

            value:item

        });

    };





    const eventContent = (arg) => {

        const status = arg.event.extendedProps.data?.status;

        const statusStyles = {
            "В ожидании": {
                background: "#fff3cd",
                color: "#856404"
            },

            "Не отгружен": {
                background: "#f8d7da",
                color: "#842029"
            },

            "Отгружен": {
                background: "#43a047",
                color: "#fff"
            }
        };

        const style =
            statusStyles[status] ??
            statusStyles["Отгружен"];

        return (
            <Box
                sx={{
                    background: style.background,
                    borderRadius: 2,
                    color: style.color,
                    px: 1,
                    py: 0.5,
                    fontWeight: 600,
                    fontSize: 13,
                    overflow: "hidden"
                }}
            >
                {arg.event.title}
            </Box>
        );
    };





    const saveDispatch=async()=>{

        const tank=tanks.find(
            x=>x.tankId===Number(form.tankId)
        );


        if(!tank){

            showSnackbar({
                Status:"Error",
                Message:"Выберите резервуар."
            });

            return;

        }


        const volume=
            Number(form.volumeInvoiceLiters);



        if(volume<=0){

            showSnackbar({
                Status:"Error",
                Message:"Введите корректный объем."
            });

            return;

        }



        try{


            const result =
                dialog.mode==="add"

                ? await dispatchApi.create(form)

                : await dispatchApi.update(form);



            showSnackbar(
                result.data ?? result
            );


            closeDialog();

            await loadData();


        }
        catch(e){

            showSnackbar({

                Status:"Error",

                Message:"Ошибка сохранения."

            });

        }


    };





    return (

        <>


        <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            mb={3}
        >

            <ScheduleSendIcon
                color="secondary"
                sx={{
                    fontSize:30
                }}
            />

            <Typography
                variant="h5"
                fontWeight={700}
            >
                Отпуск в автоцистерны
            </Typography>


        </Stack>





        <Box

                sx={{

                    p: 2,

                    borderRadius: 4,

                    boxShadow:
                        "0 10px 35px rgba(0,0,0,.08)",



                    "& .fc": {


                        "--fc-border-color":
                            "rgba(0,0,0,.08)"

                    },


                    "& .fc-toolbar": {

                        mb: 3,

                    },


                    "& .fc-toolbar-title": {

                        fontSize: 22,

                        fontWeight: 700

                    },



                    "& .fc-button": {


                        background: "#43a047!important",
                        padding: "5px",
                        border: "0!important",

                        borderRadius: "10px!important",

                        fontWeight: 600


                    },


                    "& .fc-button:hover": {


                        opacity: .85

                    },






                    "& .fc-day-today": {

                        background:
                            "#c8e6c9!important"

                    },



                    "& .fc-event": {

                        border: 0,

                        background: "transparent"

                    },




                }}

        >



        <FullCalendar

            plugins={[
                dayGridPlugin,
                interactionPlugin
            ]}


            locale={ruLocale}


            initialView="dayGridMonth"


            height="80vh"


            events={events}


            editable={false}


            selectable={true}


            dayMaxEvents={3}


            eventContent={eventContent}



            dateClick={(info)=>{

                addDispatch(info.date)

            }}



            eventClick={(info)=>{

                viewDispatch(info)

            }}



            eventDoubleClick={(info)=>{

                editDispatch(info)

            }}


        />


        </Box>





            <DispatchDialog
                open={dialog.open}
                mode={dialog.mode}
                value={form}
                tanks={tanks}
                onClose={closeDialog}
                onSave={saveDispatch}
                onEdit={editCurrentDispatch}
                onDelete={deleteDispatch}
                onChange={setForm}
            />





        <AppSnackbar

            open={snackbar.open}

            severity={snackbar.severity}

            message={snackbar.message}

            onClose={closeSnackbar}

        />



        </>

    );

}