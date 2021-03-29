import React, { createRef } from 'react';
import clsx from 'clsx';
// import *
// Core
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Box from '@material-ui/core/Box';
//jasen
// Icons
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MoreVerticon from '@material-ui/icons/MoreVert';

import Person from '@material-ui/icons/Person';


const myColor = '#f00';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  appBarColor: {
    background: "#6d2a5b",
  
  },
  accordionWidth: {
    width: 250,
    margin: 0
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  media: {
    height: 45,
    width: 200,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  let gridNum = 12;
  const classes = useStyles();
  const dref = createRef();
  const gref = createRef();
  const [open, setOpen] = React.useState(false);
  const [on, setOn] = React.useState(false);
  const [grd, setGrd] = React.useState(gridNum);

  const checkRef = () => {
    console.log(JSON.stringify(dref.current.getBoundingClientRect()));
    setOn(!on);
    setGrd(() => (on ? 12 : 10));
  };
  const handleDrawerClose = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, classes.appBarColor, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              <MoreVerticon style={{ color: '#fff' }} />
            </IconButton>
          </div>

          <Typography variant='h6' noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        ref={dref}
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <CardMedia
            className={classes.media}
            image={require('assets/img/corporate/HighlandHomes_Plum_RGB.png')}
            title='Hhomes'
          />
        </div>
        <Divider />

        <List>
          <ListItem button>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText>Welcome Richard</ListItemText>
          </ListItem>
          <Divider />
          {['Dashboard', 'Sales', 'Arch Log', 'New Model', 'Product'].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <Grid container>
        <Grid
          ref={gref}
          item
          md={2}
          className={clsx({ [classes.hide]: !on })}
          style={{
            height: '100vh',
            width: '250px',
            paddingTop: '120px',
            background: '#eee',
          }}
        >
          Side grid
        </Grid>

        <Grid item md={grd}>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <button onClick={checkRef}>Test Ref</button>

            <Grid container spacing={2}>
              <Grid item md={3}>
                <Paper>Paper 1</Paper>
              </Grid>
              <Grid item md={9}>
                <Paper>Paper 2</Paper>
              </Grid>
            </Grid>
          </main>
        </Grid>
      </Grid>
    </div>
  );
}
