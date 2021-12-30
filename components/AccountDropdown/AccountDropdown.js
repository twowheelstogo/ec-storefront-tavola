import React, { useState, Fragment, useEffect } from "react";
import inject from "hocs/inject";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import { AccountCircleOutline } from "mdi-material-ui";
//import AccountIcon from "mdi-material-ui/Account";
import Popover from "@material-ui/core/Popover";
import useViewer from "hooks/viewer/useViewer";
import ViewerInfo from "@reactioncommerce/components/ViewerInfo/v1";
import Link from "components/Link";
import useStores from "hooks/useStores";
import EntryModal from "../Entry/EntryModal";
import getAccountsHandler from "../../lib/accountsServer.js";

const useStyles = makeStyles((theme) => ({
  ColoresPrincipales: {
    color: theme.palette.colors.TextTheme,
  },
  accountDropdown: {
    width: 320,
    padding: theme.spacing(2),
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  Usuario: {
    color: theme.palette.colors.buttonBorderColor,
    ["@media (min-width:600px)"]: {
      width: "35px",
      height: "35px",
    },
    ["@media (max-width:599px)"]: {
      width: "25px",
      height: "25px",
    },
  },
}));

const AccountDropdown = (props) => {
  const router = useRouter();
  const { uiStore } = useStores();
  const { setEntryModal } = uiStore;
  const resetToken = router?.query?.resetToken;
  const classes = useStyles();
  const [anchorElement, setAnchorElement] = useState(null);
  const [viewer, , refetch] = useViewer();
  const { accountsClient } = getAccountsHandler();
  const isAuthenticated = viewer && viewer._id;

  useEffect(() => {
    // Open the modal in case of reset-password link
    if (!resetToken) {
      return;
    }
    setEntryModal("reset-password");
  }, [resetToken]);

  const onClose = () => {
    setAnchorElement(null);
  };

  const handleSignOut = async () => {
    await accountsClient.logout();
    await refetch();
    onClose();
  };

  const toggleOpen = (event) => {
    setAnchorElement(event.currentTarget);
  };
  
  return (
    <Fragment>
      <EntryModal onClose={onClose} resetToken={resetToken} />
      {isAuthenticated ? (
        <ButtonBase onClick={toggleOpen}>
          <ViewerInfo viewer={viewer} />
        </ButtonBase>
      ) : (
        <IconButton color="inherit" onClick={toggleOpen}>
          <AccountCircleOutline className={classes.Usuario}/>
        </IconButton>
      )}

      <Popover
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={Boolean(anchorElement)}
        onClose={onClose}
      >
        <div className={classes.accountDropdown}>
          {isAuthenticated ? (
            <Fragment>
              <div className={classes.marginBottom}>
                <Link href="/profile/address">
                  <Button color="primary" fullWidth>
                    Perfil
                  </Button>
                </Link>
              </div>
              <div className={classes.marginBottom}>
                <Button color="primary" fullWidth onClick={() => setEntryModal("change-password")}>
                  Cambiar Contraseña
                </Button>
              </div>
              <Button color="primary" fullWidth onClick={handleSignOut} variant="contained">
                Cerrar Sesión
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <div className={classes.authContent}>
                <Button color="primary" fullWidth onClick={() => setEntryModal("login")}>
                  Iniciar Sesión
                </Button>
              </div>
              <Button color="primary" fullWidth onClick={() => setEntryModal("signup")}>
                Crear Cuenta
              </Button>
            </Fragment>
          )}
        </div>
      </Popover>
    </Fragment>
  );
};

export default inject("authStore")(AccountDropdown);