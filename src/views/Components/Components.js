import React, {useState} from 'react';
import { SketchPicker } from 'react-color';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useIdleTimer } from 'react-idle-timer';
import {useHistory} from 'react-router-dom';
// import { atom, selector, useRecoilState, useRecoilValue} from 'recoil';

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
// import Table from "components/Table/Table";
import Button from "components/CustomButtons/Button";
// import Danger from "components/Typography/Danger";
import Card from "components/Card/Card";
// import CardHeader from "components/Card/CardHeader";
// import CardIcon from "components/Card/CardIcon";
import CardBody from "components/Card/CardBody";
// import CardFooter from "components/Card/CardFooter";
import Pagination from "components/Pagination/Pagination";

import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import Snackbar from "components/Snackbar/Snackbar.js";
import Instruction from "components/Instruction/Instruction";

import {
  defaultFont,
  grayColor
} from "assets/jss/hhi-js-styles.js";
import modalStyle from "assets/jss/hhi-js-styles/modalStyle";


import noticeModal1 from "assets/img/highhomes1.jpg";
import noticeModal2 from "assets/img/highhomes2.jpg";

// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import Close from "@material-ui/icons/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center'
    },
    box: {
        width: '50px',
        height: '20px',
        border: '2px solid #f00'
    },
    hide: {
        display: 'none'
    },
    cardTitle: {
      marginTop: "0",
      marginBottom: "3px",
      color: grayColor[2],
      fontSize: "18px"
    },
    cardHeader: {
      zIndex: "3"
    },
    cardSubtitle: {
      ...defaultFont,
      color: grayColor[0],
      fontSize: "14px",
      margin: "0 0 10px"
    },
    center: {
      textAlign: "center"
    },
    right: {
      textAlign: "right"
    },
    left: {
      textAlign: "left"
    },
    marginRight: {
      marginRight: "5px"
    },
    modalSectionTitle: {
      marginTop: "30px"
    },
    ...modalStyle(theme)

}));  

