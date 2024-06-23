import React, { FunctionComponent } from "react";
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from "@mui/material";

const RegisterYourDogCTA: FunctionComponent = () => {
  return (
      <Box
          sx={{
            width: "100%",
            maxWidth: "800px",
            mx: "auto",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start",
            pt: 4,
            px: 2,
            pb: 4,
            boxSizing: "border-box",
            textAlign: "left",
            gap: 2,
          }}
      >
        <Box
            sx={{
              width: "100%",
              borderRadius: "16px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "start",
              border: "1px solid",
              borderColor: '#006CBF',
              p: 4,
            }}
        >
          <Typography
              variant="h4"
              sx={{
                fontSize: "24px",
                lineHeight: "32px",
                fontWeight: "bold",
                textAlign: "left",
                color: "text.primary",
                mb: 2,
              }}
          >
            Final Steps to Start Enjoying Woofy!
          </Typography>
          <Typography
              variant="body1"
              sx={{
                fontSize: "16px",
                lineHeight: "24px",
                textAlign: "left",
                color: "text.primary",
                mb: 2,
              }}
          >
            Please enter your user and services details in order to start serving customers.
          </Typography>
          <Button
              component={Link}
              to="/dog-register"
              sx={{
                mt: 2,
                px: 4,
                py: 1,
                borderRadius: "20px",
                backgroundColor: "#006cbf",
                color: "white",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "cornflowerblue",
                },
              }}
          >
            <Typography variant="button" sx={{ fontSize: "16px", fontWeight: "bold" }}>
              Register your Dog
            </Typography>
          </Button>
        </Box>
      </Box>
  );
};

export default RegisterYourDogCTA;
