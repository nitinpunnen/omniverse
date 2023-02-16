import React from "react";
import "@aws-amplify/ui-react/styles.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Flex } from '@aws-amplify/ui-react';

const NameDetails = () => {
    return (
        <Flex
            direction={{ base: 'row', large: 'row' }}
            width="80%"
            style={{ margin: "30px auto", justifyContent: 'space-between', height: '48px', alignItems: 'center' }}>
            <TextField fullWidth id="firstName" placeholder="First Name" variant="outlined" color="success" />
            <TextField fullWidth id="lastName" placeholder="Last Name" variant="outlined" color="success" />
        </Flex>
    );
};

export default NameDetails;