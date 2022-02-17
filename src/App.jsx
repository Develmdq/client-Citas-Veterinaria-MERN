import { useState } from "react";
import { Box, Grid } from "@mui/material";
import { useQuery } from "react-query";
import { getAppointments } from "./api/config";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Header from "./components/Header";
import ListAppointments from "./components/ListAppointments";
import FormApp from "./components/FormApp";
import "sweetalert2/dist/sweetalert2.min.css";

const today = new Date();

const App = () => {   
  const [edit, setEdit] = useState({});
  const [value, setValue] = useState(today);

  // Leyendo todas las citas
  const { data: appointments, status } = useQuery(
    ["appointments"],
    getAppointments
  );  
  
  //Filtrando por día y ordenando la lista de menor a mayor según la hora
  const dayFormat = format(value, "PPPP", { locale: es });
  
  const appointment = appointments
    ?.filter((e) => e.day === dayFormat)
    .sort((a, b) => {
      if (a.hour < b.hour) return -1;
      if (b.hour > a.hour) return 1;
    });
  
  return (
    <Box>
      <Grid>
        <Header />
      </Grid>
      <Grid
        container
        p={2}
        bgcolor="#cccccc33"
        minHeight="100vh"
        sx={{ display: "flex", flexDirection: { xl: "row", xxs: "column" } }}
      >
        <Grid
          item
          md={12}
          xl={6}
          sx={{ justifyContent: "center", alignItems: "center", width: "100%" }}
        >
          <FormApp edit={edit} setEdit={setEdit} appointment={appointment} />
        </Grid>
        <Grid
          item
          md={12}
          xl={6}
          sx={{ justifyContent: "center", alignItems: "center", width: "100%" }}
        >
          <ListAppointments
            edit={edit}
            setEdit={setEdit}
            appointment={appointment}
            status={status}
            value={value}
            setValue={setValue}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
