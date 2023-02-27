import React from "react";
import "@aws-amplify/ui-react/styles.css";
import TextField from '@mui/material/TextField';
import { Flex } from "@aws-amplify/ui-react";
import './QuoteApply.css';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from "react-i18next";

const Preferences = (props) => {
    let userAttrs = props.userAttrs;
    //userAttrs.preferredLanguage = 'en';
    const { t, i18n } = useTranslation();

    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.value);
        console.log(event.target.value)
        handleFormEdit(event);
    };

    const handleFormEdit = (event) => {
        userAttrs[event.target.name] = event.target.value;
    }

    return (
        <Flex
            direction={{ base: 'column', large: 'column' }}>
            <span className="page-intro">{t('preferences.intro')}</span>
            <Flex
                direction={{ base: 'column', large: 'column' }}
                className="input-form">
                <TextField select name="preferredLanguage" defaultValue="en"
                    label={t('preferences.preferredLanguage')} variant="outlined" color="success"
                    value={userAttrs.preferredLanguage} onChange={changeLanguage} >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="de">German</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="hn">Hindi</MenuItem>
                </TextField>
                <TextField required name="firstName" label={t('preferences.firstName')} variant="outlined" color="success" value={userAttrs.firstName} onChange={handleFormEdit} />
                <TextField required name="lastName" label={t('preferences.lastName')} variant="outlined" color="success" value={userAttrs.lastName} onChange={handleFormEdit} />
            </Flex>
        </Flex>
    );
};

export default Preferences;