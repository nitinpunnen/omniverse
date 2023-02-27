import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { API } from 'aws-amplify';
import {
    Button,
    Flex,
    Table, TableBody, TableCell, TableHead, TableRow,
} from '@aws-amplify/ui-react';
import SingleUserAttributes from "./SingleUserAttributes";
import { useTranslation } from "react-i18next";

const ShowAllQuotes = () => {
    let [customers, setCustomers] = useState([]);
    let [userAttrs, setUserAttrs] = useState({});
    const [showCustomerDetails, setShowCustomerDetails] = React.useState(false);
    const [userId, setUserId] = useState(0);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        fetchUsers();
    }, []);

    function showSelectedRow(userId) {
        let userAttrs = customers.filter(customer => customer.userId === userId)[0];
        setUserAttrs(userAttrs);
        console.log("ShowAllQuotes - userAttrs ", userAttrs)
        setShowCustomerDetails(true);
    }

    async function fetchUsers() {
        const response = await API.get('omniversApi', '/api/searchUser', {
            headers: {},
            response: true
        });
        const customers = response.data;
        setCustomers(customers)
    }

    return (
        <Flex
            direction={{ base: 'column', large: 'column' }}
            padding="1rem"
            width="80%"
            style={{ display: "block", margin: "10px auto" }}
        >
            {!showCustomerDetails && <Table
                className="upload-table"
                caption=""
                highlightOnHover="true">
                <TableHead>
                    <TableRow>
                        <TableCell as="th">{t('preferences.firstName')}</TableCell>
                        <TableCell as="th">{t('preferences.lastName')}</TableCell>
                        <TableCell as="th">{t('preferences.preferredLanguage')}</TableCell>
                        <TableCell as="th">{t('preferences.dob')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.map((item, index) => {
                        return <TableRow key={index} onClick={() => showSelectedRow(item.userId)}>
                            <TableCell>
                                {item.firstName}
                            </TableCell>
                            <TableCell>
                                {item.lastName}
                            </TableCell>
                            <TableCell>
                                {item.preferredLanguage}
                            </TableCell>
                            <TableCell>
                                {item.birthday}
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>}
            {showCustomerDetails &&
                <Flex direction={{ base: 'column', large: 'column' }}>
                    <SingleUserAttributes userAttrs={userAttrs} />
                    <Flex direction={{ base: 'row', large: 'row' }} style={{ alignItems: "center", justifyContent: "center" }}>
                        <Button variant='outlined' onClick={() => setShowCustomerDetails(false)}>Close</Button>
                    </Flex>
                </Flex>}
        </Flex>
    );
};

export default ShowAllQuotes;