import {
    Flex, Heading,
    View,
    withAuthenticator
} from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import { createTheme, ThemeProvider, Button, Menu, MenuItem, Avatar } from '@mui/material';
import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import AssembleDocuments from "./components/AssembleDocuments/AssembleDocuments";
import AuditCompliance from "./components/AuditCompliance/AuditCompliance";
import FileManager from "./components/FileManager/FileManager";
import Home from "./components/Home/Home";
import QuoteApply from "./components/QuoteApply/QuoteApply";
import AgentDashboard from "./components/AgentDashboard/AgentDashboard";

const App = ({ signOut, user }) => {
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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(anchorEl);

    const [anchorAvatar, setAnchorAvatar] = React.useState(null);
    const avatarOpen = Boolean(anchorAvatar);
    
    const handleAvatar = (event) => {
        setAnchorAvatar(event.currentTarget);
    };

    const handleAvatarClose = () => {
        setAnchorAvatar(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
   

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
                                direction={{ base: 'row' }}
                                style={{ alignItems: "center", margin: "0 auto" }}
                            >
                                <Link className="Navbar-Item" to="/">HOME</Link>
                                <Link className="Navbar-Item" to="/dashboard">DASHBOARD</Link>
                                <Link className="Navbar-Item" to="/quoteApply">QUOTE & APPLY</Link>
                                <Button className="Navbar-Item" id="basic-button"
                                    aria-controls={menuOpen ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={menuOpen ? 'true' : undefined}
                                    onClick={handleClick}>Documents</Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={menuOpen}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <Link to="/uploadFiles">Manage Files</Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <Link to="/auditCompliance">Audit & Compliance</Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <Link to="/assemble">Assemble</Link>
                                    </MenuItem>
                                </Menu>
                                {user.username && <div>
                                    <Button aria-controls={avatarOpen ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={avatarOpen ? 'true' : undefined}
                                        onClick={handleAvatar}>
                                        <Avatar
                                            alt="User"
                                            src="./assets/avatar.png"
                                            sx={{ width: 32, height: 32 }}
                                        />
                                    </Button>
                                    <Menu
                                        id="avatar-menu"
                                        anchorEl={anchorAvatar}
                                        open={avatarOpen}
                                        onClose={handleAvatarClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem>Welcome {user.username}</MenuItem>
                                        <MenuItem onClick={handleAvatarClose}>
                                            <Button onClick={signOut}>Sign Out</Button>
                                        </MenuItem>                                        
                                    </Menu>
                                    </div>}
                                {!user.username && <Button variant="outlined" style={{ width: '120px' }}>Sign In</Button>}
                            </Flex>
                        </Flex>
                    </Flex>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/dashboard" element={<AgentDashboard />} />
                        <Route exact path="/quoteApply" element={<QuoteApply />} />
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