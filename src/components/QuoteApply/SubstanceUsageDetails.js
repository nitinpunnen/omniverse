import React from "react";
import "@aws-amplify/ui-react/styles.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const SubstanceUsageDetails = () => {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="firstName" label="Outlined" variant="outlined" />
            <TextField id="lastName" label="Filled" variant="filled" />
        </Box>
    );
};

export default SubstanceUsageDetails;