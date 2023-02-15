import * as React from 'react';
import { Flex, Text } from '@aws-amplify/ui-react';
import EmploymentGrowth from './EmploymentGrowth/EmploymentGrowth';
import { Grid } from '@mui/material';
import '../AgentDashboard.css';
import ProductionLine from './ProductionLine/ProductionLine';

export default function Cases() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Flex
            direction={{ base: 'column', large: 'column' }}
            style={{ display: "block" }}
        >
            <Text style={{ flexGrow: 3, color: "#000", fontSize: "20px", marginBottom: "20px" }}>Cases</Text>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <EmploymentGrowth />
                </Grid>
                <Grid item xs={4}>
                    <ProductionLine />
                </Grid>                
            </Grid>
            
        </Flex>
    );
}