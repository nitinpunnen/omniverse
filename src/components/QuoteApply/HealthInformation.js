import { Flex } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import React from "react";
import { useTranslation } from "react-i18next";

const HealthInformation = (props) => {
    let userAttrs = props.userAttrs;
    const { t, i18n } = useTranslation();

    const handleFormEdit = (event) => {
        userAttrs[event.target.name] = event.target.value;
    }

    return (
        <Flex
            direction={{ base: 'column', large: 'column' }}>
            <span className="page-intro">{t('health.intro')}</span>
            <Flex
                direction={{ base: 'column', large: 'column' }}
                className="input-form">
                <TextField select name="tobaccoUser" label={t('health.tobaccoUser')} variant="outlined" color="success" value={userAttrs.tobaccoUser} onChange={handleFormEdit} >
                    <MenuItem key="Yes" value="Yes">Yes</MenuItem>
                    <MenuItem key="No" value="No">No</MenuItem>
                </TextField>
                <TextField name="tobaccoUseFrequency" label={t('health.tobaccoQuantity')} variant="outlined" color="success" value={userAttrs.tobaccoUseFrequency} onChange={handleFormEdit} />
                <TextField select name="drugUser" label={t('health.drugUser')} variant="outlined" color="success" value={userAttrs.drugUser} onChange={handleFormEdit} >
                    <MenuItem key="Yes" value="Yes">Yes</MenuItem>
                    <MenuItem key="No" value="No">No</MenuItem>
                </TextField>
                <TextField name="drugUseFrequency" label={t('health.drugQuantity')} variant="outlined" color="success" value={userAttrs.drugUseFrequency} onChange={handleFormEdit} />
                <TextField select name="alcoholUser" label={t('health.alcoholUser')} variant="outlined" color="success" value={userAttrs.alcoholUser} onChange={handleFormEdit} >
                    <MenuItem key="Yes" value="Yes">Yes</MenuItem>
                    <MenuItem key="No" value="No">No</MenuItem>
                </TextField>
                <TextField name="alcoholUseFrequency" label={t('health.alcoholQuantity')} variant="outlined" color="success" value={userAttrs.alcoholUseFrequency} onChange={handleFormEdit} />
            </Flex>
        </Flex>
    );
};

export default HealthInformation;