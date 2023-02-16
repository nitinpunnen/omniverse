import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Text, Flex } from '@aws-amplify/ui-react';
import NameDetails from './NameDetails';
import HeightWeightDetails from './HeightWeightDetails';
import SubstanceUsageDetails from './SubstanceUsageDetails';
import HealthDetails from './HealthDetails';
import GenderDetails from './GenderDetails';
import DateofBirthDetails from './DateofBirthDetails';
import './QuoteApply.css'

const steps = ['Your Name', 'Gender', 'Your Health', 'Substance Use', 'Height and Weight', 'Date of Birth', 'Select your Policy Type'];

export default function QuoteApply() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Flex
            direction={{ base: 'column', large: 'column' }}
            padding="1rem"
            width="80%"
            style={{ display: "block", margin: "10px auto" }}
        >
            <Text style={{ flexGrow: 3, color: "#F56600", fontSize: "24px", marginBottom: "20px" }}>Quote & Apply</Text>
            <Box sx={{ width: '100%' }}>
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
                    {activeStep === 0 && <NameDetails />}
                    {activeStep === 1 && <GenderDetails />}
                    {activeStep === 2 && <HealthDetails />}
                    {activeStep === 3 && <SubstanceUsageDetails />}
                    {activeStep === 4 && <HeightWeightDetails />}
                    {activeStep === 5 && <DateofBirthDetails />}
                    {activeStep === 6 && <NameDetails />}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, margin: '10px 0' }}>
                        <Button color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack} sx={{ mr: 1 }}>
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {activeStep < steps.length - 1 && <Button onClick={handleNext}>
                            Next
                        </Button>}
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
}