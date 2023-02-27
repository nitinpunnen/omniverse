import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { API } from 'aws-amplify';
import {
    Button,
    Flex,
    Table, TableBody, TableCell, TableHead, TableRow,
} from '@aws-amplify/ui-react';
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SingleUserAttributes from "./SingleUserAttributes";

const ShowAllQuotes = () => {
    let [customers, setCustomers] = useState([]);
    const [showCustomerDetails, setShowCustomerDetails] = React.useState(false);
    const [userId, setUserId] = useState(0);

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        const response = await API.get('omniversApi', '/api/searchUser', {
            headers: {},
            response: true
        });
        const customers = response.data;
        setCustomers(customers)
    }

    function showSelectedRow(userId) {
        setUserId(userId);
        setShowCustomerDetails(true);
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
                        <TableCell as="th">First Name</TableCell>
                        <TableCell as="th">Last Name</TableCell>
                        <TableCell as="th">Preferred Language</TableCell>
                        <TableCell as="th">Date of Birth</TableCell>
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
                    <SingleUserAttributes userId={userId} customers={customers} />
                    <Button variant='outlined' onClick={() => setShowCustomerDetails(false)}>Close</Button>
                </Flex>}
        </Flex>
    );
};

export default ShowAllQuotes;