import { Grid, TextField, Typography, Box } from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Appointment from "./Appointment";
  
const ListAppointments = ({
  setEdit,
  appointment,
  status,
  value,
  setValue,  
}) => {
  //Capturando valor del input de la fecha
  const handleChange = (newDay) => setValue(newDay);
 
  if (status === "loading") {
    return (
      <Typography
        variant="h4"
        color="primary"
        marginTop="4%"
        textAlign="center"
      >
        Cargando, un momento por favor...
      </Typography>
    );
  }

  if (status === "error") {
    return (
      <>
        <Typography
          variant="h4"
          color="primary"
          marginTop="4%"
          textAlign="center"
        >
          Error al consultar las citas
        </Typography>
        <Typography
          variant="h5"
          color="primary"
          marginTop="4%"
          textAlign="center"
        >
          Te pedimos disculpas por el inconveniente. Verifica tu conexión a
          internet o intenta conectarte más tarde.
        </Typography>
      </>
    );
  }

  return (
    <Grid display="flex" flexDirection="column">
      <Box
        display="flex"
        alignSelf="center"
        width="97%"
        justifyContent="center"
      >
        <Box flex="1">
          {appointment[0] ? (
            <Typography variant="h4" color="primary" marginTop="4%">
              {`Citas del ${appointment[0].day}`}
            </Typography>
          ) : (
            <Typography
              variant="h4"
              color="primary"
              marginTop="3%"
              textAlign="center"
            >
              No hay citas para este día
            </Typography>
          )}
        </Box>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Buscar por día"
              inputFormat="dd/MM/yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      <Box marginTop="30px">
        {appointment?.map((appointment) => (
          <Appointment
            key={appointment._id}
            appointment={appointment}
            setEdit={setEdit}
          />
        ))}
      </Box>
    </Grid>
  );
};

export default ListAppointments;
