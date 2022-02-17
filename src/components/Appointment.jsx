import { Typography, Box, Button, IconButton } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import { deleteAppointment } from "../api/config";
import { useMutation, useQueryClient } from "react-query";

const Appointment = ({ appointment, setEdit }) => {
  const { hour, petName, ownerName, email, symptom, _id } = appointment;
  const matches = useMediaQuery("(min-width:600px)");
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
    <Box
      sx={{
        alignItems: "center",
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: 1,
        display: "flex",
        marginLeft: 1,
        marginBottom: 3,
        marginTop: -1,
        justifyContent: "space-between",
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
          justifyContent: "center",
          backgroundColor: "yellowgreen",
          borderRadius: 2,
        }}
      >
        <Typography sx={{ fontSize: { md: "15px", xs: "10px" } }}>
          HORA
        </Typography>
        <Typography
          color="primary"
          fontWeight="900"
          sx={{ fontSize: { md: "15px", xs: "10px" } }}
        >
          {hour}
        </Typography>
      </Box>
      <Box sx={{ width: { lg: "75%", xs: "70%" } }}>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                marginY: "10px",
              }}
            >
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
            </Box>
            <Box
              sx={{
                display: "flex",
              }}
            >
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
          height: "100px",
          justifyContent: "space-around",
        }}
      >
        {matches ? (
          <>
            <Button
              onClick={() => setEdit(appointment)}
              variant="contained"
              startIcon={<EditIcon />}
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
          </>
        ) : (
          <>
            <IconButton
              aria-label="delete"
              onClick={() => setEdit(appointment)}
            >
              <EditIcon color="primary" />
            </IconButton>
            <IconButton aria-label="delete" onClick={showAlertDelete}>
              <DeleteIcon color="primary" />
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Appointment;
