import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { Typography, Box} from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles";
import CatalogGrid from "@reactioncommerce/components/CatalogGrid/v1";
import PageLoading from "components/PageLoading";
import PageStepper from "components/PageStepper";
import PageSizeSelector from "components/PageSizeSelector";
import SortBySelector from "components/SortBySelector";
// import ProductGridEmptyMessage from "./ProductGridEmptyMessage";

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
        width:"150px",
        objectFit: "cover"
    },
    textTitle: {
        paddingTop:'15px',
        paddingLeft: '15px',
        fontFamily: "Lato",
        fontWeight: 'bold',
        fontSize: '18px',
        lineHeight: '22px',
        fontStyle: 'normal',
        paddingBottom: '10px',
        textOverflow: 'ellipsis',
    },
    box:{
        display: "flex",
        height: "150px",

    },
    textdescription:{
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 'normal',
        paddingLeft: '15px',
        fontSize: '14px',
        lineHeight: '17px',
        color: '#979797'
    },
    textPrice:{
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 800,
        fontSize: '16px',
        lineHeight: '17px',
        display: "flex",
        alignItems: "right",
        justifyContent: "flex-end",
    },
    princingMargin:{
        marginLeft: "auto",
        paddingTop: '120px'
    }
})



class HorizontalProductCard extends Component {

    static propTypes = {
        catalogItems: PropTypes.arrayOf(PropTypes.object),
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
        sortBy: PropTypes.string.isRequired
    };


    render() {
        const { catalogItems, classes } = this.props
        console.log(this.props)
        const products = (catalogItems || []).map((items) => items.node.product);
        if (products.length === 0) return <h1>NO EXIST</h1>

        console.log(products)
        return (
            <Fragment>
                <Grid container spacing={5} columns={{ xs: 6, sm: 8, md: 6 }} >
                    {
                        products.map((values) => (
                            <Grid item xs={8} sm={5} md={4} lg={4} key={values._id} >
                                <Box className={classes.box} style={{ border: "2px solid #dcdcdc"}}>
                                    <img src={values.primaryImage.URLs.medium}  className={classes.imageProduct} ></img>
                                    <div>
                                        <Typography className = {classes.textTitle}>{values.title}</Typography>
                                        <Typography className = {classes.textdescription}>{values.description}</Typography>
                                    </div>
                                    <div className={classes.princingMargin}>
                                        <Typography className = {classes.textPrice}>{values.pricing[0].displayPrice}</Typography>
                                    </div>
                                </Box>
                            </Grid>

                        ))
                    }
                </Grid>

            </Fragment>
        )
    }
}


export default withStyles(styles)(HorizontalProductCard)