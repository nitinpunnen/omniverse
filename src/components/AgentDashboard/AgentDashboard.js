import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Text, Flex } from '@aws-amplify/ui-react';
import "./AgentDashboard.css";
import Cases from './Cases/Cases';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function AgentDashboard() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Flex
            direction={{ base: 'column', large: 'column' }}
            padding="1rem"
            width="80%"
            style={{ display: "block", margin: "10px auto" }}
        >
            <Text style={{ flexGrow: 3, color: "#F56600", fontSize: "24px", marginBottom: "20px" }}>Dashboard</Text>
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab className="vertical-tab" label="Cases" {...a11yProps(0)} />
                    <Tab className="vertical-tab" label="Commisions" {...a11yProps(1)} />
                    <Tab className="vertical-tab" label="Forms & Applications" {...a11yProps(2)} />
                    <Tab className="vertical-tab" label="Help Center" {...a11yProps(3)} />
                    <Tab className="vertical-tab" label="Marketing" {...a11yProps(4)} />
                    <Tab className="vertical-tab" label="Products" {...a11yProps(5)} />
                    <Tab className="vertical-tab" label="Reports" {...a11yProps(6)} />
                </Tabs>
                <TabPanel className="vertical-tab-panel" value={value} index={0}>
                    <Cases/>
                </TabPanel>
                <TabPanel className="vertical-tab-panel" value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel className="vertical-tab-panel" value={value} index={2}>
                    Item Three
                </TabPanel>
                <TabPanel className="vertical-tab-panel" value={value} index={3}>
                    Item Four
                </TabPanel>
                <TabPanel className="vertical-tab-panel" value={value} index={4}>
                    Item Five
                </TabPanel>
                <TabPanel className="vertical-tab-panel" value={value} index={5}>
                    Item Six
                </TabPanel>
                <TabPanel className="vertical-tab-panel" value={value} index={6}>
                    Item Seven
                </TabPanel>
            </Box>
        </Flex>
    );
}