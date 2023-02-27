import { Flex, Text } from '@aws-amplify/ui-react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { API } from "aws-amplify";
import * as React from 'react';
import { useState } from "react";
import BankingDetails from './BankingDetails';
import BeneficieryDetails from './BeneficieryDetails';
import HealthInformation from './HealthInformation';
import PersonalDetails from './PersonalDetails';
import Preferences from './Preferences';
import './QuoteApply.css';
import ReviewSign from './ReviewSign';
import ShowAllQuotes from './ShowAllQuotes';

const steps = ['Preferences', 'Personal Details', 'Your Health', 'Review'];

export default function QuoteApply() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [showCustomer, setShowCustomer] = React.useState(false);
    let [userAttrs, setUserAttrs] = useState({});

    const handleNext = () => {
        handleSave();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSave = () => {
        if (userAttrs.hasOwnProperty('userId'))
            upsertUser("Update");
        else
            upsertUser('Create');
    };

    async function upsertUser(action) {
        const metadataJson = {
            "Action": action,
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
        userAttrs['userId'] = response.data
        console.log(userAttrs)
    }

    return (
        <Flex
            direction={{ base: 'column', large: 'column' }}
            padding="1rem"
            width="80%"
            style={{ display: "block", margin: "10px auto" }}
        >
            <Flex direction={{ base: 'row', large: 'row' }}>
                <Text style={{ flexGrow: 3, color: "#F56600", fontSize: "24px" }}>Quote & Apply</Text>
                {!showCustomer && <Button variant='outlined' onClick={() => setShowCustomer(true)}>View Customers</Button>}
                {showCustomer && <Button variant='outlined' onClick={() => setShowCustomer(false)}>Create a Quote</Button>}
            </Flex>
            {!showCustomer && <Box sx={{ width: '100%' }}>
                {/* <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper> */}
                <Box className="user-details">
                    {activeStep === 0 && <Preferences userAttrs={userAttrs} />}
                    {activeStep === 1 && <PersonalDetails userAttrs={userAttrs} />}
                    {activeStep === 2 && <HealthInformation userAttrs={userAttrs} />}
                    {activeStep === 3 && <ReviewSign userAttrs={userAttrs} />}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, margin: '10px 0', justifyContent: 'space-between' }}>
                        <Button color="inherit" variant='outlined'
                            disabled={activeStep === 0}
                            onClick={handleBack} sx={{ mr: 1 }}>
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {activeStep === 0 && <Button variant='outlined' onClick={handleSave} style={{ margin: "0 5px" }}>
                            Save
                        </Button>}
                        {activeStep === 0 && <Button variant='outlined' onClick={() => { handleNext(); }}>
                            Next
                        </Button>}
                        {activeStep > 0 && <Button variant='outlined' onClick={handleSave} style={{ margin: "0 5px" }}>
                            Save
                        </Button>}
                        {activeStep > 0 && activeStep < steps.length - 1 && <Button variant='outlined' onClick={() => { handleNext(); }}>
                            Next
                        </Button>}
                    </Box>
                </Box>
            </Box>}
            {showCustomer && <ShowAllQuotes></ShowAllQuotes>}
        </Flex>
    );
}