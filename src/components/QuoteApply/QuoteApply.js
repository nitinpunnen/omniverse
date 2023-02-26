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
import './QuoteApply.css';
import ReviewSign from './ReviewSign';
import ShowQuoteDetails from './ShowQuoteDetails';

const steps = ['Personal Details', 'Your Health', 'Banking Information', 'Beneficiery', 'Review and Sign'];

export default function QuoteApply() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [showCustomer, setShowCustomer] = React.useState(false);
    let [userAttrs, setUserAttrs] = useState({});

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleCreate = () => {
        setActiveStep(0);
    };

    const handleInsert = () => {
        upsertUser("Create");
    };

    const handleUpdate = () => {
        upsertUser("Update");
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
        console.log(response)
    }

    return (
        <Flex
            direction={{ base: 'column', large: 'column' }}
            padding="1rem"
            width="80%"
            style={{ display: "block", margin: "10px auto" }}
        >
            <Text style={{ flexGrow: 3, color: "#F56600", fontSize: "24px", marginBottom: "20px" }}>Quote & Apply</Text>
            <Button onClick={() => setShowCustomer(true)}>Fetch</Button>
            {!showCustomer && <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <Box className="user-details">
                    {activeStep === 0 && <PersonalDetails userAttrs={userAttrs}/>}
                    {activeStep === 1 && <HealthInformation />}
                    {activeStep === 2 && <BankingDetails />}
                    {activeStep === 3 && <BeneficieryDetails />}
                    {activeStep === 4 && <ReviewSign />}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, margin: '10px 0', justifyContent: 'space-between' }}>
                        <Button color="inherit" variant='outlined'
                            disabled={activeStep === 0}
                            onClick={handleBack} sx={{ mr: 1 }}>
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {activeStep === 0 && <Button variant='outlined' onClick={handleInsert} style={{margin: "0 5px"}}>
                            Save
                        </Button>}
                        {activeStep === 0 && <Button variant='outlined' onClick={() => {handleInsert(); handleNext();}}>
                            Next
                        </Button>}
                        {activeStep > 0 && <Button variant='outlined' onClick={handleUpdate} style={{margin: "0 5px"}}>
                            Save
                        </Button>}
                        {activeStep > 0 && activeStep < steps.length - 1 && <Button variant='outlined' onClick={() => {handleUpdate(); handleNext();}}>
                            Next
                        </Button>}
                    </Box>
                </Box>
            </Box>}
            {showCustomer && <ShowQuoteDetails></ShowQuoteDetails>}
        </Flex>
    );
}