import React, {useState} from 'react';
import './AssembleDocuments.css';
import {
    Button,
    Expander,
    ExpanderItem,
    Flex,
    Heading,
    RadioGroupField,
    SelectField,
    Text,
    Radio
} from "@aws-amplify/ui-react";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import EditTextContent from "../dialogs/EditTextContent/EditTextContent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileExport, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {TextField} from "@aws-amplify/ui-react";
import SearchDocumentContent from "../dialogs/SearchDocumentContent/SearchDocumentContent";

const AssembleDocuments = () => {

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [searchDialogOpen, setSearchDialogOpen] = useState(false);
    const [selectedText, setSelectedText] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [documentAttributes, setDocumentAttributes] = useState({});
    const [clicked, setClicked] = useState(false);

    const handleEditedContent = () => {
        setEditDialogOpen(true);
    };

    const handleSearchDocumentContent = () => {
        setSearchDialogOpen(true);
    };

    const handleSelectedContent = () => {
        setSearchDialogOpen(false);
        setClicked(true);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    const handleSearchDialogClose = () => {
        setSearchDialogOpen(false);
    };

    const handleMouseUp = () => {
        console.log(`Selected text: ${window.getSelection().toString()}`);
        setSelectedText(window.getSelection().toString())
    };

    const handleFormEdit = (event) => {
        setDocumentAttributes({...documentAttributes, [event.target.name]: event.target.value});
    }

    return (
        <Flex
            direction={{base: 'column', large: 'column'}}
            padding="1rem"
            width="80%"
            style={{display: "block", margin: "10px auto"}}
            className="assemble-content"
        >
            <Dialog open={editDialogOpen} onClose={handleEditDialogClose} fullWidth={true} maxWidth={'xl'}>
                <DialogTitle>Edit Content</DialogTitle>
                <DialogContent>
                    <EditTextContent selectedText={selectedText}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditedContent}>Ok</Button>
                    <Button onClick={handleEditDialogClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={searchDialogOpen} onClose={handleSearchDialogClose} fullWidth={true} maxWidth={'xl'}>
                <DialogTitle>Search Document Content</DialogTitle>
                <DialogContent>
                    <SearchDocumentContent selectedText={selectedText}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSelectedContent}>Ok</Button>
                    <Button onClick={handleSearchDialogClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Text style={{flexGrow: 3, color: "#F56600", fontSize: "24px", marginBottom: "20px"}}>Assemble
                Documents</Text>
            <Flex
                direction={{base: 'row', large: 'row'}} width="100%" height="800px" minHeight="800px"
                style={{border: "1px solid lightgray", gap: "0"}}>
                <Flex
                    direction={{base: 'column'}} width="30%"
                    style={{backgroundColor: "#f9f9f9", fontSize: "0.9em", padding: "10px"}}>
                    <Flex
                        direction={{base: 'row'}} style={{padding: "10px 0", alignItems: "center"}}>
                        <Text>Select Document Type</Text>
                        <SelectField
                            label="Document Type" labelHidden
                            onChange={(e) => {
                                setDocumentAttributes({});
                                setDocumentType(e.target.value)
                            }}>
                            <option value=""></option>
                            <option value="employmentContract">Insurance Contract</option>
                            <option value="customDocument">Custom Document</option>
                        </SelectField>
                    </Flex>
                    {documentType === 'customDocument' && <Flex direction={{base: 'row'}}>
                        <Button onClick={handleSearchDocumentContent}>
                            <span>Search Document Content</span>
                        </Button>
                    </Flex>}                    
                    {documentType === 'employmentContract' &&
                        <Expander type="single"
                                  isCollapsible={true} height="700px" overflow="auto">
                            <Heading level={6} style={{textAlign: "center"}}>Insurance Contract</Heading>
                            <ExpanderItem title="General Information" value="generalInformation">
                                <Flex
                                    direction={{base: 'column'}} padding="10px 20px 10px 0" gap="5px">
                                    <TextField
                                        placeholder="Insurer Name" value={documentAttributes.InsurerName}
                                        onChange={handleFormEdit}
                                        label="Insurer Details" name="InsurerName"/>
                                    <TextField
                                        name="InsurerAddress" placeholder="Insurer address"
                                        value={documentAttributes.InsurerAddress}
                                        onChange={handleFormEdit}
                                    />
                                    <Flex
                                        direction={{base: 'row'}}>
                                        <TextField
                                            name="InsurerCity" placeholder="City"
                                            value={documentAttributes.InsurerCity}
                                            onChange={handleFormEdit}
                                        />
                                        <TextField
                                            name="InsurerPostalCode" placeholder="Postal Code"
                                            value={documentAttributes.InsurerPostalCode}
                                            onChange={handleFormEdit}
                                        />
                                    </Flex>
                                    <RadioGroupField
                                        label="Is the Insuree female or male"
                                        name="gender"
                                        direction="row"
                                        onChange={handleFormEdit}
                                    >
                                        <Radio value="Mr">Male</Radio>
                                        <Radio value="Mrs">Female</Radio>
                                    </RadioGroupField>
                                    <TextField
                                        placeholder="Insuree Name" value={documentAttributes.InsureeName}
                                        onChange={handleFormEdit}
                                        label="Insuree Details" name="InsureeName"/>
                                    <TextField
                                        name="InsureeAddress" placeholder="Insuree address"
                                        value={documentAttributes.InsureeAddress}
                                        onChange={handleFormEdit}
                                    />
                                    <Flex
                                        direction={{base: 'row'}}>
                                        <TextField
                                            name="InsureeCity" placeholder="City"
                                            value={documentAttributes.InsureeCity}
                                            onChange={handleFormEdit}
                                        />
                                        <TextField
                                            name="InsureePostalCode" placeholder="Postal Code"
                                            value={documentAttributes.InsureePostalCode}
                                            onChange={handleFormEdit}
                                        />
                                    </Flex>
                                </Flex>
                            </ExpanderItem>
                            <ExpanderItem title="Commencement of Insurance" value="commencementOfEmployment">
                                <Text>When should the relationship begin</Text>
                                <TextField
                                    name="InsureeStartDate" placeholder="Start Date"
                                    value={documentAttributes.InsureeStartDate}
                                    onChange={handleFormEdit}
                                />
                                <Text>How is the period of insurance defined</Text>
                                <RadioGroupField
                                    name="employmentPeriod"
                                    onChange={handleFormEdit}
                                >
                                    <Radio value="indefinite period of time">indefinite period of time</Radio>
                                    <Radio value="fixed term of time">fixed term of time</Radio>
                                    <Radio value="fixed by purpose">fixed by purpose</Radio>
                                </RadioGroupField>
                                <Text>How long is probationary period</Text>
                                <RadioGroupField
                                    name="probationaryPeriod"
                                    onChange={handleFormEdit}
                                >
                                    <Radio value="three months">three months</Radio>
                                    <Radio value="six months">six months</Radio>
                                </RadioGroupField>
                            </ExpanderItem>
                            <ExpanderItem title="Termination Terms" value="workingHours">
                                <Text>When should the relationship begin</Text>
                                <TextField
                                    name="workingHours" placeholder="Working Hours"
                                    value={documentAttributes.workingHours}
                                    onChange={handleFormEdit}
                                />
                                <Text>How much is the reasonable amount of overtime?</Text>
                                <TextField
                                    name="overtime" placeholder="Percentage overtime allowed"
                                    value={documentAttributes.overtime}
                                    onChange={handleFormEdit}
                                />
                            </ExpanderItem>
                        </Expander>}
                </Flex>
                {/*Pre Formatted Text Area*/}
                <Flex
                    direction={{base: 'column'}} width="70%" style={{borderLeft: "1px solid lightgrey"}}>
                    <Flex
                        direction={{base: 'row'}} width="100%" className='card-header'
                        style={{borderRadius: "0"}}>
                        <Text
                            style={{flexGrow: 3, color: "#1a1a1a", fontSize: "16px", padding: "0 10px"}}>Document
                            Content</Text>
                        <Button variation="link" className='card-button' onClick={handleEditedContent}>
                            <FontAwesomeIcon icon={faPenToSquare} color="#1a1a1a"/>
                            <span>Edit Content</span>
                        </Button>
                        <Button variation="link" className='card-button' onClick={handleEditedContent}>
                            <FontAwesomeIcon icon={faFileExport} color="#1a1a1a"/>
                            <span>Export Document</span>
                        </Button>
                    </Flex>
                    <Flex
                        direction={{base: 'column'}} style={{padding: "10px 30px"}}>
                        {documentType === 'customDocument' && <pre onMouseUp={handleMouseUp}>
                        {clicked &&
                            <span>Lennox Technologies achieved a significant milestone of $10 Billion annual revenue in FY12. This has been possible due to your commitment and hard work in delivering to our customers by driving excellence. I would like to acknowledge your contribution that has helped Lennox Technologies in this journey.
<br/><br/>Lennox Technologies will continue to make necessary investments and build competencies to stay relevant to our customers at all times. The opportunities in the market are immense and with our collaborative effort, I am sure, we will cross many more milestones and flourish in an environment where each one of us can realize our potential.
<br/><br/>I am pleased to share with you your Annual Compensation of $120,000 for the year 2012-13. This includes a potential performance pay of $80,000 annually. A part of this performance pay will be paid to you on a monthly basis and the remainder on closure of each quarter, subject to company, unit, and individuals achieving their targets.
<br/><br/>The details of your compensation and related benefits are enclosed in the Annexure to this letter. Kindly note that the above details are specific to US and may be subject to change in case of long-term deputation on international assignments, if any.
<br/><br/>I look forward to your continued commitment and a fulfilling career with Lennox Technologies in the years to come.
</span>}
                        </pre>}
                        {documentType === 'offerLetter' && <pre>
                        Offer Letter
                        </pre>}
                        {documentType === 'employmentContract' && <pre onMouseUp={handleMouseUp}>
                            <h3 style={{textAlign: "center"}}>Insurance Contract</h3>
                            Between<br/>{documentAttributes.InsurerName}<br/>
                            {documentAttributes.InsurerAddress}<br/>{documentAttributes.InsurerCity}, {documentAttributes.InsurerPostalCode}<br/>

                            And<br/>{documentAttributes.gender}. {documentAttributes.InsureeName}<br/>
                            {documentAttributes.InsureeAddress}<br/>{documentAttributes.InsureeCity}, {documentAttributes.InsureePostalCode}<br/>

                            has been agreed as follows: <br/><br/>

                            <h4>Commencement of Insurance</h4><br/>
                            <span>The employment commences with effect from {documentAttributes.InsureeStartDate}. The appointment is being agreed for {documentAttributes.employmentPeriod}.
                                A termination prior to taking up employment duties is not permitted. The first {documentAttributes.probationaryPeriod} of the employment relationship are considered
                                a probationary period. During the probationary period the appointment can be terminated by two weeks notice.
                                After expiry of the probationary period, the employment relationship may be terminated in accordance with the statutory periods of notice.
                                A legally extended period also applies to termination by the Insuree.</span>
                            <h4>Termination Terms</h4><br/>
                            <span>The regular working hours are {documentAttributes.workingHours} hours per week.
                                The times at which the daily work will commence and finish as well as work breaks will be determined according to the operational requirements.
                                In {documentAttributes.InsureeName}’s occupation overtime may be required. {documentAttributes.InsurerName} can require from {documentAttributes.InsureeName} to work overtime to a reasonable amount.
                                The amount of overtime is reasonable on all accounts,
                                if it does not exceed {documentAttributes.overtime} percentage of reasonable amount of overtime of the usual work time..
                            </span>
                    </pre>}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
export default AssembleDocuments;