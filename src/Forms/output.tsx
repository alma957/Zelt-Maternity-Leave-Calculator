import { Box, IconButton,  Typography } from "@mui/material";
import { InputState,OutputState,IconProps,payPeriodMapping } from "./variables";
import { isValidDate,currencyFormat,roundUpAll } from "./maternityCalculator";

import { useState } from "react";

import { AddCircle } from "@mui/icons-material";
const marginLeft={marginLeft:"5px"}


 export  const formatDate = (formatDate: string): string => {
    const split = formatDate.split(" ")
    return split[2]+" "+split[1] +" "+split[3]


  };

const dayMill = 3600*1000*24

const calculateDate = (date:number,control:number)=>{
    if(isNaN(date))
        return "Insert a valid date"
    let day = new Date(date).getDay()
    while(day!==control) {
        date+=dayMill
        day = new Date(date).getDay()

    }
    return date;
}
const subtractDays = (date:number,days:number,control:number=6):number|string=>{
    const d = date - days*dayMill
    return calculateDate(d,control)
}
const hor = {display:"flex",FlexDirection:"row",marginTop:"20px"}
export const Output = ({props}:any):JSX.Element=>{
    const [outputState,SetOutputState] = useState<OutputState>({
        earlieastLeaveifSick:"4 weeks before the expected birth date",
        earliestLeave:"11 weeks before the expected birth date",
        deadlineNotification:"15 weeks before the expected birth date",
        maternityPayPeriod:"8 weeks period before the dealine notification period",
        latestDateToJoin:"41 weeks before the expected date of birth"
    });
    const data = props as InputState
   



    return <>
 <Box sx={{ boxShadow: 3,backgroundColor:"white",marginTop:"0px",padding:"10px",borderRadius:"10px" }}  style={hor}>


        
        <Typography style={marginLeft} >

         Latest date to start working in order to qualify for SMP: <b>{formatDate(new Date(subtractDays(new Date(data.date).getTime(),40*7)).toString())} </b>
        </Typography>
    </Box>

    <Box sx={{ boxShadow: 3,backgroundColor:"white",marginTop:"0px",padding:"10px",borderRadius:"10px",justifyContent:"space-between" }}  style={hor}>


        
        <Typography style={marginLeft} >

         Deadline for employee to notify employer that she is pregant and wants to take maternity leave: <b>{formatDate(new Date(subtractDays(new Date(data.date).getTime(),15*7)).toString())} </b>
        </Typography>
       
    </Box>
    <Box sx={{ boxShadow: 3,backgroundColor:"white",marginTop:"0px",padding:"10px",borderRadius:"10px" }}  style={hor}>


        
        <Typography style={marginLeft} >

         Maternity pay period earnings calculation: <b>{formatDate(new Date(subtractDays(new Date(data.date).getTime(),23*7)).toString())} - {formatDate(new Date(subtractDays(new Date(data.date).getTime(),15*7)).toString())} </b>
        </Typography>
    </Box>

    <Box sx={{ boxShadow: 3,backgroundColor:"white",marginTop:"0px",padding:"10px",borderRadius:"10px" }}  style={hor}>


        
        <Typography style={marginLeft} >

         Earliest date to start maternity leave: <b>{formatDate(new Date(subtractDays(new Date(data.date).getTime(),12*7,0)).toString())} </b>
        </Typography>
    </Box>
    <Box sx={{ boxShadow: 3,backgroundColor:"white",marginTop:"0px",padding:"10px",borderRadius:"10px" }}  style={hor}>
     
        <Typography style={marginLeft} >

         Earliest date to start maternity leave if employee is sick: <b>{formatDate(new Date(subtractDays(new Date(data.date).getTime(),5*7,0)).toString())} </b>
        </Typography>
    </Box>
    </>

}