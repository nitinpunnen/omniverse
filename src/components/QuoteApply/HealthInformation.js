import { Flex } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import React from "react";

const HealthInformation = (props) => {
    let userAttrs = props.userAttrs;

    const handleFormEdit = (event) => {
        userAttrs[event.target.name] = event.target.value;
    }

    return (
        <Flex
            direction={{ base: 'column', large: 'column' }}>
            <span className="page-intro">Please provide your health information</span>
            <Flex
                direction={{ base: 'column', large: 'column' }}
                className="input-form">
                <TextField select name="tobaccoUser" label="Are you a tobacco user?" variant="outlined" color="success" value={userAttrs.tobaccoUser} onChange={handleFormEdit} >
                    <MenuItem key="Yes" value="Yes">Yes</MenuItem>
                    <MenuItem key="No" value="No">No</MenuItem>
                </TextField>
                <TextField name="tobaccoUseFrequency" label="How often do you use tobacco in day?" variant="outlined" color="success" value={userAttrs.tobaccoUseFrequency} onChange={handleFormEdit} />
                <TextField select name="drugUser" label="Do you use any restricted drugs?" variant="outlined" color="success" value={userAttrs.drugUser} onChange={handleFormEdit} >
                    <MenuItem key="Yes" value="Yes">Yes</MenuItem>
                    <MenuItem key="No" value="No">No</MenuItem>
                </TextField>
                <TextField name="drugUseFrequency" label="How often do you use drugs in a day?" variant="outlined" color="success" value={userAttrs.drugUseFrequency} onChange={handleFormEdit} />
                <TextField select name="alcoholUser" label="Do you consume alcohol?" variant="outlined" color="success" value={userAttrs.alcoholUser} onChange={handleFormEdit} >
                    <MenuItem key="Yes" value="Yes">Yes</MenuItem>
                    <MenuItem key="No" value="No">No</MenuItem>
                </TextField>
                <TextField name="alcoholUseFrequency" label="How many drinks do you have on average a week?" variant="outlined" color="success" value={userAttrs.alcoholUseFrequency} onChange={handleFormEdit} />
            </Flex>
        </Flex>
    );
};

export default HealthInformation;