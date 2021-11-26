import React, { useEffect } from "react";
import throttle from "lodash/throttle";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const tabHeight = 69;
const StyledTabs = withStyles({
    indicator: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
        "& > div": {
            maxWidth: "100%",
            width: "100%",
            backgroundColor: "#000"
        }
    },
    scroller: {
        flexGrow: "0"
    }
})(props => {
    return <Tabs {...props} TabIndicatorProps={{ children: <div /> }} scrollButtons="on"
        variant={"scrollable"} />
});

const StyledTab = withStyles(theme => ({
    root: {
        textTransform: "none",
        height: tabHeight,
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        "&:focus": {
            opacity: 1
        }
    }
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    indicator: {
        padding: theme.spacing(1)
    },
    demo2: {
        backgroundColor: "#fff",
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 10000
    }
}));

/******* This is the scroll spy magic */
/*
Credits: Material UI
Source: 
https://github.com/mui-org/material-ui/blob/404c2ba16816f5c7ab7d8b2caf6bbc3d2218b820/docs/src/modules/utils/textToHash.js
*/
const makeUnique = (hash, unique, i = 1) => {
    const uniqueHash = i === 1 ? hash : `${hash}-${i}`;

    if (!unique[uniqueHash]) {
        unique[uniqueHash] = true;
        return uniqueHash;
    }

    return makeUnique(hash, unique, i + 1);
};

const textToHash = (text, unique = {}) => {
    return makeUnique(
        encodeURI(
            text
                .toLowerCase()
                .replace(/=&gt;|&lt;| \/&gt;|<code>|<\/code>|&#39;/g, "")
                // eslint-disable-next-line no-useless-escape
                .replace(/[!@#\$%\^&\*\(\)=_\+\[\]{}`~;:'"\|,\.<>\/\?\s]+/g, "-")
                .replace(/-+/g, "-")
                .replace(/^-|-$/g, "")
        ),
        unique
    );
};
const noop = () => { };

function useThrottledOnScroll(callback, delay) {
    const throttledCallback = React.useMemo(
        () => (callback ? throttle(callback, delay) : noop),
        [callback, delay]
    );

    React.useEffect(() => {
        if (throttledCallback === noop) return undefined;

        window.addEventListener("scroll", throttledCallback);
        return () => {
            window.removeEventListener("scroll", throttledCallback);
            throttledCallback.cancel();
        };
    }, [throttledCallback]);
}

function ScrollSpyTabs(props) {
    const [activeState, setActiveState] = React.useState(null);
    const { tabsInScroll } = props;
    let itemsServer = tabsInScroll.map(tab => {
        const hash = textToHash(tab.text);
        return {
            icon: tab.icon || "",
            text: tab.text,
            component: tab.component,
            hash: hash,
            node: typeof window !== "undefined" && document && document.getElementById(hash)
        };
    });
    const itemsClientRef = React.useRef([]);
    React.useEffect(() => {
        itemsClientRef.current = itemsServer;
    }, [itemsServer]);

    const clickedRef = React.useRef(false);
    const unsetClickedRef = React.useRef(null);
    const findActiveIndex = React.useCallback(() => {
        // set default if activeState is null
        if (activeState === null) setActiveState(itemsServer[0].hash);

        // Don't set the active index based on scroll if a link was just clicked
        if (clickedRef.current) return;

        let active;
        for (let i = itemsClientRef.current.length - 1; i >= 0; i -= 1) {
            // No hash if we're near the top of the page
            if (document.documentElement.scrollTop < 0) {
                active = { hash: null };
                break;
            }

            const item = itemsClientRef.current[i];

            if (
                item.node &&
                item.node.offsetTop <
                document.documentElement.scrollTop +
                document.documentElement.clientHeight / 8 +
                tabHeight
            ) {
                active = item;
                break;
            }
        }

        if (active && activeState !== active.hash) {
            setActiveState(active.hash);
        }
    }, [activeState, itemsServer]);

    // Corresponds to 10 frames at 60 Hz
    useThrottledOnScroll(itemsServer.length > 0 ? findActiveIndex : null, 166);

    const handleClick = hash => () => {
        // Used to disable findActiveIndex if the page scrolls due to a click
        clickedRef.current = true;
        unsetClickedRef.current = setTimeout(() => {
            clickedRef.current = false;
        }, 1000);

        if (activeState !== hash) {
            setActiveState(hash);

            if (window)
                window.scrollTo({
                    top:
                        document.getElementById(hash).getBoundingClientRect().top +
                        window.pageYOffset,
                    behavior: "smooth"
                });
        }
    };

    React.useEffect(
        () => () => {
            clearTimeout(unsetClickedRef.current);
        },
        []
    );

    const classes = useStyles();

    return (
        <div>
            <nav className={classes.demo2}>
                <StyledTabs value={activeState ? activeState : itemsServer[0].hash}>
                    {itemsServer.map(item2 => (
                        <StyledTab
                            key={item2.hash}
                            label={item2.text}
                            onClick={handleClick(item2.hash)}
                            value={item2.hash}
                        />
                    ))}
                </StyledTabs>
                <div className={classes.indicator} />
            </nav>
            <div className="container">
                {itemsServer.map(item1 => (
                    <article id={item1.hash} key={item1.text}>
                        {item1.component}
                    </article>
                ))}
            </div>
        </div>
    );
}

export default ScrollSpyTabs;
