import React from "react";
import "@aws-amplify/ui-react/styles.css";
import { Flex } from "@aws-amplify/ui-react";
import SingleUserAttributes from "./SingleUserAttributes";
import { useTranslation } from "react-i18next";

const ReviewSign = (props) => {
    let userAttrs = props.userAttrs;
    const { t, i18n } = useTranslation();

    return (
        <Flex
            direction={{ base: 'column', large: 'column' }}>
            <span className="page-intro">{t('reviewSign.intro')}</span>
            <SingleUserAttributes userAttrs={userAttrs} />
        </Flex>
    );
};

export default ReviewSign;