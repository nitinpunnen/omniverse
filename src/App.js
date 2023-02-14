import {
    Flex, Heading,
    View,
    withAuthenticator
} from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import { createTheme, ThemeProvider, Button } from '@mui/material';
import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import AssembleDocuments from "./components/AssembleDocuments/AssembleDocuments";
import AuditCompliance from "./components/AuditCompliance/AuditCompliance";
import FileManager from "./components/FileManager/FileManager";
import Home from "./components/Home/Home";


const App = ({ signOut }) => {
    const appTheme = createTheme({
        typography: {
            fontFamily: [
                'Roboto',
                'Arial',
                'Montserrat',
                'Helvetica Neue',
            ].join(','),
        },
    });

    return (
        <ThemeProvider theme={appTheme}>
            <View className="App">
                <BrowserRouter>
                    <Flex
                        direction={{ base: 'row', large: 'row' }}
                        width="100%"
                        style={{ backgroundColor: '#232F3E', minHeight: '120px', color: '#fff' }}
                    >
                        <Flex
                            direction={{ base: 'row', large: 'row' }}
                            width="80%"
                            style={{ color: '#fff', margin: '0 auto', alignItems: "center" }}>
                            <Heading level={3} style={{ flexGrow: 3, color: "white" }}>Omniverse</Heading>
                            <Flex
                                direction={{ base: 'row'}}
                                style={{ alignItems: "center", margin: "0 auto" }}
                            >
                                <Link className="Navbar-Item" to="/">Home</Link>
                                <Link className="Navbar-Item" to="/uploadFiles">Manage Files</Link>
                                <Link className="Navbar-Item" to="/auditCompliance">Audit & Compliance</Link>
                                <Link className="Navbar-Item" to="/assemble">Assemble</Link>
                                <Button variant="contained" style={{ width: '120px' }}>Register</Button>
                                <Button variant="outlined" style={{ width: '120px' }}>Sign In</Button>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/auditCompliance" element={<AuditCompliance />} />
                        <Route exact path="/uploadFiles" element={<FileManager />} />
                        <Route exact path="/assemble" element={<AssembleDocuments />} />
                    </Routes>
                </BrowserRouter>
            </View>
        </ThemeProvider>
    );
};

export default withAuthenticator(App);