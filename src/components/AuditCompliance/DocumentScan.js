import React, {useRef, useState} from 'react';
import './AuditCompliance.css';
import {Button, Flex, Text} from "@aws-amplify/ui-react";
import {API} from "aws-amplify";
import {faFileCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import SelectS3Objects from "../dialogs/SelectS3Objects/SelectS3Objects";

const DocumentScan = () => {
    const [open, setOpen] = useState(false);
    const [signedUrl, setSignedUrl] = useState('');
    const childRef = useRef();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function handleSelectedDocuments()  {
        setOpen(false);
        const selectedDocuments = childRef.current.getSelectedDocuments();
        const documentKey = selectedDocuments[0].Key;
        console.log("Audit Program ", [documentKey]);

        const response = await API.post('assemblrBucketDetails', '/assemblr/signedUrl', {
            headers: {
                'Content-Type': 'application/json',
            },
            response: true,
            body: [documentKey]
        });
        // Will return only one signed url for document scan
        const signedUrl = response.data.signed_urls[0];
        setSignedUrl(signedUrl)
        console.log(signedUrl)
    };

    return (
        <Flex
            direction={{base: 'column', large: 'column'}}
            width="100%">
            <Flex
                direction={{base: 'row'}} width="100%">
                <Text style={{color: "#1a1a1a", fontSize: "16px", padding: "0 10px"}}>Select the file that you want to open and scan</Text>
                <Button variation="link" className='card-button' onClick={handleClickOpen}>
                    <FontAwesomeIcon icon={faFileCircleCheck} color="#1a1a1a"/>
                    <span>Select</span>
                </Button>
            </Flex>
            {/*{signedUrl && <iframe className="doc" height='800px'*/}
            {/*        src={signedUrl}></iframe>}*/}
            <embed src={signedUrl} width="100%" height="800"
                   type="application/pdf"></embed>
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'lg'}>
                <DialogTitle>Select Files</DialogTitle>
                <DialogContent>
                    <SelectS3Objects ref={childRef}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSelectedDocuments}>Ok</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Flex>
    );
};
export default DocumentScan;