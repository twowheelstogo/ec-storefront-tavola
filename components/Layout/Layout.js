import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withComponents } from "@reactioncommerce/components-context";
import Header from "components/Header";
import Footer from "components/Footer";
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Whatsapp as WhatsAppIcon,
  Twitter,
} from "mdi-material-ui";

const styles = (theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: theme.palette.background.theme_,
    color: theme.palette.colors.TextTheme,
  },
  main: {
    flex: "1 1 auto",
    // maxWidth: theme.layout.mainContentMaxWidth,
    backgroundColor: 'white',
    marginLeft: "auto",
    marginRight: "auto"
  },
  article: {
    // padding: theme.spacing(7),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0)
    }
  }
});

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
    viewer: PropTypes.object
  };

  static defaultProps = {
    classes: {}
  };

  render() {
  const {
      classes,
      children,
      viewer,
      shop,
      components: { NavigationHeader },
      components: { CustomFooter },
    } = this.props;


    const Logo = {
      urlLogo:
        "https://firebasestorage.googleapis.com/v0/b/twg-vehicle-dashboard.appspot.com/o/Iconos%2FLogo-Tavola-Blanco.png?alt=media&token=5bf38dd2-f757-4c33-994f-2c03e066d460",
    }

    const Descripcion = {
      urlLogo: Logo.urlLogo,
      Mensaje1: "Contáctenos",
      Mensaje2: "Encuétrenos",
      ContenidoMensaje1: [
        "+502 41427517",
        "20 calle 24-26 bodega 15 zona 10 Ofibodegas Pradera",
        "Lunes- Sábado: 8am - 8pm",
        "Domingo: 10am - 8pm",
      ],
      ContenidoMensaje2: [
        { Titulo: "Sobre Nosotros", ruta: "/sobre" },
        { Titulo: "Extra", ruta: "/sobre" },
      ],
      NombreEmpresa: "Pollo Brujo",
      RedesSociales: [
        { Icono: <InstagramIcon />, ruta: "https://www.instagram.com/latavolabistro/" },
        { Icono: <FacebookIcon />, ruta: "https://www.facebook.com/latavolabistroisn/" },
      ],
    };

    return (
      <React.Fragment>
        <div className={classes.root}>
          {/* <Header shop={shop} viewer={viewer} /> */}
          <NavigationHeader
            shop={shop}
            viewer={viewer}
            Logo={Logo}
            MetodoBusqueda={(Busqueda) => {
              alert(Busqueda);
            }}
            ImageCoverUrl={
              "https://firebasestorage.googleapis.com/v0/b/twg-vehicle-dashboard.appspot.com/o/Iconos%2FLaTavolaInicio.jpg?alt=media&token=c60c0f5b-3d2b-43a2-a537-4d0565d5f3cd"
            }
            MessageCover={"LA TAVOLA CREATIVE BISTRO"}
            BanderaSlideHero={true}
          />

          <main className={classes.main}>
            <article className={classes.article}>{children}</article>
          </main>
          <CustomFooter Descripcion={Descripcion} />
        </div>
      </React.Fragment>
    );
  }
}

export default withComponents(withStyles(styles)(Layout));