const Components = () => {
    const history = useHistory();

    const [tl, setTL] = React.useState(false);
    const [tc, setTC] = React.useState(false);
    const [tr, setTR] = React.useState(false);
    const [bl, setBL] = React.useState(false);
    const [bc, setBC] = React.useState(false);
    const [br, setBR] = React.useState(false);
    const [classicModal, setClassicModal] = React.useState(false);
    const [noticeModal, setNoticeModal] = React.useState(false);
    const [smallModal, setSmallModal] = React.useState(false);

    const classes = useStyles();
    const [color, setColor] = useState();
    const [toggler, setToggler] = useState(false);

    React.useEffect(() => {
      // Specify how to clean up after this effect:
      return function cleanup() {
        // to stop the warning of calling setState of unmounted component
        var id = window.setTimeout(null, 0);
        while (id--) {
          window.clearTimeout(id);
        }
      };
    });

    const showNotification = place => {
      switch (place) {
        case "tl":
          if (!tl) {
            setTL(true);
            setTimeout(function() {
              setTL(false);
            }, 6000);
          }
          break;
        case "tc":
          if (!tc) {
            setTC(true);
            setTimeout(function() {
              setTC(false);
            }, 6000);
          }
          break;
        case "tr":
          if (!tr) {
            setTR(true);
            setTimeout(function() {
              setTR(false);
            }, 6000);
          }
          break;
        case "bl":
          if (!bl) {
            setBL(true);
            setTimeout(function() {
              setBL(false);
            }, 6000);
          }
          break;
        case "bc":
          if (!bc) {
            setBC(true);
            setTimeout(function() {
              setBC(false);
            }, 6000);
          }
          break;
        case "br":
          if (!br) {
            setBR(true);
            setTimeout(function() {
              setBR(false);
            }, 6000);
          }
          break;
        default:
          break;
      }
    };

    const handleChange = color => setColor(color);
    console.log("Inside color: ",color);
    const togglePicker = () => setToggler(!toggler);

    const handleOnIdle = event => {
        console.log('user is idle', event);
        console.log('last active', getLastActiveTime());
        history.push('/admin')
      }
     
      const handleOnActive = event => {
        console.log('user is active', event)
        console.log('time remaining', getRemainingTime())
      }
     
      const handleOnAction = (e) => {
        console.log('user did something', e)
      }
     
      const { getRemainingTime, getLastActiveTime } = useIdleTimer({
        timeout: 10 * 60 * 15,
        onIdle: handleOnIdle,
        onActive: handleOnActive,
        onAction: handleOnAction,
        debounce: 500
      })
    return (

        <>
      
        
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
              <Card product className={classes.cardHover}>   
                  <CardBody>
                  <h4>Pagination component</h4>
                      <div style={{ width: '100%', height: 300 }}>
                      <Pagination
                        pages={[
                          { text: 1 },
                          { text: "..." },
                          { text: 5 },
                          { text: 6 },
                          { active: true, text: 7 },
                          { text: 8 },
                          { text: 9 },
                          { text: "..." },
                          { text: 12 }
                        ]}
                      />
                      <Pagination
                        pages={[
                          { text: "PREV" },
                          { text: 1 },
                          { text: 2 },
                          { active: true, text: 3 },
                          { text: 4 },
                          { text: 5 },
                          { text: "NEXT" }
                        ]}
                        color="info"
                      />
                      </div>
                  </CardBody>
              </Card>
          </GridItem>


          <GridItem xs={12} sm={12} md={4}>
              <Card product className={classes.cardHover}>   
                  <CardBody>
                  <h4>Button Component</h4>
                      <div style={{ width: '100%', height: 300 }}>
                      <Button color="primary" className={classes.marginRight}>
                          Primary
                        </Button>
                        <Button color="info" className={classes.marginRight}>
                          Info
                        </Button>
                        <Button color="success" className={classes.marginRight}>
                          Success
                        </Button>
                        <Button color="warning" className={classes.marginRight}>
                          Warning
                        </Button>
                        <Button color="danger" className={classes.marginRight}>
                          Danger
                        </Button>
                        <Button color="rose" className={classes.marginRight}>
                          Rose
                      </Button>
                      </div>
                  </CardBody>
              </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
              <Card product className={classes.cardHover}>   
                  <CardBody>
                  <h4>Color Picker Component</h4>
                      <div style={{ width: '100%', height: 300 }}>
                      <div className={classes.root}>
                      <div onClick={togglePicker} className={classes.box} style={{background: color?.hex}}></div>
                      {toggler && (
                      <SketchPicker  color={color} onChangeComplete={handleChange} />
                    )} 
                      </div>
                    </div>
                  </CardBody>
              </Card>
          </GridItem>
        </GridContainer>


          
        <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
              <Card product className={classes.cardHover}>   
                  <CardBody>
                  <h4>Modal Components</h4>
                      <div style={{ width: '100%', height: 300 }}>
                      <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12} className={classes.center}>
                    <div
                      className={
                        classes.cardHeader +
                        " " +
                        classes.center +
                        " " +
                        classes.modalSectionTitle
                      }
                    >
                    </div>
                    <Button
                      color="primary"
                      round
                      className={classes.marginRight}
                      onClick={() => setClassicModal(true)}
                    >
                      Basic modal
                    </Button>
                    <Dialog
                      classes={{
                        root: classes.center + " " + classes.modalRoot,
                        paper: classes.modal
                      }}
                      open={classicModal}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={() => setClassicModal(false)}
                      aria-labelledby="classic-modal-slide-title"
                      aria-describedby="classic-modal-slide-description"
                    >
                      <DialogTitle
                        id="classic-modal-slide-title"
                        disableTypography
                        className={classes.modalHeader}
                      >
                        <Button
                          justIcon
                          className={classes.modalCloseButton}
                          key="close"
                          aria-label="Close"
                          color="transparent"
                          onClick={() => setClassicModal(false)}
                        >
                          <Close className={classes.modalClose} />
                        </Button>
                        <h4 className={classes.modalTitle}>Modal title</h4>
                      </DialogTitle>
                      <DialogContent
                        id="classic-modal-slide-description"
                        className={classes.modalBody}
                      >
                        <p>
                         Basic modal concept
                        </p>
                      </DialogContent>
                      <DialogActions className={classes.modalFooter}>
                        <Button color="transparent">Transparent Button</Button>
                        <Button
                          onClick={() => setClassicModal(false)}
                          color="danger"
                          simple
                        >
                          Close
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <Button
                      color="info"
                      round
                      className={classes.marginRight}
                      onClick={() => setNoticeModal(true)}
                    >
                      Notice Modal
                    </Button>
                    <Dialog
                      classes={{
                        root: classes.center + " " + classes.modalRoot,
                        paper: classes.modal
                      }}
                      open={noticeModal}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={() => setNoticeModal(false)}
                      aria-labelledby="notice-modal-slide-title"
                      aria-describedby="notice-modal-slide-description"
                    >
                      <DialogTitle
                        id="notice-modal-slide-title"
                        disableTypography
                        className={classes.modalHeader}
                      >
                        <Button
                          justIcon
                          className={classes.modalCloseButton}
                          key="close"
                          aria-label="Close"
                          color="transparent"
                          onClick={() => setNoticeModal(false)}
                        >
                          <Close className={classes.modalClose} />
                        </Button>
                        <h4 className={classes.modalTitle}>Notice Modal</h4>
                      </DialogTitle>
                      <DialogContent
                        id="notice-modal-slide-description"
                        className={classes.modalBody}
                      >
                        <Instruction
                          title="1. Register"
                          text={
                            <span>
                              Visit our homes
                              <a href="#home">
                                Highland Homes
                              </a>
                              . You can choose a suburban or exurban, whatever works best for you.
                            </span>
                          }
                          image={noticeModal1}
                          className={classes.instructionNoticeModal}
                          imageClassName={classes.imageNoticeModal}
                        />
                        <Instruction
                          title="2. Apply"
                          text={
                            <span>
                            Visit our homes
                            <a href="#home">
                              Highland Homes
                            </a>
                            . You can choose a suburban or exurban, whatever works best for you.
                          </span>
                          }
                          image={noticeModal2}
                          className={classes.instructionNoticeModal}
                          imageClassName={classes.imageNoticeModal}
                        />
                        <p>
                         Reach out to us if you have questions
                        </p>
                      </DialogContent>
                      <DialogActions
                        className={
                          classes.modalFooter + " " + classes.modalFooterCenter
                        }
                      >
                        <Button
                          onClick={() => setNoticeModal(false)}
                          color="info"
                          round
                        >
                          View Homes
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <Button
                      color="rose"
                      round
                      className={classes.marginRight}
                      onClick={() => setSmallModal(true)}
                    >
                      Confirm alert modal
                    </Button>
                    <Dialog
                      classes={{
                        root: classes.center + " " + classes.modalRoot,
                        paper: classes.modal + " " + classes.modalSmall
                      }}
                      open={smallModal}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={() => setSmallModal(false)}
                      aria-labelledby="small-modal-slide-title"
                      aria-describedby="small-modal-slide-description"
                    >
                      <DialogTitle
                        id="small-modal-slide-title"
                        disableTypography
                        className={classes.modalHeader}
                      >
                        <Button
                          justIcon
                          className={classes.modalCloseButton}
                          key="close"
                          aria-label="Close"
                          color="transparent"
                          onClick={() => setSmallModal(false)}
                        >
                          <Close className={classes.modalClose} />
                        </Button>
                      </DialogTitle>
                      <DialogContent
                        id="small-modal-slide-description"
                        className={
                          classes.modalBody + " " + classes.modalSmallBody
                        }
                      >
                        <h5>Are you sure you want to delete this?</h5>
                      </DialogContent>
                      <DialogActions
                        className={
                          classes.modalFooter + " " + classes.modalFooterCenter
                        }
                      >
                        <Button
                          onClick={() => setSmallModal(false)}
                          color="transparent"
                          className={classes.modalSmallFooterFirstButton}
                        >
                          Changed my mind
                        </Button>
                        <Button
                          onClick={() => setSmallModal(false)}
                          color="success"
                          simple
                          className={
                            classes.modalSmallFooterFirstButton +
                            " " +
                            classes.modalSmallFooterSecondButton
                          }
                        >
                          Yes
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </GridItem>
                </GridContainer>
                      </div>
                  </CardBody>
              </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
              <Card product className={classes.cardHover}>   
                  <CardBody>
                  <h4>Photo Component</h4>
                      <div style={{ width: '100%', height: 300 }}>
                  
                      </div>
                  </CardBody>
              </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
              <Card product className={classes.cardHover}>   
                  <CardBody>
                  <h4>Switches Component</h4>
                      <div style={{ width: '100%', height: 300 }}>
                      
                      </div>
                  </CardBody>
              </Card>
          </GridItem>
        </GridContainer>


          
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
              <Card product className={classes.cardHover}>   
                  <CardBody>
                  <h4>Date Picker Component</h4>
                      <div style={{ width: '100%', height: 300 }}>
                    
                      </div>
                  </CardBody>
              </Card>
          </GridItem>          
          <GridItem xs={12} sm={12} md={4}>
              <Card product className={classes.cardHover}>   
                  <CardBody>
                  <h4>Tags Component</h4>
                      <div style={{ width: '100%', height: 300 }}>
                      
                      </div>
                  </CardBody>
              </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
              <Card product className={classes.cardHover}>   
                  <CardBody>
                  <h4>Map Component</h4>
                      <div style={{ width: '100%', height: 300 }}>
                      
                      </div>
                  </CardBody>
              </Card>
          </GridItem>
        </GridContainer>

          
        <GridContainer>
        


         
          

          <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardBody>
              <div>
                <GridContainer justify="center">
                  <GridItem xs={12}>
                    <div className={classes.cardHeader + " " + classes.center}>
                      <h4 className={classes.cardTitle}>
                        Notifications Components
                      </h4>
                    </div>
                  </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={3}>
                    <Button
                      fullWidth
                      color="primary"
                      onClick={() => showNotification("tl")}
                    >
                      Top Left
                    </Button>
                    <Snackbar
                      place="tl"
                      color="info"
                      icon={AddAlert}
                      message="Welcome to Highland Homes Intranet Skeleton Project"
                      open={tl}
                      closeNotification={() => setTL(false)}
                      close
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <Button
                      fullWidth
                      color="primary"
                      onClick={() => showNotification("tc")}
                    >
                      Top Center
                    </Button>
                    <Snackbar
                      place="tc"
                      color="info"
                      icon={AddAlert}
                      message="Welcome to Highland Homes Intranet Skeleton Project"
                      open={tc}
                      closeNotification={() => setTC(false)}
                      close
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <Button
                      fullWidth
                      color="primary"
                      onClick={() => showNotification("tr")}
                    >
                      Top Right
                    </Button>
                    <Snackbar
                      place="tr"
                      color="info"
                      icon={AddAlert}
                      message="Welcome to Highland Homes Intranet Skeleton Project"
                      open={tr}
                      closeNotification={() => setTR(false)}
                      close
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={3}>
                    <Button
                      fullWidth
                      color="primary"
                      onClick={() => showNotification("bl")}
                    >
                      Bottom Left
                    </Button>
                    <Snackbar
                      place="bl"
                      color="info"
                      icon={AddAlert}
                      message="Welcome to Highland Homes Intranet Skeleton Project"
                      open={bl}
                      closeNotification={() => setBL(false)}
                      close
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <Button
                      fullWidth
                      color="primary"
                      onClick={() => showNotification("bc")}
                    >
                      Bottom Center
                    </Button>
                    <Snackbar
                      place="bc"
                      color="info"
                      icon={AddAlert}
                      message="Welcome to Highland Homes Intranet Skeleton Project"
                      open={bc}
                      closeNotification={() => setBC(false)}
                      close
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <Button
                      fullWidth
                      color="primary"
                      onClick={() => showNotification("br")}
                    >
                      Bottom Right
                    </Button>
                    <Snackbar
                      place="br"
                      color="info"
                      icon={AddAlert}
                      message="Welcome to Highland Homes Intranet Skeleton Project"
                      open={br}
                      closeNotification={() => setBR(false)}
                      close
                    />
                  </GridItem>
                </GridContainer>
              </div>
            </CardBody>
          </Card>
        </GridItem>
        </GridContainer>
     
      </>
    );
  };


export default Components