import { useEffect, useState } from "react";

import {
    Box,
    Stack,
    Typography
} from "@mui/material";

import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import ruLocale from "@fullcalendar/core/locales/ru";

import format from "date-fns/format";

import dispatchApi from "../services/dispatchApi";
import tanksApi from "../services/tanksApi";

import EntityDialog from "../components/EntityDialog";
import DispatchForm from "../components/DispatchForm";

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
                        `${item.recipientOrg} (${item.volumeInvoiceLiters} л)`,

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
            waybillNumber:""

        };


        setForm(model);


        setDialog({

            open:true,

            mode:"add",

            value:model

        });

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





    const eventContent=(arg)=>{


        return (

            <Box
                sx={{
                    background:
                        "linear-gradient(135deg,#673ab7,#7E57C2)",

                    borderRadius:2,

                    color:"#fff",

                    px:1,

                    py:.5,

                    fontWeight:600,

                    fontSize:13,

                    overflow:"hidden"
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


                        background: "#673ab7!important",

                        border: "0!important",

                        borderRadius: "10px!important",

                        fontWeight: 600


                    },


                    "& .fc-button:hover": {


                        opacity: .85

                    },






                    "& .fc-day-today": {

                        background:
                            "#F3E5F5!important"

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





        <EntityDialog

            open={dialog.open}

            mode={dialog.mode}

            title={
                dialog.mode==="add"

                ? "Добавить отпуск"

                :

                dialog.mode==="edit"

                ? "Редактирование отпуска"

                :

                "Просмотр отпуска"

            }

            onClose={closeDialog}

            onSave={saveDispatch}

        >

            <DispatchForm

                value={form}

                mode={dialog.mode}

                tanks={tanks}

                onChange={setForm}

            />


        </EntityDialog>





        <AppSnackbar

            open={snackbar.open}

            severity={snackbar.severity}

            message={snackbar.message}

            onClose={closeSnackbar}

        />



        </>

    );

}