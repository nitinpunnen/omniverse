import React from "react";
import "@aws-amplify/ui-react/styles.css";
import { Flex } from "@aws-amplify/ui-react";
import SingleUserAttributes from "./SingleUserAttributes";

const ReviewSign = (props) => {
    let userAttrs = props.userAttrs;

    return (
        <Flex
            direction={{ base: 'column', large: 'column' }}>
            <span className="page-intro">Let's review the information you provided before we continue</span>
            <SingleUserAttributes userAttrs={userAttrs} />
        </Flex>
    );
};

export default ReviewSign;