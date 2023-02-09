import React from "react";
import Button from "@mui/material/Button";

const buttonSubmit = (props) => {
  var color = "#FF9505";
  if (props.color) {
    color = "#C70000";
  }
  return (
    <Button
      onClick={() => {
        props.Submit();
      }}
      variant="contained"
      sx={{
        backgroundColor: "#FFFBFB",
        color: "#1B1B1B",
        width: 1 / 2,
        marginX: "auto",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: color,
        },
      }}
    >
      {props.text}
    </Button>
  );
};

export default buttonSubmit;
