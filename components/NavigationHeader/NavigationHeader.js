import React, { Component, useEffect } from "react";
import { withComponents } from "@reactioncommerce/components-context";
import { Grid, AppBar, Toolbar, Box } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles, useTheme } from "@material-ui/core/styles";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import { NavigationDesktop } from "components/NavigationDesktop";
import { NavigationMobile, NavigationToggleMobile } from "components/NavigationMobile";
import Hidden from "@material-ui/core/Hidden";
import inject from "hocs/inject";

const styles = (theme) => ({  
  root: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  Borde: {
    borderBottomStyle: "solid",
    borderBottomColor: "#979797",
  },
  Logo: {
    [theme.breakpoints.up("xs")]: {
      display: "flex",
      justifyContent: "flex-start",
    },
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "center",
    },
    marginTop: "2%",
  },
  searchbar: {
    ["@media (max-width:599px)"]: {
      marginLeft: "auto",
      marginRight: "auto",
    },
    ["@media (min-width:600px)"]: {
      marginTop: "1%",
    },
    //backgroundColor: "blue",
  },
  Espacio: {
    marginTop: "10px",
  },
  Espacio2: {
    marginTop: "20px",
  },
  Iconos: {
    ["@media (max-width:1279px) and (min-width:600px) "]: {
      display: "flex",
      justifyContent: "flex-start",
    },
    ["@media (min-width:1280px) "]: {
      marginLeft: "auto",
    },
  },
  Menu: {    
    ["@media (max-width:599px)"]: {
      display: "flex",
      justifyContent: "flex-start",
      marginTop:"auto"
    },
    ["@media (min-width:600px)"]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  LogoSize: {
    width: "111px",
    height: "71px",
  },
  ImageCover: {
    ["@media (min-width:600px)"]: {
      height: "480px",
      marginTop: "15px",
    },
    ["@media (max-width:599px)"]: {
      height: "327px",
      marginTop: "20px",
    },
  },
  AppBar_: {
    boxShadow: "0px 0px 0px 0px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%)",
    backgroundColor: theme.palette.primary.dark,
  },
  MessageCover: {
    fontWeight: "bold",
    fontSize: "36px",
    lineHeight: "42px",
    marginLeft: "auto",
    marginRight: "auto",
    ["@media (max-width:599px)"]: {
      width: "247px",
      height: "101px",
    },
  },
  GridMensaje: {
    display: "flex",
    justifyContent: "center",
    ["@media (min-width:900px)"]: {
      marginTop: "15%",
    },
    ["@media (max-width:899px) and (min-width:600px)"]: {
      marginTop: "19%",
    },
    ["@media (max-width:599px)"]: {
      marginTop: "20%",
    },
  },
  LogoDesktop:{
    width: theme.palette.Logo.WidthDesktop,
    heigth: theme.palette.Logo.HeightDesktop
  },
  LogoMobile:{
    width: theme.palette.Logo.WidthMobile,
    heigth: theme.palette.Logo.HeightMobile
  }
});

class NavigationHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", bandera: false, showAlert: false };
  }

  static propTypes = {
    classes: PropTypes.object,
    width: PropTypes.string.isRequired,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    uiStore: PropTypes.shape({
      toggleMenuDrawerOpen: PropTypes.func.isRequired,
    }).isRequired,
    viewer: PropTypes.object,
  };

  static defaultProps = {
    classes: {},
  };

  hideAlert = () => this.setState({ showAlert: false });
  handleNavigationToggleClick = () => {
    this.props.uiStore.toggleMenuDrawerOpen();
  };

  render() {
    //urlLogo: Contiene la url de logo
    //urlLogoSize: Es un array donde estan las dimensiones del logo, [width,height], ejemplo:["10px","15px"]
    //ColoresBusqueda: color 1 es el color de letra, color 2 es color de fondo y color 3 es el del icono, array de colores,["black", "red", "blue"]
    //ColoresIcono, son los colores del icono, entrada: nombre o hexa del color,ejemplo: #FFFFF
    //MetodoBusqueda, debe de ser un metodo y debe de contener como parametro la busqueda
    //FondoColorMenu, fondo de color de las opciones del menu para version movil y escritorio
    //ColorIconoMenu, fondo del icono del menu cuando para versiones moviles
    const {
      classes,
      Logo,      
      MetodoBusqueda,
      ImageCoverUrl,
      MessageCover,            
      shop,      
      cart,
      BanderaSlideHero,
      width,    
      components: { SearchBar },
      components: { IconsActions },
      components: { SlideHero },
    } = this.props;

    return (
      <>
        {isWidthUp("sm", width) ? (
          <>
            <Grid xs={12} md={12} lg={12} spacing={5}>
              {/* Contenedor Principal */}
              <Grid container xs={11} md={11} lg={11} className={classes.root}>
                <AppBar className={classes.AppBar_} position="static">
                  <Toolbar>
                    {/* LOGO */}
                    <Grid item xs={12} sm={3} md={3} lg={3} className={classes.Logo}>
                      <img src={Logo.urlLogo} className={classes.LogoDesktop} />
                    </Grid>

                    {/* Bara de busqueda */}
                    <Grid item xs={8} sm={6} md={8} lg={8} xl={8} className={classes.searchbar}>
                      <SearchBar  Metodo={MetodoBusqueda} />
                    </Grid>

                    {/* Iconos */}
                    <Grid item xs={2} sm={3} md={3} lg={3} className={classes.Iconos}>
                      <IconsActions                      
                      width={width}  cart={cart} />
                    </Grid>
                  </Toolbar>
                </AppBar>

                <Grid container xs={12} md={12} lg={12} className={classes.Borde}>
                  {/* Espacio Extra */}
                  <Grid xs={11} md={11} lg={11} className={classes.Espacio}>
                    <h1> </h1>
                  </Grid>
                </Grid>

                {/* Espacio Extra */}
                <Grid xs={12} md={12} lg={12} className={classes.Espacio2}>
                  <h1> </h1>
                </Grid>

                {/* Contenedor Navigation Menu */}
                <Grid item xs={12} md={12} lg={12} className={classes.Menu}>
                  <NavigationDesktop />
                </Grid>
              </Grid>
            </Grid>
            {/* Espacio Extra */}
            <Grid xs={11} md={11} lg={11} className={classes.Espacio2}>
              <h1> </h1>
            </Grid>

            {BanderaSlideHero ? <SlideHero title={MessageCover} subtitle={""} background={ImageCoverUrl} type={"jpg"} /> : null}
          </>
        ) : (
          <>
            <Grid xs={12} md={12} lg={12} spacing={5} spacing={5}>
              {/* Contenedor Principal */}
              <Grid container xs={11} md={11} lg={11}>
                {/* <AppBar className={classes.AppBar_} position="static" style={{ backgroundColor: AppColor }}>
                  <Toolbar> */}
                {/* Contenedor Navigation Menu */}
                <Grid item xs={4} md={4} lg={4} className={classes.Menu}>
                  <Hidden mdUp>
                    <NavigationToggleMobile
                      onClick={this.handleNavigationToggleClick}                      
                    />
                  </Hidden>
                  <NavigationMobile  shop={shop} Logo={Logo.urlLogo} />
                </Grid>

                {/* LOGO */}
                <Grid item xs={4} md={3} lg={3} className={classes.Logo}>
                <img src={Logo.urlLogo} className={classes.LogoMobile} />
                </Grid>

                {/* Iconos */}
                <Grid item xs={4} md={2} lg={2} className={classes.Iconos}>
                  <IconsActions                   
                  width={width}  cart={cart} />
                </Grid>
                {/* </Toolbar> */}
                
                {/* </AppBar> */}
              </Grid>
            </Grid>

            {/* Bara de busqueda */}
            <Grid  xs={11} md={6} lg={6} className={classes.searchbar}>
                  <SearchBar Metodo={MetodoBusqueda} />
                </Grid>

            {/* Espacio Extra */}
            <Grid xs={11} md={11} lg={11} className={classes.Espacio2}>
              <h1> </h1>
            </Grid>
            {BanderaSlideHero ? <SlideHero title={MessageCover} subtitle={""} background={ImageCoverUrl} type={"jpg"} /> : null}            
          </>
        )}
      </>
    );
  }
}

export default withComponents(
  withWidth({ initialWidth: "md" })(withStyles(styles)(inject("uiStore")(NavigationHeader))),
);