 // eslint-disable-next-line
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import FormatQuote from "@material-ui/icons/FormatQuote";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button";
import CustomTabs from "components/CustomTabs/CustomTabs";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardAvatar from "components/Card/CardAvatar";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import CustomInput from "components/CustomInput/CustomInput";
import Clearfix from "components/Clearfix/Clearfix";
import CardIcon from "components/Card/CardIcon";
import InputLabel from "@material-ui/core/InputLabel";
import PermIdentity from "@material-ui/icons/PermIdentity";
import TuneIcon from '@material-ui/icons/Tune';
import avatar from "assets/img/faces/jude.jpg";

import {
  cardTitle,
  roseColor
} from "assets/jss/hhi-js-styles";

const styles = {
  cardTitle,
  cardTitleWhite: {
    ...cardTitle,
    color: "#FFFFFF",
    marginTop: "0"
  },
  cardCategoryWhite: {
    margin: "0",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: ".875rem"
  },
  cardCategory: {
    color: "#999999",
    marginTop: "10px"
  },
  icon: {
    color: "#333333",
    margin: "10px auto 0",
    width: "130px",
    height: "130px",
    border: "1px solid #E5E5E5",
    borderRadius: "50%",
    lineHeight: "174px",
    "& svg": {
      width: "55px",
      height: "55px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      width: "55px",
      fontSize: "55px"
    }
  },
  iconRose: {
    color: roseColor
  },
  marginTop30: {
    marginTop: "30px"
  },
  testimonialIcon: {
    marginTop: "30px",
    "& svg": {
      width: "40px",
      height: "40px"
    }
  },
  cardTestimonialDescription: {
    fontStyle: "italic",
    color: "#999999"
  }
};

const useStyles = makeStyles(styles);

export default function Profile() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title="Personal Information:"
            headerColor="info"
            tabs={[
              {
                tabName: "Profile",
                tabIcon: PersonOutlineIcon,
                tabContent: (
                    <Card testimonial>
                    <div className={classes.testimonialIcon}>
                      <FormatQuote />
                    </div>
                    <CardBody>
                      <h5 className={classes.cardTestimonialDescription}>
                        I am a Full Stack Developer
                      </h5>
                    </CardBody>
                    <CardFooter testimonial>
                      <h4 className={classes.cardTitle}>Richard Wallace</h4>
                      <h6 className={classes.cardCategory}>@RWallace</h6>
                      <CardAvatar testimonial testimonialFooter>
                        <a href="#home" onClick={e => e.preventDefault()}>
                          <img src={avatar} alt="..." />
                        </a>
                      </CardAvatar>
                    </CardFooter>
                  </Card>
                )
              },
              {
                tabName: "Settings",
                tabIcon: TuneIcon,
                tabContent: (
                  <div>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                      <Card>
                        <CardHeader color="info" icon>
                          <CardIcon color="info">
                            <PermIdentity />
                          </CardIcon>
                          <h4 className={classes.cardIconTitle}>
                            Edit Profile - <small>Edit your profile</small>
                          </h4>
                        </CardHeader>
                        <CardBody>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={5}>
                              <CustomInput
                                labelText="Company (disabled)"
                                id="company-disabled"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  disabled: true
                                }}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                              <CustomInput
                                labelText="Username"
                                id="username"
                                formControlProps={{
                                  fullWidth: true
                                }}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <CustomInput
                                labelText="Email address"
                                id="email-address"
                                formControlProps={{
                                  fullWidth: true
                                }}
                              />
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                              <CustomInput
                                labelText="First Name"
                                id="first-name"
                                formControlProps={{
                                  fullWidth: true
                                }}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                              <CustomInput
                                labelText="Last Name"
                                id="last-name"
                                formControlProps={{
                                  fullWidth: true
                                }}
                              />
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={4}>
                              <CustomInput
                                labelText="City"
                                id="city"
                                formControlProps={{
                                  fullWidth: true
                                }}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <CustomInput
                                labelText="Country"
                                id="country"
                                formControlProps={{
                                  fullWidth: true
                                }}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <CustomInput
                                labelText="Postal Code"
                                id="postal-code"
                                formControlProps={{
                                  fullWidth: true
                                }}
                              />
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                              <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                              <CustomInput
                                labelText="I am a full stack developer"
                                id="about-me"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  multiline: true,
                                  rows: 5
                                }}
                              />
                            </GridItem>
                          </GridContainer>
                          <Button color="info" className={classes.updateProfileButton}>
                            Update Profile
                          </Button>
                          <Clearfix />
                        </CardBody>
                      </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Card profile>
                        <CardAvatar profile>
                          <a href="#home" onClick={e => e.preventDefault()}>
                            <img src={avatar} alt="user" />
                          </a>
                        </CardAvatar>
                        <CardBody profile>
                          <h6 className={classes.cardCategory}>Developer</h6>
                          <h4 className={classes.cardTitle}>Jude Kuti</h4>
                          <p className={classes.description}>
                            Testing profile page content
                          </p>
                         
                        </CardBody>
                      </Card>
                    </GridItem>
                  </GridContainer>
                </div>
                )
              }
            ]}
          />
        </GridItem>
      </GridContainer>
     
    </div>
  );
}
