import { Typography, Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import { deleteAppointment } from "../api/config";
import { useMutation, useQueryClient } from "react-query";

const Appointment = ({ appointment, setEdit}) => {
  const { hour, petName, ownerName, email, symptom, _id } = appointment;
  const queryClient = useQueryClient();

  // Borrando una cita
  const { mutate } = useMutation(deleteAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries([]);
    },
  });

  const handleDelete = async (id) => {
    try {
      mutate(id);
    } catch (error) {
      console.log(error);
    }
  };

  const showAlertDelete = () => {
    Swal.fire({
      title: "Eliminar la cita?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ad0b34",
      cancelButtonColor: "#4a0788",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminada!",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });        
        handleDelete(_id);
      }
    });
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "white",
          boxShadow: 1,
          borderRadius: 2,
          marginLeft: 1,
          marginBottom: 2,
          width: "95%",
          alignSelf: "center",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px",
        }}
      >
        <Box
          sx={{
            width: "8%",
            height: "100px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: "yellowgreen",
            borderRadius: 2,
          }}
        >
          <Typography>HORA</Typography>
          <Typography color="primary" fontWeight="900">
            {hour}
          </Typography>
        </Box>
        <Box sx={{ width: "75%" }}>
          <Box>
            <Box sx={{ display: "flex" }}>
              <Typography marginLeft="20px" variant="subtitle1">
                Mascota:
              </Typography>
              <Typography
                marginLeft="10px"
                fontWeight="900"
                color="primary"
                variant="subtitle1"
              >
                {petName}
              </Typography>
              <Typography marginLeft="20px" variant="subtitle1">
                Propietario:
              </Typography>
              <Typography
                marginLeft="10px"
                fontWeight="900"
                color="primary"
                variant="subtitle1"
              >
                {ownerName}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", marginY: "10px" }}>
              <Typography marginLeft="20px" variant="subtitle1">
                Email/Teléfono:
              </Typography>
              <Typography
                marginLeft="10px"
                fontWeight="900"
                color="primary"
                variant="subtitle1"
              >
                {email}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography marginLeft="20px" variant="subtitle1">
              Síntomas:
            </Typography>
            <Typography
              marginLeft="10px"
              fontWeight="900"
              color="primary"
              variant="subtitle1"
            >
              {symptom}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "15%",
          }}
        >
          <Button
            onClick={() => setEdit(appointment)}
            variant="contained"
            startIcon={<EditIcon />}
            sx={{ marginBottom: "20px" }}
          >
            Editar
          </Button>
          <Button
            onClick={showAlertDelete}
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Eliminar
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Appointment;
