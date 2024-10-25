import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { MdLockOutline } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import CopyRight from "../../Components/CopyRight/CopyRight";
import { useLocation, useNavigate } from "react-router-dom";

const Verification = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);

  const email = new URLSearchParams(useLocation().search).get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Verifying code...");
    try {
      const verify = await axios.post(`${process.env.REACT_APP_VERIFY_CODE}`, {
        email,
        code,
      });
      toast.update(toastId, {
        render: verify.data.message,
        type: "success",
        isLoading: false,
        autoClose: 1000,
        theme: "colored",
      });
      setVerified(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.update(toastId, {
        render: error.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 1000,
        theme: "colored",
      });
    }
  };

  return (
    <>
      {!verified ? (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
              <MdLockOutline />
            </Avatar>
            <Typography component="h1" variant="h5">
              User Verification
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="code"
                label="Verification Code"
                value={code}
                name="code"
                onChange={(e) => setCode(e.target.value)}
                // autoComplete="email"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Verify
              </Button>
            </Box>
          </Box>
          <CopyRight sx={{ mt: 8, mb: 4 }} />
        </Container>
      ) : (
        <Box
          sx={{
            marginTop: 28,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
          }}
        >
          <Typography
            component="h2"
            variant="h6"
            color="#1976d2"
            margin="20px 0"
          >
            User verified Successfully
          </Typography>
          {/* <a href="https://mail.google.com/mail/" target='_blank' rel='noreferrer'>  <Button endIcon={<MdMailOutline />} variant='contained'>Open Mail</Button></a> */}
        </Box>
      )}
    </>
  );
};

export default Verification;
