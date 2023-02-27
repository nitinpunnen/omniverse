import React from "react";
import "@aws-amplify/ui-react/styles.css";
import TextField from '@mui/material/TextField';
import { Flex } from "@aws-amplify/ui-react";
import './QuoteApply.css';
import MenuItem from '@mui/material/MenuItem';

const Preferences = (props) => {
    let userAttrs = props.userAttrs;

    const handleFormEdit = (event) => {
        userAttrs[event.target.name] = event.target.value;
    }

    return (
        <Flex
            direction={{ base: 'column', large: 'column' }}>
            <span className="page-intro">Let's get you a life insurance quote in seconds. Please provide your name and language preferences</span>
            <Flex
                direction={{ base: 'column', large: 'column' }}
                className="input-form">
                <TextField name="firstName" label="First Name" variant="outlined" color="success" value={userAttrs.firstName} onChange={handleFormEdit} />
                <TextField name="lastName" label="Last Name" variant="outlined" color="success" value={userAttrs.lastName} onChange={handleFormEdit} />
                <TextField select name="preferredLanguage" label="Preferred Language" variant="outlined" color="success" value={userAttrs.preferredLanguage} onChange={handleFormEdit} >
                    <MenuItem key="English" value="English">English</MenuItem>
                    <MenuItem key="German" value="German">German</MenuItem>
                    <MenuItem key="Spanish" value="Spanish">Spanish</MenuItem>
                </TextField>
            </Flex>
        </Flex>
    );
};

export default Preferences;