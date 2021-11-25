import React from "react";
import styled from "styled-components";
import ScrollSpyTabs from "./tags";
const ScrollHorizontal = styled.div`
overflow: none;
white-space: nowrap;
`
const TagsHorizontal = styled.div`
    display: inline-block;
    padding: 5px;
`

const HorizontalTagsProducts = (props) => {
    const {
        tags,
        currencyCode,
        isLoadingCatalogItems,
        pageInfo,
        pageSize,
        setPageSize,
        setSortBy,
        sortBy,
    } = props;

    console.log(tags)
    const categoryProducts = (tags || []).map((items) => items);

    return (
        <div
            style={{
                fontFamily: "roboto, sans-serif",
                fontSize: 15,
                backgroundColor: "#fff"
            }}
        >
            {
                categoryProducts.length !== 0 ? (
                            <ScrollSpyTabs
                                tabsInScroll={categoryProducts.map((e) => {
                                    return {
                                        text: e.displayTitle,
                                        component: (
                                            <p style={{ height: "80vh" }}>tab no 1 - some text</p>
                                        )
                                    };
                                })}
                            />
                ) : (
                    <div>NO HAY CATEGORIAS</div>
                )
            }
        </div>
    )
};

export default HorizontalTagsProducts;