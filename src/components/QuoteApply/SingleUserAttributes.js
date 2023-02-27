import "@aws-amplify/ui-react/styles.css";
import Grid from '@mui/material/Grid';
import React, { useState, useEffect } from "react";
import './QuoteApply.css';
import { useTranslation } from "react-i18next";

const SingleUserAttributes = (props) => {
    let userAttrs = props.userAttrs;
    const { t, i18n } = useTranslation();
    console.log("SingleUserAttributes - userAttrs ", userAttrs)

    // useEffect(() => {
    //     showSelectedRow(userId);
    // }, []);

    return (
        <Grid container spacing={1} className="user-details-grid">
            <Grid className="attr-value" item xs={12}><span>{t('quoteapply.preferences')}</span></Grid>
            <Grid className="attr-name" item xs={6}><span>{t('preferences.firstName')}:</span></Grid>
            <Grid className="attr-value" item xs={6}><span>{userAttrs.firstName}</span></Grid>
            <Grid className="attr-name" item xs={6}><span>{t('preferences.lastName')}:</span></Grid>
            <Grid className="attr-value" item xs={6}><span>{userAttrs.lastName}</span></Grid>
            <Grid className="attr-name" item xs={6}><span>{t('preferences.preferredLanguage')}:</span></Grid>
            <Grid className="attr-value" item xs={6}><span>{userAttrs.preferredLanguage}</span></Grid>
            <Grid className="attr-value" item xs={12}><span>{t('quoteapply.personaldetails')}</span></Grid>
            <Grid className="attr-name" item xs={6}><span>{t('personaldetails.dob')}:</span></Grid>
            <Grid className="attr-value" item xs={6}><span>{userAttrs.birthday}</span></Grid>
            <Grid className="attr-name" item xs={6}><span>{t('personaldetails.address1')}:</span></Grid>
            <Grid className="attr-value" item xs={6}><span>{userAttrs.addressLine1}</span></Grid>
            <Grid className="attr-name" item xs={6}><span>{t('personaldetails.address2')}:</span></Grid>
            <Grid className="attr-value" item xs={6}><span>{userAttrs.addressLine2}</span></Grid>
            <Grid className="attr-name" item xs={6}><span>{t('personaldetails.city')}:</span></Grid>
            <Grid className="attr-value" item xs={6}><span>{userAttrs.city}</span></Grid>
            <Grid className="attr-name" item xs={6}><span>{t('personaldetails.state')}:</span></Grid>
            <Grid className="attr-value" item xs={6}><span>{userAttrs.state}</span></Grid>
            <Grid className="attr-name" item xs={6}><span>{t('personaldetails.postalCode')}:</span></Grid>
            <Grid className="attr-value" item xs={6}><span>{userAttrs.postalCode}</span></Grid>
            <Grid className="attr-name" item xs={6}><span>{t('personaldetails.height')}:</span></Grid>
            <Grid className="attr-value" item xs={6}><span>{userAttrs.height}</span></Grid>
            <Grid className="attr-name" item xs={6}><span>{t('personaldetails.weight')}:</span></Grid>
            <Grid className="attr-value" item xs={6}><span>{userAttrs.weight}</span></Grid>
            <Grid className="attr-value" item xs={12}><span>{t('quoteapply.health')}</span></Grid>
            <Grid className="attr-name" item xs={6}><span>{t('health.tobaccoUser')}:</span></Grid>
            <Grid className="attr-value" item xs={6}><span>{userAttrs.tobaccoUser}</span></Grid>
            <Grid className="attr-name" item xs={6}><span>{t('health.tobaccoQuantity')}:</span></Grid>
            <Grid className="attr-value" item xs={6}><span>{userAttrs.tobaccoUseFrequency}</span></Grid>
            <Grid className="attr-name" item xs={6}><span>{t('health.drugUser')}:</span></Grid>
            <Grid className="attr-value" item xs={6}><span>{userAttrs.drugUser}</span></Grid>
            <Grid className="attr-name" item xs={6}><span>{t('health.drugQuantity')}:</span></Grid>
            <Grid className="attr-value" item xs={6}><span>{userAttrs.drugUseFrequency}</span></Grid>
            <Grid className="attr-name" item xs={6}><span>{t('health.alcoholUser')}:</span></Grid>
            <Grid className="attr-value" item xs={6}><span>{userAttrs.alcoholUser}</span></Grid>
            <Grid className="attr-name" item xs={6}><span>{t('health.alcoholQuantity')}:</span></Grid>
            <Grid className="attr-value" item xs={6}><span>{userAttrs.alcoholUseFrequency}</span></Grid>
        </Grid>
    );
};

export default SingleUserAttributes;