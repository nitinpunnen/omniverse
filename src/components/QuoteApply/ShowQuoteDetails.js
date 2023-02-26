import React, { useState } from "react";
import "@aws-amplify/ui-react/styles.css";
import { API } from 'aws-amplify';
import {
    Button, 
    Flex,
    Table, TableBody, TableCell, TableHead, TableRow,
} from '@aws-amplify/ui-react';
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShowQuoteDetails = () => {
    let [customers, setCustomers] = useState([]);

    async function fetchUsers() {
        const response = await API.get('omniversApi', '/api/searchUser', {
            headers: {},
            response: true
        });
        console.log(response)
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
            <Button variation="link" onClick={() => fetchUsers()}>
                <FontAwesomeIcon icon={faRotate} color="#232F3E" />
                <span>Sync</span>
            </Button>
            <Table
                    className="upload-table"
                    caption=""
                    highlightOnHover="true">
                    <TableHead>
                        <TableRow>
                            <TableCell as="th">First Name</TableCell>
                            <TableCell as="th">Last Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((item, index) => {
                            return <TableRow key={index}>
                                <TableCell>
                                    {item.firstName}
                                </TableCell>
                                <TableCell>
                                {item.lastName}
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
        </Flex>
    );
};

export default ShowQuoteDetails;