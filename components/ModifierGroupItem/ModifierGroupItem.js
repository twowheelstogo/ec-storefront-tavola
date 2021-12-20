import React, { Fragment } from 'react'
import styled from "styled-components";
import { Divider, Box, Fab, colors } from "@material-ui/core";
import { Plus,Minus } from "mdi-material-ui";

import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
    fabDesign: (colors, backgroundColors) => ({
        width: "35px",
        height: "30px",
        backgroundColor: (backgroundColors) ? backgroundColors : "red",
        color: (colors) ? colors : "blue"
    })
})

const TitleProduct = styled.div`
font-size: 18px;
text-align: left; 
font-weight: 800;
display: flex;
padding-bottom: 10px;
`;

const OptionProductSelect = styled.div`
font-size: 14px;
text-align: left; 
display: flex;
padding-bottom: 7px; 
`;

const OptionProductTitle = styled.div`
font-size: 14px;
text-align: left; 
display: flex;
font-weight: 800;
padding-bottom: 5px; 
`
const Div = styled.div``;

const ProductCost = styled.div`
font-size: 14px; 
font-weight: 700;
padding-right: 10px;
`;

const ProductTotalCost = styled.div`
font-size: 14px; 
font-weight: 700;
padding-right: 10px;
`;

const TableCellFirst = styled.div`
display: table-cell;
position: relative;
`;

const TableCellSecond = styled.div`
display: table-cell;
position: relative;
text-align: right;
`;

const GeneralTableCell = styled.div`
display: table;
width: 100%;
padding-left: 20px;
`;

const DesignGroupItems = styled.div`
bottom: 0;
left: 0;
width: 100%;
margin: 0 auto;
position: absolute;
padding-right: ${({ padding }) => padding ? padding : "0px"};
padding-bottom: ${({bottomP})=> bottomP ? bottomP : "0px"};
`;

const datos = [
    {
        "productTitle": "Duo Estandar",
        "options": [
            {
                "title": "Duos Estandar",
                "selectProduct": "Muffind De Vainilla"
            },
            {
                "title": "Bebidas Duos",
                "selectProduct": "café americano"
            },
            {
                "title": "Elige tipo de leche",
                "selectProduct": "Entera"
            },
            {
                "title": "Elige el tipo de azúcar",
                "selectProduct": "Sin azúcar"
            },
        ],
        "instrutions": {
            "text": "agregarle mas sobresitos de azúcar porfavor"
        },
        "account": "2"
    },
    {
        "productTitle": "Duo Estandar",
        "options": [
            {
                "title": "Duos Estandar",
                "selectProduct": "Muffind De Vainilla"
            },
            {
                "title": "Bebidas Duos",
                "selectProduct": "café americano"
            },
            {
                "title": "Elige tipo de leche",
                "selectProduct": "Entera"
            },
            {
                "title": "Elige el tipo de azúcar",
                "selectProduct": "Sin azúcar"
            },
        ],
        "instrutions": {
            "text": "agregarle mas sobresitos de azúcar porfavor"
        },
        "account": "2"
    },
    {
        "productTitle": "Duo Estandar",
        "options": [
            {
                "title": "Duos Estandar",
                "selectProduct": "Muffind De Vainilla"
            },
            {
                "title": "Bebidas Duos",
                "selectProduct": "café americano"
            },
            {
                "title": "Elige tipo de leche",
                "selectProduct": "Entera"
            },
            {
                "title": "Elige el tipo de azúcar",
                "selectProduct": "Sin azúcar"
            },
        ],
        "instrutions": {
            "text": "agregarle mas sobresitos de azúcar porfavor"
        },
        "account": "2"
    },
];

const ModifierGroupItem = (props) => {
    const { classes } = props;
    console.log(classes)
    let colorComponent = "#fff"
    let backgrounColorComponent = "#1D0D13"
    return (
        <Fragment>
            {
                datos.length !== 0 && (
                    <Fragment>
                        <div>
                            {datos.map((el) => (
                               <Div>
                                    <GeneralTableCell>
                                    <TableCellFirst>
                                        <TitleProduct>el.productTitle</TitleProduct>
                                        {el.options.map((prod) => (
                                            <Div>
                                                <OptionProductTitle>prod.title</OptionProductTitle>
                                                <OptionProductSelect>
                                                    {prod.selectProduct}
                                                </OptionProductSelect>
                                            </Div>
                                        ))}
                                    </TableCellFirst>
                                    <TableCellSecond>
                                        <ProductCost>Q26.00 </ProductCost>
                                        <ProductTotalCost> {`Total (2) Q52.00`} </ProductTotalCost>
                                        <DesignGroupItems padding={"10px"} bottomP={"10px"}>
                                            <Box>
                                                <Fab 
                                                    key={el.productTitle}   
                                                     style={{
                                                        width: "35px",
                                                        height: "30px",
                                                        color: colorComponent,
                                                        backgroundColor: backgrounColorComponent
                                                    }} 
                                                    aria-label="add"
                                                >
                                                   <Plus/>
                                                </Fab>
                                            </Box>
                                        </DesignGroupItems>
                                        <DesignGroupItems padding={"65px"} bottomP={"15px"}>{el.account}</DesignGroupItems>
                                        <DesignGroupItems padding={"90px"} bottomP={"10px"}>
                                            <Box>
                                                <Fab 
                                                    key={el.productTitle}
                                                    style={{
                                                        width: "35px",
                                                        height: "30px",
                                                        color: colorComponent,
                                                        backgroundColor: backgrounColorComponent
                                                    }}
                                                    aria-label="add" 
                                                >
                                                    <Minus/>
                                                </Fab>
                                            </Box>
                                        </DesignGroupItems>
                                    </TableCellSecond>
                                </GeneralTableCell>
                                <Divider/>
                               </Div>
                            ))}
                        </div>

                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default withStyles(styles)(ModifierGroupItem); 