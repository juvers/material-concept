import React from 'react';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Typography from '@material-ui/core/Typography';
import { default as CustomButton } from "components/CustomButtons/Button";

import { default as CustomCard } from "components/Card/Card.js";
import { default as CustomCardHeader } from "components/Card/CardHeader";
import CardText from "components/Card/CardText.js";
import CardBody from "components/Card/CardBody.js";
import TextField from '@material-ui/core/TextField';

const StartMemoRead = (props) =>{

    <>                <GridItem xs={12} sm={12} md={7}>
    <CustomCard>
        <CustomCardHeader color="info" text>
            <CardText color="info">
                <h4 className={classes.cardTitleWhite}>Current Job: 281-081</h4>
                <h4 className={classes.cardCategoryWhite}>
                    13924 Frisco, TX 75035</h4>
            </CardText>
        </CustomCardHeader>
        <CardBody>
            <fieldset className={classes.fieldset}>
                <legend>Memo</legend>

                <GridContainer>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled className={classes.darkText} color="primary" margin="dense" variant="outlined" label="Memo Type" value={props.memoState.memoType} />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Job Start Date" value={props.memoState.jobStartDate} />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Edited on Date" value={props.memoState.editedDate} />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Put on PH Date" defaultValue="10/24/2018" />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Released from PH" defaultValue="01/08/2019" />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Sold" defaultValue="08/08/2019" />
                    </GridItem>
                </GridContainer>
            </fieldset>

            <fieldset className={classes.fieldset}>
                <legend>Location</legend>

                <GridContainer>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Region City" defaultValue="Dallas" />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Brand" defaultValue="Highland Dallas" />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Subdivision" defaultValue="Prairie View" />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Address" defaultValue="13924 Round Prairie Lane" />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="City, State, Zip" defaultValue="Frisco, TX 75035" />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="County" defaultValue="Collin" />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Phase" defaultValue="2A" />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Lot" defaultValue="10" />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Block" defaultValue="K" />
                    </GridItem>
                </GridContainer>
            </fieldset>

            <fieldset className={classes.fieldset}>
                <legend>Job</legend>

                <GridContainer>
                    <GridItem xs={12} sm={6} md={6} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Purchaser" defaultValue="Teasley, Dolores" />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Sales Price" defaultValue="$399, 300" />
                    </GridItem>

                </GridContainer>

                <GridContainer>
                    <GridItem xs={12} sm={6} md={6} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Special" defaultValue="Yes - See below" />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Cash Lot" defaultValue="No" />
                    </GridItem>
                </GridContainer>
            </fieldset>

            <fieldset className={classes.fieldset}>
                <legend>Plan</legend>

                <GridContainer>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Plan" defaultValue="371" />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Elevation" defaultValue="A" />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Garage Swing" defaultValue="Left" />
                    </GridItem>
                </GridContainer>
                <hr className={"hr"} />
                <GridContainer style={{ marginTop: "10px" }}>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <Typography>Selected</Typography>
                        {filterOptions(selectedOne, "standard").map(x => <p className={x.OptionForced} key={x.id}>{x.SalesDescription}</p>)}

                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <Typography>Forced</Typography>
                        {filterOptions(selectedOne, "forced").map(x => <p className={x.OptionForced} key={x.id}>{x.SalesDescription}</p>)}
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <Typography>Override</Typography>
                        {filterOptions(overrideselectedOne, "override").map(x => <p className={x.OptionForced} key={x.id}>{x.SalesDescription}</p>)}

                    </GridItem>

                </GridContainer>
                <hr className={"hr"} />

                <GridContainer>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Special" defaultValue=" " />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Dropped Garage(Inches)" defaultValue="n/a" />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Piers" defaultValue="No" />
                    </GridItem>
                </GridContainer>

                <GridContainer>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Water Injection / Moisture Conditioning" defaultValue="No" />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Foundation Design" defaultValue=" " />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Enhanced Lot" defaultValue="No" />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Brick Selection 1" defaultValue=" " />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Brick Selection 2" defaultValue=" " />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Additional Notes" defaultValue=" " />
                    </GridItem>
                </GridContainer>
            </fieldset>
            <fieldset className={classes.fieldset}>
                <legend>Personnel</legend>

                <GridContainer>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Div. Const. Mgr." defaultValue=" " />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Const. Mgr." defaultValue="David Tanguay" />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Div. sales Mgr." defaultValue=" " />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={6} md={6} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Sales Counselor" defaultValue="Terry Denkhaus" />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6} className={classes.center}>
                        <TextField disabled margin="dense" variant="outlined" label="Edited By" defaultValue="Jude Kuti - jkuti@hhomesltd.com" />
                    </GridItem>

                </GridContainer>
            </fieldset>

            <Grid
                container
                justify="flex-end"
                alignItems="flex-end">
                <CustomButton
                    color="info"
                    className={classes.marginRight}
                    onClick={handleOpenLog}
                >
                    View Archive Log
                    </CustomButton>
                <CustomButton
                    color="info"
                    className={classes.marginRight}
                    onClick={printPage}>
                    Submit
                 </CustomButton>
            </Grid>
        </CardBody>
    </CustomCard>
</GridItem>
    </>

};

export default StartMemoRead;