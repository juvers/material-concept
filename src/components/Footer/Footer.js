import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";

import styles from "assets/jss/hhi-js-styles/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { fluid, white } = props;
  var container = clsx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white
  });
  var anchor =
    classes.a +
    clsx({
      [" " + classes.whiteColor]: white
    });

  return (
    <footer className={classes.footer}>
      <div className={container}>
        <p className={classes.left}>
          &copy; {1900 + new Date().getYear()}{" "}
          <a
            href="#highlandhomes"
            className={anchor}
            target="_blank"
          >
            {"Highland Homes"}
          </a>
       
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool
};
