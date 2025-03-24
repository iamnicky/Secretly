import React from "react";
import Typography from "@mui/material/Typography";

function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Typography variant="h2" sx={{ typography: { sm: "h2", xs: "h6" } }}>
        404 - Page Not found
      </Typography>
    </div>
  );
}

export default NotFound;
