import React from "react";
import Button from "@mui/material/Button";

const buttonSubmit = (props) => {
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
          backgroundColor: "#FF9505",
        },
      }}
    >
      {props.text}
    </Button>
  );
};

export default buttonSubmit;
