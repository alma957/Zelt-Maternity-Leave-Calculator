import { Box, Fade, IconButton,  Typography } from "@mui/material";
import { InputState,OutputState,IconProps,payPeriodMapping } from "./variables";
import { isValidDate,currencyFormat,roundUpAll } from "./maternityCalculator";

import { useState } from "react";

import { AddCircle } from "@mui/icons-material";
const marginLeft={marginLeft:"10px",marginTop:"7px"}


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
        earlieastLeaveifSick:false,
        earliestLeave:false,
        deadlineNotification:false,
        maternityPayPeriod:false,
        latestDateToJoin:false
    });
    const data = props as InputState
   



    return <>
<Box>
 <Box sx={{ boxShadow: 3,backgroundColor:"white",marginTop:"0px",padding:"0px",borderRadius:"10px",justifyContent:"space-between"  }}  style={hor}>


        
        <Typography style={marginLeft} >

         Latest date for the employee to start working for the employer in order to be entitled to Statutory Maternity Pay: <b>{formatDate(new Date(subtractDays(new Date(data.date).getTime(),40*7)).toString())} </b>

        </Typography>
        <IconButton sx={{color:"black"}} onClick={(e)=>{
           outputState.latestDateToJoin=!outputState.latestDateToJoin
           SetOutputState({...outputState})
        }}>
            <AddCircle/>
         </IconButton>
    </Box>
    <Fade in={outputState.latestDateToJoin} unmountOnExit><Box><Typography style={marginLeft} > To be eligible for maternity pay, an employee must have been continuosly employed for 26 weeks before the end of the qualifying week which is 15 weeks before the expected due date. Effectively, 41 weeks before the due date</Typography> </Box></Fade>
    </Box>


    <Box>
    <Box sx={{ boxShadow: 3,backgroundColor:"white",marginTop:"0px",padding:"0px",borderRadius:"10px",justifyContent:"space-between" }}  style={hor}>


        
        <Typography style={marginLeft} >

         Deadline for the employee to notify the employer that she is pregant and wants to take maternity leave: <b>{formatDate(new Date(subtractDays(new Date(data.date).getTime(),15*7)).toString())} </b>
        </Typography>
        <IconButton sx={{color:"black"}} onClick={(e)=>{
           outputState.deadlineNotification=!outputState.deadlineNotification
           SetOutputState({...outputState})
        }}>
            <AddCircle/>
         </IconButton>
    </Box>
    <Fade in={outputState.deadlineNotification} unmountOnExit><Box><Typography style={marginLeft} > An employee must let her employer know at least 15 weeks in advance that she intends to take maternity leave as well as the expected week of childbirth (submitted on a form MAT B1) and the intended maternity leave start date</Typography> </Box></Fade>

       

    </Box>
    <Box>
    <Box sx={{ boxShadow: 3,backgroundColor:"white",marginTop:"0px",padding:"0",borderRadius:"10px",justifyContent:"space-between"  }}  style={hor}>


        
        <Typography style={marginLeft} >

         Maternity pay period earnings calculation: <b>{formatDate(new Date(subtractDays(new Date(data.date).getTime(),23*7)).toString())} - {formatDate(new Date(subtractDays(new Date(data.date).getTime(),15*7)).toString())} </b>
        </Typography>
        <IconButton sx={{color:"black"}} onClick={(e)=>{
           outputState.maternityPayPeriod=!outputState.maternityPayPeriod
           SetOutputState({...outputState})
        }}>
            <AddCircle/>
         </IconButton>
    </Box>
    <Fade in={outputState.maternityPayPeriod} unmountOnExit><Box><Typography style={marginLeft} > Maternity pay is calculated by taking the average weekly pay over the period above. For the first 6 weeks, the employer must pay 90% of the employee's average weekly earnings. For the remaining 33 weeks, the employer needs to pay the minimum between 90% of the employee's average weekly earnings and £156.66 per week</Typography> </Box></Fade>

       
    </Box>
<Box>
    <Box sx={{ boxShadow: 3,backgroundColor:"white",marginTop:"0px",padding:"0",borderRadius:"10px",justifyContent:"space-between"  }}  style={hor}>


        
        <Typography style={marginLeft} >

         Earliest date to start maternity leave: <b>{formatDate(new Date(subtractDays(new Date(data.date).getTime(),12*7,0)).toString())} </b>
        </Typography>
        <IconButton sx={{color:"black"}} onClick={(e)=>{
           outputState.earliestLeave=!outputState.earliestLeave
           SetOutputState({...outputState})
        }}>
            <AddCircle/>
         </IconButton>
    </Box>
    <Fade in={outputState.earliestLeave} unmountOnExit><Box><Typography style={marginLeft} > This is the earliest date an employee can start her maternity leave</Typography> </Box></Fade>

       
    </Box>
    <Box>
    <Box sx={{ boxShadow: 3,backgroundColor:"white",marginTop:"0px",padding:"0px",borderRadius:"10px",justifyContent:"space-between"  }}  style={hor}>
     
        <Typography style={marginLeft} >

         Maternity leave automatic trigger if sick: <b>{formatDate(new Date(subtractDays(new Date(data.date).getTime(),5*7,0)).toString())} </b>
        </Typography>
        <IconButton sx={{color:"black"}} onClick={(e)=>{
           outputState.earlieastLeaveifSick=!outputState.earlieastLeaveifSick
           SetOutputState({...outputState})
        }}>
            <AddCircle/>
         </IconButton>
    </Box>
    <Fade in={outputState.earlieastLeaveifSick} unmountOnExit><Box><Typography style={marginLeft} > The maternity period starts automatically if the employee is absent from work because of a pregancy related illness on or after this date </Typography> </Box></Fade>

       
    </Box>
    </>

}