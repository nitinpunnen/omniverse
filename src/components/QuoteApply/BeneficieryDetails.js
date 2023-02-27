import React from "react";
import "@aws-amplify/ui-react/styles.css";
import TextField from '@mui/material/TextField';
import { Button, Flex } from "@aws-amplify/ui-react";
import { useState } from "react";
import { API } from "aws-amplify";

const BeneficieryDetails = () => {
    let [userAttrs, setUserAttrs] = useState({});

    async function upsertUser() {
        const metadataJson = {
            "Attributes": userAttrs
        }
        console.log(metadataJson)

        const response = await API.post('omniversApi', '/api/upsertUser', {
            headers: {
                'Content-Type': 'application/json',
            },
            response: true,
            body: metadataJson
        });
        console.log(response)
    }

    const handleFormEdit = (event) => {
        setUserAttrs({ ...userAttrs, [event.target.name]: event.target.value });
    }

    return (
        <Flex
            direction={{ base: 'row', large: 'row' }}
            width="80%"
            style={{ margin: "30px auto", justifyContent: 'space-between', height: '48px', alignItems: 'center' }}>
            <TextField fullWidth name="firstName" placeholder="First Name" variant="outlined" color="success" value={userAttrs.firstName || ''} onChange={handleFormEdit} />
            <TextField fullWidth name="lastName" placeholder="Last Name" variant="outlined" color="success" value={userAttrs.lastName || ''} onChange={handleFormEdit} />

        </Flex>
    );
};

export default BeneficieryDetails;