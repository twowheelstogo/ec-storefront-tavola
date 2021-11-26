import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { Typography, Box } from "@material-ui/core"
import { withStyles, useTheme } from "@material-ui/core/styles";
import CatalogGrid from "@reactioncommerce/components/CatalogGrid/v1";
import PageLoading from "components/PageLoading";
import PageStepper from "components/PageStepper";
import PageSizeSelector from "components/PageSizeSelector";
import SortBySelector from "components/SortBySelector";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import styled from "styled-components";
import { withComponents } from "@reactioncommerce/components-context";

const ProductMediaWrapper = styled.div`
  position: relative;
`;

const StyledTitle = styled.div`
font-size:18px;
font-weight:700;
color:#000000;
display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;  
  overflow: hidden;
`;

const StyledSubtitle = styled.div`
font-size:14px;
color:#979797;
display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;  
  overflow: hidden;
`;

const StyledSubtitleVertical = styled.div`
font-size:14px;
color:#979797;
display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
`;

const CardContainerVertical = styled.div`
    border: ${({ withBorder }) => withBorder ? "1px solid #979797" : "none"};
`

const CardContainerHorizontal = styled.div`
    border: ${({ withBorder }) => withBorder ? "1px solid #979797" : "none"};
    display: flex;
    height: 150px;
`
const styles = (theme) => ({
    root: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "row",
        background: theme.palette.background.cards,
        padding: "10px",
        borderRadius: "10px"
    },
    imageProduct: {
        height: "100%",
        width: "150px",
        objectFit: "cover"
    },
    textPrice: {
        fontStyle: 'normal',
        fontWeight: 800,
        fontSize: '16px',
        lineHeight: '17px',
        display: "flex",
        alignItems: "right",
        justifyContent: "flex-end",
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: '1 1 auto',
        padding: '5px'
    },
    titleWeb: {
        fontWeight: 800,
        fontSize: '24px',
        paddingTop: '40px',
        paddingBottom: '40px',
        color: '#000000'
    },
    titleMobil: {
        fontWeight: 800,
        fontSize: '24px',
        paddingTop: '40px',
        paddingBottom: '40px',
        color: '#000000'
    },
    productPadding: {
        paddingLeft: '10px',
    },
    titleNoExistProd: {
        paddingLeft: '10px',
        paddingBottom: '100px',
        color: '#dcdcdc',
    },
    productPaddingHorizontaal: {
        // height: '50vh'
    }
})

const HorizontalProductCard = props => {
    HorizontalProductCard.propTypes = {
        classes: PropTypes.object,
        currencyCode: PropTypes.string.isRequired,
        isLoadingCatalogItems: PropTypes.bool,
        pageInfo: PropTypes.shape({
            startCursor: PropTypes.string,
            endCursor: PropTypes.string,
            hasNextPage: PropTypes.bool,
            hasPreviousPage: PropTypes.bool,
            loadNextPage: PropTypes.func,
            loadPreviousPage: PropTypes.func
        }),
        pageSize: PropTypes.number.isRequired,
        setPageSize: PropTypes.func.isRequired,
        setSortBy: PropTypes.func.isRequired,
        sortBy: PropTypes.string.isRequired,
        tags: PropTypes.object,
    };

    const { tags, classes, components: { ProgressiveImage } } = props
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("xs"));
    console.log(tags)

    return (
        <Fragment>
            {matches !== true ? (
                <div className={classes.productPaddingHorizontaal}>
                    {
                        tags.catalogProducts.length !== 0 && (
                            <div>
                                <Typography className={classes.titleWeb}>
                                    {tags.displayTitle}
                                </Typography>
                                <Grid container spacing={5}  >
                                    {
                                        tags.length !== 0 && (
                                            tags.catalogProducts.map((values) => (
                                                <Grid item xs={12} sm={6} md={4} lg={4} key={values._id} >
                                                    <CardContainerHorizontal>
                                                        <div>
                                                            <img src={values.primaryImage.URLs.medium} className={classes.imageProduct} ></img>
                                                        </div>
                                                        <div className={classes.cardContent}>
                                                            <div>
                                                                <StyledTitle>{values.title}</StyledTitle>
                                                                <StyledSubtitle>{values.description}</StyledSubtitle>
                                                            </div>
                                                            <div>
                                                                <Typography className={classes.textPrice}>{values.pricing[0].displayPrice}</Typography>
                                                            </div>
                                                        </div>
                                                    </CardContainerHorizontal>
                                                </Grid>
                                            ))
                                        )
                                    }
                                </Grid>
                            </div>
                        )
                    }
                </div>
            ) : (
                <div className={classes.productPadding}>
                    {
                        <div>
                            {
                                tags.catalogProducts.length !== 0 && (
                                    <div>
                                        <Typography className={classes.titleMobil}>
                                            {tags.displayTitle}
                                        </Typography>
                                        <Grid container spacing={2} >
                                            {
                                                tags.catalogProducts.length !== 0 && (
                                                    tags.catalogProducts.map((values) => (
                                                        <Grid item xs={6} key={values._id}>
                                                            <CardContainerVertical >
                                                                <ProductMediaWrapper>
                                                                    <ProgressiveImage
                                                                        fit={"cover"}
                                                                        altText={"description"}
                                                                        presrc={values.primaryImage.URLs.thumbnail}
                                                                        srcs={values.primaryImage.URLs}
                                                                    />
                                                                </ProductMediaWrapper>
                                                                <div className={classes.cardContent}>
                                                                    <div>
                                                                        <StyledTitle>{values.title}</StyledTitle>
                                                                        <StyledSubtitleVertical>{values.description}</StyledSubtitleVertical>
                                                                    </div>
                                                                    <div>
                                                                        <Typography className={classes.textPrice}>{values.pricing[0].displayPrice}</Typography>
                                                                    </div>
                                                                </div>
                                                            </CardContainerVertical>
                                                        </Grid>
                                                    ))
                                                )
                                            }
                                        </Grid>
                                    </div>
                                )
                            }
                        </div>
                    }
                </div>
            )}
        </Fragment >
    )

}


export default withComponents(withStyles(styles)(HorizontalProductCard))