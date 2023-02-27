import React from "react";
import "@aws-amplify/ui-react/styles.css";
import TextField from '@mui/material/TextField';
import { Flex } from "@aws-amplify/ui-react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from "react-i18next";

const PersonalDetails = (props) => {
    let userAttrs = props.userAttrs;
    const { t, i18n } = useTranslation();

    const handleFormEdit = (event) => {
        userAttrs[event.target.name] = event.target.value;
    }

    const handleDateEdit = (fieldName, fieldValue) => {
        console.log(fieldName, "=", fieldValue)
        userAttrs[fieldName] = fieldValue;
    }

    return (
        <Flex
            direction={{ base: 'column', large: 'column' }}>
            <span className="page-intro">{t('personaldetails.intro')}</span>
            <Flex
                direction={{ base: 'column', large: 'column' }}
                className="input-form">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label={t('personaldetails.dob')}
                        inputFormat="MM/DD/YYYY"
                        value={userAttrs.birthday}
                        onChange={(newValue) => {
                            handleDateEdit("birthday", newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <TextField name="addressLine1" label={t('personaldetails.address1')} variant="outlined" color="success" value={userAttrs.addressLine1} onChange={handleFormEdit} />
                <TextField name="addressLine2" label={t('personaldetails.address2')} variant="outlined" color="success" value={userAttrs.addressLine2} onChange={handleFormEdit} />
                <TextField name="city" label={t('personaldetails.city')} variant="outlined" color="success" value={userAttrs.city} onChange={handleFormEdit} />
                <Flex direction={{ base: 'row', large: 'row' }} style={{ justifyContent: "space-between" }}>
                    <TextField fullWidth name="state" label={t('personaldetails.state')} variant="outlined" color="success" value={userAttrs.state} onChange={handleFormEdit} />
                    <TextField fullWidth name="postalCode" label={t('personaldetails.postalCode')} variant="outlined" color="success" value={userAttrs.postalCode} onChange={handleFormEdit} />
                </Flex>
                <TextField name="socialSecurity" label={t('personaldetails.ssn')} type="password" variant="outlined" color="success" value={userAttrs.socialSecurity} onChange={handleFormEdit} />
                <TextField name="usResidentialStatus" label={t('personaldetails.usresidentialStatus')} variant="outlined" color="success" value={userAttrs.usResidentialStatus} onChange={handleFormEdit} />
                <TextField select name="extremeSports" label={t('personaldetails.extremeSports')} variant="outlined" color="success" value={userAttrs.extremeSports} onChange={handleFormEdit} >
                    <MenuItem key="Yes" value="Yes">Yes</MenuItem>
                    <MenuItem key="No" value="No">No</MenuItem>
                </TextField>
                <Flex direction={{ base: 'row', large: 'row' }} style={{ justifyContent: "space-between" }}>
                    <TextField fullWidth name="weight" label={t('personaldetails.weight')} variant="outlined" color="success" value={userAttrs.weight} onChange={handleFormEdit} />
                    <TextField fullWidth name="height" label={t('personaldetails.height')} variant="outlined" color="success" value={userAttrs.height} onChange={handleFormEdit} />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default PersonalDetails;