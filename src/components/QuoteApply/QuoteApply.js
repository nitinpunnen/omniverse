import { Flex, Text } from '@aws-amplify/ui-react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { API } from "aws-amplify";
import * as React from 'react';
import { useState } from "react";
import HealthInformation from './HealthInformation';
import PersonalDetails from './PersonalDetails';
import Preferences from './Preferences';
import './QuoteApply.css';
import ReviewSign from './ReviewSign';
import ShowAllQuotes from './ShowAllQuotes';
import { useTranslation } from "react-i18next";
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

export default function QuoteApply() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [showCustomer, setShowCustomer] = React.useState(false);
    let [userAttrs, setUserAttrs] = useState({});
    const { t, i18n } = useTranslation();
    const steps = [t('quoteapply.preferences'), t('quoteapply.personaldetails'), t('quoteapply.health'), t('quoteapply.review')];

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

    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.value);
        console.log(event.target.value)
        handleFormEdit(event);
    };

    const handleFormEdit = (event) => {
        userAttrs[event.target.name] = event.target.value;
    }

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
            <Flex direction={{ base: 'row', large: 'row' }} style={{ marginBottom: "20px" }}>
                <Text style={{ flexGrow: 3, color: "#F56600", fontSize: "24px" }}>{t('quoteapply.title')}</Text>
                <TextField select name="preferredLanguage" defaultValue="en"
                    label={t('preferences.preferredLanguage')} variant="outlined" color="success"
                    value={userAttrs.preferredLanguage} onChange={changeLanguage} >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="de">German</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="hn">Hindi</MenuItem>
                </TextField>
                {!showCustomer && <Button variant='outlined' onClick={() => setShowCustomer(true)}>{t('quoteapply.viewcustomers')}</Button>}
                {showCustomer && <Button variant='outlined' onClick={() => setShowCustomer(false)}>{t('quoteapply.createquote')}</Button>}
            </Flex>
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
                    {activeStep === 0 && <Preferences userAttrs={userAttrs} />}
                    {activeStep === 1 && <PersonalDetails userAttrs={userAttrs} />}
                    {activeStep === 2 && <HealthInformation userAttrs={userAttrs} />}
                    {activeStep === 3 && <ReviewSign userAttrs={userAttrs} />}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, margin: '10px 0', justifyContent: 'space-between' }}>
                        <Button color="inherit" variant='outlined'
                            disabled={activeStep === 0}
                            onClick={handleBack} sx={{ mr: 1 }}>
                            {t('quoteapply.back')}
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {activeStep === 0 && <Button variant='outlined' onClick={handleSave} style={{ margin: "0 5px" }}>
                            {t('quoteapply.save')}
                        </Button>}
                        {activeStep === 0 && <Button variant='outlined' onClick={() => { handleNext(); }}>
                            {t('quoteapply.next')}
                        </Button>}
                        {activeStep > 0 && <Button variant='outlined' onClick={handleSave} style={{ margin: "0 5px" }}>
                            {t('quoteapply.save')}
                        </Button>}
                        {activeStep > 0 && activeStep < steps.length - 1 && <Button variant='outlined' onClick={() => { handleNext(); }}>
                            {t('quoteapply.next')}
                        </Button>}
                    </Box>
                </Box>
            </Box>}
            {showCustomer && <ShowAllQuotes></ShowAllQuotes>}
        </Flex>
    );
}