import {useState} from "react";

import {
 
  TextField,
  Paper,
  

  Box,

} from "@mui/material";

import "../App.css";
import { InputState } from "./variables";

import { Output } from "./output";

const errorStyle = {
  color: "red",
  background: "#F2F2F7",
  marginLeft: "0",
  marginTop: "0",
  width: "100%"
};

const labelStyle = {
  color: "black",fontWeight:"bold",fontSize:"95%"
}

const inputStyle = {background: "white",marginLeft:"0px",width:"100%"}

 export const MaternityCalculator = ():JSX.Element=>{

  const [inputState,setInputState] = useState<InputState>({
      date:new Date().getFullYear()+"-01-01"
  });
  

  return (
    <Paper
      className="myinput"
      style={{
        width: "90%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginLeft: "20px",
        marginTop: "20px",
        background: "#F2F2F7",
      }}
    >
   

      <TextField
        type="date"
        size="small"
        style={{...inputStyle}}
        label="Expected date of birth"
        error={!isValidDate(inputState.date)}
        InputLabelProps={{
          shrink: true,
          style: labelStyle,
        }}
        value={inputState?.date}
      //  value={inputState.date}
        onChange={e => {

          inputState!.date=e.target.value
          setInputState({...inputState})

        }}
        //error={ErrorInputState.date !== ""}
       helperText=""
        FormHelperTextProps={{
         style: errorStyle,
        }}
      />
    <Box>
      <Output props={inputState} />
    </Box>
    </Paper>
  );
};
export const currencyFormat = (num: number): string => {

  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const roundUpAll = (original: number): number => {
  const tempOr = original.toString();

  let value;
  if (tempOr.indexOf(".") === -1) return original;
  else {
    value = tempOr + "00";
  }
  let up = false;
  for (let i = value.indexOf(".") + 3; i < value.length; i++) {
    const d = value.charAt(i);
    if (d !== "0") {
      up = true;
      break;
    }
  }
  const digits = value.split(".")[1];
  if (up && digits[1] === "9" && digits[0] === "9") {
    return Math.round(original);
  } else if (up && digits[1] === "9") {
    return parseFloat(value.split(".")[0] + "." + (parseInt(digits[0]) + 1).toString());
  } else if (up) {
    return parseFloat(value.split(".")[0] +"." + digits[0] +  (parseInt(digits[1]) + 1).toString());
  } else {
    return original;
  }
};

export const isValidDate = (date: string): boolean => {
  return date !== "" && !isNaN(new Date(date).getTime());
};
