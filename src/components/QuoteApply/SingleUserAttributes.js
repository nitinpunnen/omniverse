import "@aws-amplify/ui-react/styles.css";
import Grid from '@mui/material/Grid';
import React, { useState, useEffect } from "react";

const SingleUserAttributes = (props) => {
    let [userAttrs, setUserAttrs] = useState({});
    let userId = props.userId;
    let customers = props.customers;

    useEffect(() => {
        showSelectedRow(userId);
    }, []);

    function showSelectedRow(userId) {
        let userAttrs = customers.filter(customer => customer.userId == userId)[0];
        setUserAttrs(userAttrs)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <span>First Name</span>
            </Grid>
            <Grid item xs={8}>
                <span>{userAttrs.firstName}</span>
            </Grid>
            <Grid item xs={4}>
                <span>Last Name</span>
            </Grid>
            <Grid item xs={8}>
                <span>{userAttrs.lastName}</span>
            </Grid>
        </Grid>
    );
};

export default SingleUserAttributes;