import React, { Fragment } from "react";
import PropTypes from "prop-types";
import CatalogLayout from "components/CatalogLayout";


const HomePage = props => {
    const {
        catalogItems,
        currencyCode,
        isLoadingCatalogItems,
        pageInfo,
        pageSize,
        tags,
        setPageSize,
        setSortBy,
        sortBy
    } = props;

    return (
        <Fragment>
            <CatalogLayout
                catalogItems={catalogItems}
                currencyCode={currencyCode}
                isLoadingCatalogItems={isLoadingCatalogItems}
                pageInfo={pageInfo}
                pageSize={pageSize}
                tags={tags}
                setPageSize={setPageSize}
                setSortBy={setSortBy}
                sortBy={sortBy}
            />
        </Fragment>
    );

}

HomePage.propTypes = {
    catalogItems: PropTypes.array,
    currencyCode: PropTypes.string,
    isLoadingCatalogItems: PropTypes.bool,
    tags: PropTypes.array,
    addItemsToCart: PropTypes.func.isRequired,
    onChangeCartItemsQuantity: PropTypes.func.isRequired
};

export default HomePage;