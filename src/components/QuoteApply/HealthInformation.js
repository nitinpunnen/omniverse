import { Flex } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import TextField from '@mui/material/TextField';
import React from "react";

const HealthInformation = (props) => {
    let userAttrs = props.userAttrs;

    const handleFormEdit = (event) => {
        userAttrs[event.target.name] = event.target.value;
    }

    return (
        <Flex
            direction={{ base: 'column', large: 'column' }}
            className="input-form">
            <TextField name="firstName" label="First Name" variant="outlined" color="success" value={userAttrs.firstName} onChange={handleFormEdit} />
            <TextField name="lastName" placeholder="Last Name" variant="outlined" color="success" value={userAttrs.lastName} onChange={handleFormEdit} />
            <TextField name="addressLine1" placeholder="Address Line 1" variant="outlined" color="success" value={userAttrs.addressLine1} onChange={handleFormEdit} />
            <TextField name="addressLine2" placeholder="Address Line 2" variant="outlined" color="success" value={userAttrs.addressLine2} onChange={handleFormEdit} />
            <TextField name="city" placeholder="City" variant="outlined" color="success" value={userAttrs.city} onChange={handleFormEdit} />
            <Flex direction={{ base: 'row', large: 'row' }}>
                <TextField name="state" placeholder="State" variant="outlined" color="success" value={userAttrs.state} onChange={handleFormEdit} />
                <TextField name="postalCode" placeholder="Postal Code" variant="outlined" color="success" value={userAttrs.postalCode} onChange={handleFormEdit} />
            </Flex>
        </Flex>
    );
};

export default HealthInformation;