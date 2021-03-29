import React, { createRef, useEffect } from "react";
import PropTypes from "prop-types";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import Collapse from "@material-ui/core/Collapse";
import Icon from "@material-ui/core/Icon";
import corporateImage from 'assets/img/corporate/HighlandHomes_Logo_White.svg';

// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks";

import sidebarStyle from "assets/jss/hhi-js-styles/components/sidebarStyle";

// get image from db
import avatar from "assets/img/faces/jude.jpg";

var ps;

const SidebarWrapper = (props) => {
  const sidebarWrapper = createRef();
  const { className, user, headerLinks, links } = props;
  
  useEffect(() =>{

    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebarWrapper.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
    const unMount = () => {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    }
    return unMount;

  });

  return (
    <div className={className} ref={sidebarWrapper}>
      {user}
      {headerLinks}
      {links}
    </div>
  );
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAvatar: false,
      miniActive: true,
      ...this.getCollapseStates(props.routes)
    };
  }
  mainPanel = React.createRef();
  // this creates the intial state of this component based on the collapse routes
  // that it gets through this.props.routes
  getCollapseStates = routes => {
    let initialState = {};
    routes.map(prop => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: this.getCollapseInitialState(prop.views),
          ...this.getCollapseStates(prop.views),
          ...initialState
        };
      }
      return null;
    });
    return initialState;
  };
  
  getCollapseInitialState(routes) {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && this.getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.href.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute = routeName => {
    return window.location.href.indexOf(routeName) > -1 ? "active" : "";
  };
  openCollapse(collapse) {
    var st = {};
    st[collapse] = !this.state[collapse];
    this.setState(st);
  }
  // this function creates the links and collapses that appear in the sidebar (left menu)
  createLinks = routes => {
    const { classes, color } = this.props;
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        var st = {};
        st[prop["state"]] = !this.state[prop.state];
        const navLinkClasses =
          classes.itemLink +
          " " +
          clsx({
            [" " + classes.collapseActive]: this.getCollapseInitialState(
              prop.views
            )
          });
        const itemText =
          classes.itemText +
          " " +
          clsx({
            [classes.itemTextMini]:
              this.props.miniActive && this.state.miniActive
          });
        const collapseItemText =
          classes.collapseItemText +
          " " +
          clsx({
            [classes.collapseItemTextMini]:
              this.props.miniActive && this.state.miniActive
          });
        const itemIcon = classes.itemIcon;
        const caret = classes.caret;
        const collapseItemMini = classes.collapseItemMini;
        return (
          <ListItem
            key={key}
            className={clsx(
              { [classes.item]: prop.icon !== undefined },
              { [classes.collapseItem]: prop.icon === undefined }
            )}
          >
            <NavLink
              to={"#"}
              className={navLinkClasses}
              onClick={e => {
                e.preventDefault();
                this.setState(st);
              }}
            >
              {prop.icon !== undefined ? (
                typeof prop.icon === "string" ? (
                  <Icon className={itemIcon}>{prop.icon}</Icon>
                ) : (
                  <prop.icon className={itemIcon} />
                )
              ) : (
                <span className={collapseItemMini}>
                  { prop.mini}
                </span>
              )}
              <ListItemText
                primary={prop.name}
                secondary={
                  <b
                    className={
                      caret +
                      " " +
                      (this.state[prop.state] ? classes.caretActive : "")
                    }
                  />
                }
                disableTypography={true}
                className={clsx(
                  { [itemText]: prop.icon !== undefined },
                  { [collapseItemText]: prop.icon === undefined }
                )}
              />
            </NavLink>
            <Collapse in={this.state[prop.state]} unmountOnExit>
              <List className={classes.list + " " + classes.collapseList}>
                {this.createLinks(prop.views)}
              </List>
            </Collapse>
          </ListItem>
        );
      }
      const innerNavLinkClasses =
        classes.collapseItemLink +
        " " +
        clsx({
          [" " + classes[color]]: this.activeRoute(prop.path)
        });
      const collapseItemMini = classes.collapseItemMini;
      const navLinkClasses =
        classes.itemLink +
        " " +
        clsx({
          [" " + classes[color]]: this.activeRoute(prop.path)
        });
      const itemText =
        classes.itemText +
        " " +
        clsx({
          [classes.itemTextMini]:
            this.props.miniActive && this.state.miniActive
        });
      const collapseItemText =
        classes.collapseItemText +
        " " +
        clsx({
          [classes.collapseItemTextMini]:
            this.props.miniActive && this.state.miniActive
        });
      const itemIcon = classes.itemIcon;
      return (
        <ListItem
          key={key}
          className={clsx(
            { [classes.item]: prop.icon !== undefined },
            { [classes.collapseItem]: prop.icon === undefined }
          )}
        >
          <NavLink
            to={prop.layout + prop.path}
            className={clsx(
              { [navLinkClasses]: prop.icon !== undefined },
              { [innerNavLinkClasses]: prop.icon === undefined }
            )}
          >
            {prop.icon !== undefined ? (
              typeof prop.icon === "string" ? (
                <Icon className={itemIcon}>{prop.icon}</Icon>
              ) : (
                <prop.icon className={itemIcon} />
              )
            ) : (
              <span className={collapseItemMini}>
                { prop.mini}
              </span>
            )}
            <ListItemText
              primary={ prop.name}
              disableTypography={true}
              className={clsx(
                { [itemText]: prop.icon !== undefined },
                { [collapseItemText]: prop.icon === undefined }
              )}
            />
          </NavLink>
        </ListItem>
      );
    });
  };
  render() {
    const {
      classes,
      // logo,
      image,
      logoText,
      routes,
      bgColor
    } = this.props;
    const itemText =
      classes.itemText +
      " " +
      clsx({
        [classes.itemTextMini]: this.props.miniActive && this.state.miniActive
      });
    const collapseItemText =
      classes.collapseItemText +
      " " +
      clsx({
        [classes.collapseItemTextMini]:
          this.props.miniActive && this.state.miniActive
      });
    const userWrapperClass =
      classes.user +
      " " +
      clsx({
        [classes.whiteAfter]: bgColor === "white"
      });
    const caret = classes.caret;
    const collapseItemMini = classes.collapseItemMini;
    const photo = classes.photo;
    var user = (
      <div className={userWrapperClass}>
        <div className={photo}>
          <img src={avatar} className={classes.avatarImg} alt="..." />
        </div>
        <List className={classes.list}>
          <ListItem className={classes.item + " " + classes.userItem}>

            <NavLink
              to={"#"}
              className={classes.itemLink + " " + classes.userCollapseButton}
              onClick={() => this.openCollapse("openAvatar")}
            >
              <ListItemText
                primary={ "Richard Wallace"}
                secondary={
                  <b
                    className={
                      caret +
                      " " +
                      classes.userCaret +
                      " " +
                      (this.state.openAvatar ? classes.caretActive : "")
                    }
                  />
                }
                disableTypography={true}
                className={itemText + " " + classes.userItemText}
              />
            </NavLink>
            <Collapse in={this.state.openAvatar} unmountOnExit>
              <List className={classes.list + " " + classes.collapseList}>
                <ListItem className={classes.collapseItem}>
                  <NavLink
                    to={`/admin/profile/`}
                    className={
                      classes.itemLink + " " + classes.userCollapseLinks
                    }
                  >
                    <span className={collapseItemMini}>
                      {"P"}
                    </span>
                    <ListItemText
                      primary={"Profile"}
                      disableTypography={true}
                      className={collapseItemText}
                    />
                  </NavLink>
                </ListItem>
                {/* <ListItem className={classes.collapseItem}>
                  <NavLink
                    to={`/admin/profile/`}
                    className={
                      classes.itemLink + " " + classes.userCollapseLinks
                    }
                  >
                    <span className={collapseItemMini}>
                      {"EP"}
                    </span>
                    <ListItemText
                      primary={
                        "Edit Profile"
                      }
                      disableTypography={true}
                      className={collapseItemText}
                    />
                  </NavLink>
                </ListItem> */}
                <ListItem className={classes.collapseItem}>
                  <NavLink
                  to={`/admin/profile/`}
                    className={
                      classes.itemLink + " " + classes.userCollapseLinks
                    }
                  >
                    <span className={collapseItemMini}>
                       {"S"}
                    </span>
                    <ListItemText
                      primary={"Settings"}
                      disableTypography={true}
                      className={collapseItemText}
                    />
                  </NavLink>
                </ListItem>
              </List>
            </Collapse>
          </ListItem>
        </List>
      </div>
    );
    var links = (
      <List className={classes.list}>{this.createLinks(routes)}</List>
    );

    const logoNormal =
      classes.logoNormal +
      " " +
      clsx({
        [classes.logoNormalSidebarMini]:
          this.props.miniActive && this.state.miniActive
      });
    const logoMini = classes.logoMini;
    const logoClasses =
      classes.logo +
      " " +
      clsx({
        [classes.whiteAfter]: bgColor === "white"
      });
    var brand = (
      <div className={logoClasses}>
        <a
          href="#home"
          target="_blank"
          className={logoMini}
        >
          <img src={corporateImage} alt="logo" className={classes.img} />
        </a>
        <a
          href="#home"
          target="_blank"
          className={logoNormal}
        >
          {logoText}
        </a>
      </div>
    );
    const drawerPaper =
      classes.drawerPaper +
      " " +
      clsx({
        [classes.drawerPaperMini]:
          this.props.miniActive && this.state.miniActive
      });
    const sidebarWrapper =
      classes.sidebarWrapper +
      " " +
      clsx({
        [classes.drawerPaperMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.sidebarWrapperWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });
    return (
      <div ref={this.mainPanel}>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={"right"}
            open={this.props.open}
            classes={{
              paper: drawerPaper + " " + classes[bgColor + "Background"]
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true 
            }}
          >
            {brand}
            <SidebarWrapper
              className={sidebarWrapper}
              user={user}
              headerLinks={<AdminNavbarLinks />}
              links={links}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            onMouseOver={() => this.setState({ miniActive: false })}
            onMouseOut={() => this.setState({ miniActive: true })}
            anchor={"left"}
            variant="permanent"
            open
            classes={{
              paper: drawerPaper + " " + classes[bgColor + "Background"]
            }}
          >
            {brand}
            <SidebarWrapper
              className={sidebarWrapper}
              user={user}
              links={links}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  bgColor: "blue"
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  bgColor: PropTypes.oneOf(["white", "black", "blue"]),
  color: PropTypes.oneOf([
    "white",
    "red",
    "orange",
    "green",
    "blue",
    "purple",
    "rose"
  ]),

  
  logo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  logoText: PropTypes.string,
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  routes: PropTypes.arrayOf(PropTypes.object),
  miniActive: PropTypes.bool,
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func
};

SidebarWrapper.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  headerLinks: PropTypes.object,
  links: PropTypes.object
};

export default withStyles(sidebarStyle)(Sidebar);
