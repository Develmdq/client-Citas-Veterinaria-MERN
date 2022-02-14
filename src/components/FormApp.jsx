import { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Box,
  FormControl,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useMutation, useQueryClient } from "react-query";
import { createNewAppointment, editAppointment } from "../api/config";

const initialValues = {
  petName: "",
  ownerName: "",
  email: "",
  day: "",
  hour: "",
  symptom: "",
};

const FormApp = ({ edit, setEdit }) => {
  const [newAppointment, setNewAppointment] = useState(initialValues);
  const queryClient = useQueryClient();

  const conditionalView = Object.entries(edit).length === 0;
   
  //Creando una cita nueva
  const { mutate: createMutate } = useMutation(createNewAppointment, {
    onSuccess: () => queryClient.invalidateQueries(["appointments"]),
  });

  // Editando cita
  const { mutate: editMutate } = useMutation(editAppointment, {
    onSuccess: (newAppointment) => {
      queryClient.invalidateQueries(["appointments"]);
      // queryClient.setQueryData(
      //   ["appointments", { id: newAppointment.id }],
      //   newAppointment
      // );
    },
  });

  useEffect(() => {
    if (!conditionalView) {
      setNewAppointment({
        petName: edit.petName,
        ownerName: edit.ownerName,
        email: edit.email,
        day: edit.day,
        hour: edit.hour,
        symptom: edit.symptom,
      });
    }
  }, [edit]);

  const handleDate = (e) => {    
    const dayInput = new Date(e.target.value);
    const dayFormat = format(dayInput, "PPPP", { locale: es });
    const hourFormat = format(dayInput, "HH:mm");

    setNewAppointment({
      ...newAppointment,
      day: dayFormat,
      hour: hourFormat,
    });
  };
 
  const handleChange = (e) => {        
    switch (e.target.id) {
      case "petName":
         setNewAppointment({
           ...newAppointment,
           petName: e.target.value           
         });        
        break;
      case "ownerName":
        setNewAppointment({
          ...newAppointment,
          ownerName: e.target.value,
        });
        break;
      case "email":
        setNewAppointment({
          ...newAppointment,
          email: e.target.value,
        });
        break;
      case "symptom":
        setNewAppointment({
          ...newAppointment,
          symptom: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {    
    if (
      newAppointment.petName === "" ||
      newAppointment.ownerName === "" ||
      newAppointment.email === "" ||
      newAppointment.day === "" ||
      newAppointment.symptom === ""
    ) {
      showAlert("noData");
      return;
    } else {
      try {
        if (conditionalView) {
          createMutate(newAppointment);
        } else {
          editMutate([edit._id, newAppointment]);
        }
      } catch (error) {
        console.log(error);
      }
      showAlert("saveData");
    }
  };

  const showAlert = (value) => {
    switch (value) {
      case "noData":
        Swal.fire({
          title: "Error!",
          text: "No dejes campos sin rellenar",
          icon: "error",
          confirmButtonText: "OK",
        });
        break;
      case "saveData":
        Swal.fire({
          title: "OK!",
          text: conditionalView
            ? "La cita se agendó correctamente"
            : "La cita se actualizó correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        setEdit({});
        setNewAppointment(initialValues);
        break;
      default:
        break;
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item>
        <Typography variant="h3" color="#4a0788" marginY="5%">
          {conditionalView ? "Agendar Cita Nueva" : "Editar Cita"}
        </Typography>
      </Grid>
      <Box
        sx={{
          bgcolor: "white",
          boxShadow: 2,
          borderRadius: 2,
          marginLeft: 1,
          width: "95%",
          alignSelf: "center",
        }}
      >
        <FormControl onSubmit={handleSubmit}>
          <Grid
            container
            component="form"
            noValidate
            autoComplete="off"
            marginLeft="20px"
            marginTop="25px"
          >
            <TextField
              type="text"
              id="petName"
              label="Nombre Mascota"
              onChange={handleChange}
              sx={{ m: 1, width: "47ch", alignSelf: "center" }}
              value={newAppointment.petName}              
            />
            <TextField
              type="text"
              id="ownerName"
              label="Propietario"
              onChange={handleChange}
              sx={{ m: 1, width: "46ch", alignSelf: "center" }}
              value={newAppointment.ownerName}
            />
            <TextField
              id="email"
              label="Email / Teléfono"
              onChange={handleChange}
              sx={{ m: 1, width: "47ch", alignSelf: "center" }}
              type="email"
              value={newAppointment.email}
            />
            <TextField              
              id="date"
              sx={{ m: 1, width: "46ch", alignSelf: "center" }}
              type="datetime-local"
              onChange={handleDate}
              value={newAppointment.date}
            />
            <TextField
              type="text"
              id="symptom"
              label="Síntomas"
              onChange={handleChange}
              sx={{ m: 1, width: "95ch", alignSelf: "center" }}
              multiline
              maxRows={6}
              value={newAppointment.symptom}
            />
            <Button
              variant="contained"
              sx={{
                m: 1,
                width: "103ch",
                alignSelf: "center",
                marginBottom: 4,
                marginTop: 2,
                borderRadius: 2,
                backgroundColor: "#4a0788",
              }}
              onClick={handleSubmit}
            >
              {conditionalView ? "Agendar Cita Nueva" : "Editar Cita"}
            </Button>
            {!conditionalView && (
              <Button
                variant="contained"
                sx={{
                  m: 1,
                  width: "103ch",
                  alignSelf: "center",
                  marginBottom: 4,
                  marginTop: -1,
                  borderRadius: 2,
                  backgroundColor: "#4a0788",
                }}
                onClick={() => {
                  setEdit(initialValues);
                  setNewAppointment(initialValues);
                }}
              >
                Cancelar Editar
              </Button>
            )}
          </Grid>
        </FormControl>
      </Box>
    </Grid>
  );
};

export default FormApp;
