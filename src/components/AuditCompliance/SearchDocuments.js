import React, {useState} from 'react';
import './AuditCompliance.css';
import {Card, CheckboxField, Flex, Heading, SearchField, SelectField, Text} from "@aws-amplify/ui-react";
import {API} from "aws-amplify";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Box, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";

const FeedbackButton = (props) => {
    const [color, setColors] = useState("gray");
    const [active, setActive] = useState(false);

    const handleClickButton = () => {
        setActive(true);
        setColors("gray");
        if (active === true) {
            setActive(false);
            setColors("darkblue");
        }
    };
    return (
        <FontAwesomeIcon icon={props.icon} color={color}
                         style={{border: "1px solid gray", padding: "5px", borderRadius: "50%"}}
                         onClick={() => handleClickButton()}/>
    );
};

const SearchDocuments = () => {
    const [facetResults, setFacetResults] = useState([]);
    const [resultItems, setResultItems] = useState([]);
    let [searched, setSearched] = useState(false);
    let [queryString, setQueryString] = useState("");
    let [selectedFacets, setSelectedFacets] = useState([]);

    async function searchDocument(event, queryString, attributeFilter) {
        const response = await API.get('assemblrBucketDetails', '/assemblr/kendraSearch', {
            headers: {},
            response: true,
            queryStringParameters: {
                query: queryString,
                attributeFilter: JSON.stringify(attributeFilter)
            }
        });
        console.log(response)
        let facetResults = response.data.FacetResults;
        facetResults = facetResults.filter(item => item.DocumentAttributeKey !== 's3_document_id')
        console.log('facetResults', facetResults)
        const resultItems = response.data.ResultItems;
        console.log(resultItems)
        setResultItems(resultItems);
        setFacetResults(facetResults);
        setSearched(true);

        if (event === 'submit') {
            setFacets(facetResults);
        }
    }

    function setFacets(facetResults) {
        let selectedFacets = [];
        // facetResults.map(function (item) {
        //     const facetName = item.DocumentAttributeKey;
        //     item.DocumentAttributeValueCountPairs.map(function (countPair) {
        //         const facetKey = countPair.DocumentAttributeValue.StringValue;
        //         selectedFacets.push({facetKey: facetKey, facetName: facetName});
        //     })
        // });
        setSelectedFacets(selectedFacets);
    }

    function highLightText(content) {
        let startIndex = 0;

        // return <div className='oneline'>{content}</div>

        let spanText = content.Highlights.map(function (item, index) {
            const temp = (
                <span key={index}>
                    <span>{content.Text.substring(startIndex, item.BeginOffset)}</span>
                    <span><strong>{content.Text.substring(item.BeginOffset, item.EndOffset)}</strong></span>
                </span>
            )
            startIndex = item.EndOffset;
            return temp;
        })
        return <div className='oneline'>{spanText}{content.Text.substring(startIndex)}</div>
    }

    async function handleChecked(event) {
        const checked = event.target.checked;
        const facetKey = event.target.attributes.getNamedItem("name").value;
        const facetName = event.target.attributes.getNamedItem("data-attributekey").value;

        if (checked) {
            selectedFacets.push({facetKey: facetKey, facetName: facetName});
        } else {
            selectedFacets = selectedFacets.filter(facet => facet.facetKey !== facetKey);
        }
        setSelectedFacets(selectedFacets);
        console.log('selectedFacets', selectedFacets)

        const attributeFilter = {
            "AndAllFilters": []
        }

        selectedFacets.map(function (item) {
            const facetKey = item.facetKey;
            const facetName = item.facetName;

            attributeFilter.AndAllFilters.push({
                "EqualsTo": {
                    "Key": facetName,
                    "Value": {
                        "StringValue": facetKey
                    }
                }
            })
        })
        console.log('attributeFilter', attributeFilter)
        await searchDocument("change", queryString, attributeFilter);
    }

    async function handleSort(event) {

    }

    function shouldSelectCheckbox(key, value) {
        let shouldCheck = false;

        selectedFacets.map(function (item) {
            const facetKey = item.facetKey;
            const facetName = item.facetName;

            if (key === facetName && value === facetKey) {
                shouldCheck = true
            }
        })
        return shouldCheck
    }

    return (
        <Flex
            direction={{base: 'column', large: 'column'}}
            width="100%">
            <Flex direction={{base: 'row', large: 'row'}}
                  padding="1rem"
                  width="60%"
                  style={{alignItems: "center", margin: "auto", display: "block"}}
            >
                <SearchField
                    label="Search"
                    placeholder="Search for Documents..."
                    size={"large"}
                    onSubmit={(value) => {
                        setQueryString(value);
                        searchDocument("submit", value, {"AndAllFilters": []});
                    }}
                />
            </Flex>
            {resultItems.length > 0 &&
                <Flex
                    direction={{base: 'row', large: 'row'}}>
                    <Flex
                        direction={{base: 'column', large: 'column'}}
                        padding="1rem">
                        <Heading level={6} style={{textAlign: "left"}}>Filter Results</Heading>
                        <ul className="result-list">
                            {facetResults.map(function (item, index) {
                                return <li key={index}>
                                    <span style={{
                                        fontWeight: "bold",
                                        display: "block",
                                        margin: "10px 0 10px 0"
                                    }}>{item.DocumentAttributeKey}</span>
                                    <ul className="result-list">
                                        {item.DocumentAttributeValueCountPairs.map(function (countPair, countPairIndex) {
                                            return <li key={countPairIndex}>
                                                <CheckboxField
                                                    data-attributekey={item.DocumentAttributeKey}
                                                    name={countPair.DocumentAttributeValue.StringValue}
                                                    value="yes"
                                                    checked={shouldSelectCheckbox(item.DocumentAttributeKey, countPair.DocumentAttributeValue.StringValue)}
                                                    onChange={(e) => handleChecked(e)}
                                                    label={countPair.DocumentAttributeValue.StringValue + " (" + countPair.Count + ")"}
                                                />
                                            </li>
                                        })}
                                    </ul>
                                </li>
                            })}
                        </ul>
                    </Flex>
                    <Flex
                        direction={{base: 'column', large: 'column'}}
                        padding="1rem"
                        style={{alignItems: "center", margin: "0 auto"}}>
                        <Flex
                            direction={{base: 'row'}}
                            style={{width: "100%", alignItems: "center", justifyContent: "right"}}>
                            <span><strong>Sort</strong></span>
                            <SelectField name="department"
                                         labelHidden
                                         variation="quiet"
                                         defaultValue="relevance"
                                         onChange={(e) => handleSort()}
                            >
                                <option value="relevance">Relevance</option>
                                <option value="created_at">Created at</option>
                                <option value="title">Title</option>
                                <option value="_language_code">Language Code</option>
                                <option value="view_count">View Count</option>
                                <option value="_uploaded_by">Uploaded By</option>
                            </SelectField>
                        </Flex>
                        <ul className="result-list">
                            {resultItems.map(function (item, index) {
                                return <li key={index}>
                                    {item.Type === "DOCUMENT" && <Card className="custom-card">
                                        <Flex
                                            direction={{base: 'column', large: 'column'}}
                                            padding="1rem"
                                            style={{display: "block", margin: "10px auto", textAlign: "left"}}
                                        >
                                            <a rel="noopener noreferrer" target="_blank"
                                               href={item.HrefUri}>{item.DocumentTitle.Text}</a>
                                            <div>{highLightText(item.DocumentExcerpt)}</div>
                                            <Flex direction={{base: 'row'}}
                                                  style={{margin: "15px 50px 0 auto", justifyContent: "right"}}>
                                                <FeedbackButton icon={faThumbsUp}/>
                                                <FeedbackButton icon={faThumbsDown}/>
                                            </Flex>
                                        </Flex>
                                    </Card>}
                                    {item.Type === "ANSWER" && <Card className="answer-card">
                                        <Flex
                                            direction={{base: 'column', large: 'column'}}
                                            padding="1rem"
                                            style={{display: "block", margin: "10px auto", textAlign: "left"}}
                                        >
                                            <span style={{display: "block", fontWeight: "700", fontSize: "1.2em", margin: "10px 0"}}>{
                                                item.AdditionalAttributes[0].Value.TextWithHighlightsValue.Text.substring(
                                                    item.AdditionalAttributes[0].Value.TextWithHighlightsValue.Highlights[0].BeginOffset,
                                                    item.AdditionalAttributes[0].Value.TextWithHighlightsValue.Highlights[0].EndOffset
                                                )
                                            }</span>
                                            <a rel="noopener noreferrer" target="_blank"
                                               href={item.HrefUri}>{item.DocumentTitle.Text}</a>
                                            <div>{highLightText(item.AdditionalAttributes[0].Value.TextWithHighlightsValue)}</div>
                                            <Flex direction={{base: 'row'}}
                                                  style={{margin: "15px 50px 0 auto", justifyContent: "right"}}>
                                                <FeedbackButton icon={faThumbsUp}/>
                                                <FeedbackButton icon={faThumbsDown}/>
                                            </Flex>
                                        </Flex>
                                    </Card>}
                                </li>;
                            })}
                        </ul>
                    </Flex>
                </Flex>
            }
            {
                (searched && resultItems.length <= 0) && <span>No Results</span>
            }
        </Flex>
    );
};
export default SearchDocuments;