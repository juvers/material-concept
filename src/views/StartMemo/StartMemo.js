import React, { useState, useEffect, forwardRef, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slide from "@material-ui/core/Slide";
import clsx from 'clsx';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import PrintIcon from '@material-ui/icons/Print';
import TodayIcon from '@material-ui/icons/Today';
import './StartMemoStyles/Styles.css';

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Typography from '@material-ui/core/Typography';
import { default as CustomButton } from "components/CustomButtons/Button";

import { default as CustomCard } from "components/Card/Card.js";
import { default as CustomCardHeader } from "components/Card/CardHeader";
import CardText from "components/Card/CardText.js";
import CardBody from "components/Card/CardBody.js";
import TextField from '@material-ui/core/TextField';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogActions from '@material-ui/core/DialogActions';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';

import { DataGrid } from '@material-ui/data-grid';

import { email } from 'data/email';
import OptionsDataCopy from './StartMemoData/optionscopy';
import OverrideDataCopy from './StartMemoData/overridecopy';
import { StartMemoJsStyles } from './StartMemoStyles/Styles';
import { steps, columns, rows, officeLocations, MemoState, JobState, PlanState, PersonnelState, HighlighterState, PlanHighlight, memoTypeData } from './StartMemoData/StartMemoIntialStates';

const useStyles = makeStyles((theme) => ({
    ...StartMemoJsStyles,
    cardHeader: {
        padding: theme.spacing(1, 2),
    },
    list: {
        width: 200,
        height: 230,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
    center: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    margin: {
        margin: theme.spacing(1),
    },
    my2: {
        margin: theme.spacing(2, 0)
    },
    mx2: {
        margin: theme.spacing(0, 2)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

// export const MemoContext = createContext(null);
export default function StartMemo() {
    const classes = useStyles();
    const [step, setStep] = useState(steps);
    const [open, setOpen] = useState(false);
    const [openLog, setOpenLog] = useState(false);
    const [highlight, setHighlight] = useState(HighlighterState);
    const [planHighlighlight, setPlanHighlight] = useState(PlanHighlight);
    const [memoState, setMemoState] = useState(MemoState);
    const [jobState, setJobState] = useState(JobState);
    const [planState, setPlanState] = useState(PlanState);
    const [personnelState, setPersonnelState] = useState(PersonnelState);
    const [locations, setLocations] = useState(officeLocations);
    const [noteFromBrix, setNoteFromBrix] = useState(false);
    // const editHighlights = Object.keys(highlight);

    // Handle multiple inputs
    // TODO: Make reusable
    const handleMemoEdit = ({ target }) => {
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.name;
        if (name === "sold" && value === false) {
            setMemoState({
                ...memoState, soldDate: "N/A", [name]: value
            })
        } else if (name === "phvalue" && value === false) {
            setMemoState({
                ...memoState, putOnPHDate: "N/A", [name]: value
            })
        } else {
            setMemoState({
                ...memoState, [name]: value
            })
        }

    }

    const handleJobEdit = ({ target }) => {
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.name;
        setJobState({
            ...jobState, [name]: value
        });
    }

    const handlePlanEdit = ({ target }) => {
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.name;
        console.log(name, value);
        // handle switch toggling and updating of states
        if (name === "enhancedLotStatus" && value === false) {
            setPlanState({
                ...planState, enhancedLot: "", [name]: value
            })
        } else if (name === "droppedGarageStatus" && value === false) {
            setPlanState({
                ...planState, droppedGarage: "", [name]: value
            });
        } else if (name === "specialStatus" && value === false) {
            setPlanState({
                ...planState, special: "", [name]: value
            });
        } else {
            setPlanState({
                ...planState, [name]: value
            });
        }
    }

    const handlePersonnelEdit = ({ target }) => {
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.name;
        setPersonnelState({
            ...personnelState, [name]: value
        });
    }

    const handleOpenLog = () => {
        setOpenLog(true);
    };

    const handleCloseLog = () => {
        setOpenLog(false);
    };

    const handleChange = (event) => {
        setLocations({ ...locations, [event.target.name]: event.target.checked });
    };

    const {
        dfwOps,
        houstonOps,
        austinOps,
        sanAntonioOps,
        archServAdmin,
        dfwPurchase,
        houstonPurchase,
        austinPurchase,
        sanAntonioPurchase } = locations;

    const handleClose = () => {
        setOpen(false);
        setStep(Object.assign(steps, {
            next: [false, false],
            count: 0
        }));
    };

    const printPage = () => console.log("Printing page")

    const handleOpen = () => {
        setOpen(true);
    }


    // *** accept 2 parameters 
    const setStatus = (setHighlight, data) => {
        setHighlight({ [data]: true })
    }

    const inpref = useRef();
    const oinpref = useRef();

    const [allOptions, setAllOptions] = useState(OptionsDataCopy);
    const [overrideOptions, setOverrideOptions] = useState(OverrideDataCopy);

    const [v, setV] = useState();
    const [ov, setoV] = useState();

    const [inp, setInp] = useState(false);
    const [inpo, setInpo] = useState(false);

    const [selectedOne, setSelectedOne] = useState([]);
    const [overrideselectedOne, setoverrideSelectedOne] = useState([]);


    //TODO:  make pure later

    // extract ids to utilise for mapping out forced options from  options override
    const getOptionsIds = (arr) => arr.map(x => x.id);

    // extract from array of options based on applied filter such as "standard", "forced" and "override"
    const filterOptions = (arr, filter) => arr.filter(x => x.OptionForced === filter);


    // filter based on input value and create staging area to house data searched
    // data searched has all capacity as data unsearched such as click, classNames etc
    const filterValCopy = () => {
        let sv = inpref.current.value;
        setInp(sv.length);
        let arr = [];
        allOptions.filter((x) => {
            if (x.SalesDescription.toLowerCase().includes(sv.toLowerCase())) {
                arr.push(x);
            }
        });
        setV(arr);
    };

    const overridefilterValCopy = () => {
        let sv = oinpref.current.value;
        setInpo(sv.length);
        let arr = [];
        overrideOptions.filter((x) => {
            if (x.SalesDescription.toLowerCase().includes(sv.toLowerCase())) {
                arr.push(x);
            }
        });
        setoV(arr);
    };

    const addSelected = ({ target }) => {
        let d = target.dataset.id;
        let a = allOptions.filter((x) => x.id === d);
        setSelectedOne([...a, ...selectedOne]);
        let ns = allOptions.filter((x) => x.id !== d);
        setAllOptions(ns);
        // Reset for override options
        if (getOptionsIds(overrideOptions).includes(d)) {
            setoverrideSelectedOne([...a, ...overrideselectedOne]);
            let ns = overrideOptions.filter((x) => x.id !== d);
            setOverrideOptions(ns);
        }
    };

    const overrideaddSelected = ({ target }) => {
        let d = target.dataset.id;
        let a = overrideOptions.filter((x) => x.id === d);
        setoverrideSelectedOne([...overrideselectedOne, ...a]);
        let ns = overrideOptions.filter((x) => x.id !== d);
        setOverrideOptions(ns);
        // Reset for main options
        if (getOptionsIds(allOptions).includes(d)) {
            setSelectedOne([...a, ...selectedOne]);
            let ns = allOptions.filter((x) => x.id !== d);
            setAllOptions(ns);
        }
    };


    const addSearchSelected = ({ target }) => {
        let d = target.dataset.id;
        let a = allOptions.filter((x) => x.id === d);
        setSelectedOne([...a, ...selectedOne]);
        let ns = allOptions.filter((x) => x.id !== d);
        setAllOptions(ns);
        setV(ns);
    };

    const overrideaddSearchSelected = ({ target }) => {
        let d = target.dataset.id;
        let a = overrideOptions.filter((x) => x.id === d);
        setoverrideSelectedOne([...a, ...overrideselectedOne]);
        let ns = overrideOptions.filter((x) => x.id !== d);
        setOverrideOptions(ns);
        setoV(ns);
    };

    const returnVal = ({ target }) => {
        let d = target.dataset.id;
        // filter selected option data
        let a = selectedOne.filter((x) => x.id === d);

        // add it to the main options
        setAllOptions([...a, ...allOptions]);

        // filter it off from selected one so its removed
        let ns = selectedOne.filter((x) => x.id !== d);

        // pass selected options without removed one
        setSelectedOne(ns);
        if (getOptionsIds(overrideselectedOne).includes(d)) {
            setOverrideOptions([...a, ...overrideOptions]);
            let ns = overrideselectedOne.filter((x) => x.id !== d);
            setoverrideSelectedOne(ns);
        }
    };

    const overridereturnVal = ({ target }) => {
        let d = target.dataset.id;
        let a = overrideselectedOne.filter((x) => x.id === d);
        setOverrideOptions([...a, ...overrideOptions]);
        let ns = overrideselectedOne.filter((x) => x.id !== d);
        setoverrideSelectedOne(ns);


        if (getOptionsIds(selectedOne).includes(d)) {
            setAllOptions([...a, ...allOptions]);
            let ns = selectedOne.filter((x) => x.id !== d);
            setSelectedOne(ns);
        }
    };

    const clearSearchCopy = () => {
        inpref.current.value = "";
        setInp(false);
    };

    const overrideclearSearchCopy = () => {
        oinpref.current.value = "";
        setInpo(false);
    };

    return (
        <>
            <Grid
                container
                justify="flex-end"
                alignItems="flex-end">
                <CustomButton
                    color="info"
                    className={classes.marginRight}
                    onClick={handleOpen}>
                    Get Memo
            </CustomButton>
                <CustomButton
                    color="info"
                    className={classes.marginRight}
                    onClick={printPage}>
                    Print
            </CustomButton>
            </Grid>

            <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Select Existing Memo</DialogTitle>
                <DialogContent>
                    <FormControl variant="outlined" className={classes.formControl}>
                        {/* <InputLabel htmlFor="Community">Community</InputLabel> */}

                        <Autocomplete
                            id="community"
                            // options={comm}
                            // onChange={changeCommunity}
                            name="community"
                            // getOptionLabel={(option) => option}
                            // style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Community" variant="outlined" />}
                        />
                    </FormControl>
                    {steps.next[0] ? <FormControl variant="outlined" className={classes.formControl}>
                        <Autocomplete
                            id="address"
                            // options={mappedAddy[communityName]}
                            // onChange={changeAddress}
                            // getOptionLabel={(option) => option}
                            // style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Address" name="address" variant="outlined" />}
                        />
                    </FormControl> : null}

                </DialogContent>
                {steps.next[1] ? <div className={`${classes.center} ${classes.marginBottom}`}>
                    <CustomButton variant="contained" onClick={handleClose} color="primary">
                        Cancel
                </CustomButton>
                </div> : null}
            </Dialog>
            <Dialog
                open={openLog}
                TransitionComponent={Transition}
                fullWidth={true}
                maxWidth={"md"}
                onClose={handleCloseLog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle id="alert-dialog-slide-title">{"Start Memo 281-081 Archive Change Log"}</DialogTitle>
                <DialogContent>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={rows} columns={columns} pageSize={5} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <CustomButton onClick={handleCloseLog} color="primary">
                        Close
             </CustomButton>
                </DialogActions>
            </Dialog>
            <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                    <CustomCard className={classes.sticky}>
                        <CustomCardHeader color="info" text>
                            <CardText color="info">
                                <h4 className={classes.cardTitleWhite}>Tools</h4>
                                <h4 className={classes.cardCategoryWhite}>
                                    Content Edit | Email Recipients
                                </h4>
                            </CardText>
                        </CustomCardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <fieldset className={clsx(classes.fieldset)}>
                                    <legend>
                                            <span className={clsx(classes.cursor, { [classes.activate]: highlight.job })} onClick={() => setStatus(setHighlight, "job")} >Job</span>
                                                 &nbsp;| <span className={clsx(classes.cursor, { [classes.activate]: highlight.plan })} onClick={() => setStatus(setHighlight, "plan")} >Plan</span>
                                                 &nbsp;|&nbsp;
                                                 <span className={clsx(classes.cursor, { [classes.activate]: highlight.options })} onClick={() => setStatus(setHighlight, "options")} >Options</span>
                                                 &nbsp;| <span className={clsx(classes.cursor, { [classes.activate]: highlight.personnel })} onClick={() => setStatus(setHighlight, "personnel")} >Personnel</span>
                                        </legend>
                                        {highlight.job && <>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={12}>
                                                    <FormControl variant="outlined" className={classes.formControl}>
                                                        <InputLabel id="demo-simple-select-outlined-label">Memo Type</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="demo-simple-select-outlined"
                                                            value={memoState.memoType}
                                                            margin="dense"
                                                            name={"memoType"}
                                                            onChange={handleMemoEdit}
                                                            label="Memo Type"
                                                        >
                                                            {memoTypeData.map(x => <MenuItem key={x} value={x}>{x}</MenuItem>)}
                                                        </Select>
                                                    </FormControl>
                                                </GridItem>
                                            </GridContainer>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={6}>
                                                    <FormControl variant="outlined" className={classes.formControl}>
                                                        <FormControlLabel
                                                            control={<Checkbox onChange={handleMemoEdit} checked={memoState.phvalue} name={"phvalue"} />}
                                                            label="Put on PH"
                                                        />
                                                    </FormControl>
                                                </GridItem>
                                                {memoState.phvalue &&
                                                    <GridItem xs={12} sm={12} md={6}>
                                                        <FormControl variant="outlined" className={classes.formControl}>
                                                            <TextField
                                                                id="date"
                                                                label="Put on PH date"
                                                                type="date"
                                                                // margin="dense"
                                                                // variant="outlined"
                                                                name={"putOnPHDate"}
                                                                value={memoState.putOnPHDate}
                                                                onChange={handleMemoEdit}
                                                                className={classes.textField}
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                            />
                                                        </FormControl>
                                                    </GridItem>
                                                }
                                            </GridContainer>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={6}>
                                                    <FormControl variant="outlined" onClick={() => setNoteFromBrix(true)} className={classes.formControl}>
                                                        <FormControlLabel
                                                            control={<Checkbox checked={memoState.releasedph} name={"releasedph"} disabled />}
                                                            label="Released from PH"
                                                        />
                                                        {noteFromBrix && <p style={{ color: "#f00" }}>Field must be updated from BRIX*</p>}
                                                    </FormControl>

                                                </GridItem>
                                                {memoState.releasedph &&
                                                    <GridItem xs={12} sm={12} md={6}>
                                                        <FormControl variant="outlined" className={classes.formControl}>
                                                            <TextField
                                                                id="date"
                                                                label="Released from PH date"
                                                                type="date"
                                                                disabled
                                                                // margin="dense"
                                                                // variant="outlined"
                                                                name="releasedFromPHDate"
                                                                value={memoState.releasedFromPHDate}
                                                                onChange={handleMemoEdit}
                                                                className={classes.textField}
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                            />
                                                        </FormControl>
                                                    </GridItem>}

                                            </GridContainer>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={6}>
                                                    <FormControl variant="outlined" className={classes.formControl}>
                                                        <FormControlLabel
                                                            control={<Checkbox onChange={handleMemoEdit} name={"sold"} />}
                                                            label="Sold Date"
                                                        />

                                                    </FormControl>
                                                </GridItem>
                                                {memoState.sold &&
                                                    <GridItem xs={12} sm={12} md={6}>
                                                        <FormControl variant="outlined" className={classes.formControl}>

                                                            <TextField
                                                                id="date"
                                                                label="Sold Date"
                                                                type="date"
                                                                // margin="dense"
                                                                // variant="outlined"
                                                                name={"soldDate"}
                                                                value={memoState.soldDate}
                                                                onChange={handleMemoEdit}
                                                                className={classes.textField}
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                            />
                                                        </FormControl>
                                                    </GridItem>
                                                }
                                            </GridContainer>
                                            <GridContainer>
                                                <GridItem xs={12} sm={4} className={classes.center}>
                                                    <TextField onChange={handleJobEdit} name="purchaser" margin="dense" variant="outlined" label="Purchaser" value={jobState.purchaser} />
                                                </GridItem>
                                                <GridItem xs={12} sm={4} className={classes.center}>
                                                    <TextField onChange={handleJobEdit} name="salesPrice" margin="dense" variant="outlined" label="Sales Price" value={jobState.salesPrice} />
                                                </GridItem>
                                                <GridItem xs={12} sm={4} className={classes.center}>
                                                    <TextField onChange={handleJobEdit} name="special" margin="dense" variant="outlined" label="Special" value={jobState.special} />
                                                </GridItem>
                                                <GridItem xs={12} sm={4} className={classes.center}>
                                                    <TextField onChange={handleJobEdit} name="cashLot" margin="dense" variant="outlined" label="Cash Lot" value={jobState.cashLot} />
                                                </GridItem>
                                            </GridContainer>
                                        </>}

                                        {highlight.options &&
                                            <>
                                                <div style={{ textAlign: "center" }}>
                                                    <button style={{ minWidth: "150px", margin: "2px" }} onClick={() => setStatus(setPlanHighlight, "standard")}>Standard and Forced</button>
                                                    <button style={{ minWidth: "150px", margin: "2px" }} onClick={() => setStatus(setPlanHighlight, "override")}>Override</button>

                                                    {planHighlighlight.standard &&
                                                        <>
                                                            <h4>Standard & Forced Options</h4>
                                                            <input className={"options-input"} placeholder="Search Options" ref={inpref} type="text" onChange={filterValCopy} />
                                                            <br />
                                                            {inp && (
                                                                <>
                                                                    <p className={"greyp"}>{v.length} items found </p>{" "}
                                                                    <button onClick={clearSearchCopy}>Clear</button>
                                                                </>
                                                            )}
                                                            <hr />
                                                            <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
                                                                {selectedOne.length &&
                                                                    selectedOne.map((x) => (
                                                                        <p className={x.OptionForced} onClick={returnVal} data-id={x.id} key={x.id}>
                                                                            {x.SalesDescription}
                                                                        </p>
                                                                    ))}
                                                            </div>
                                                            <hr className={"hr"} />
                                                            <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
                                                                {inp
                                                                    ? v.map((x) => (
                                                                        <p className={x.OptionForced} onClick={addSearchSelected} data-id={x.id} key={x.id}>
                                                                            {x.SalesDescription}
                                                                        </p>
                                                                    ))
                                                                    : allOptions.map((x) => (
                                                                        <p className={x.OptionForced} onClick={addSelected} data-id={x.id} key={x.id}>
                                                                            {x.SalesDescription}
                                                                        </p>

                                                                    ))}
                                                            </div>
                                                        </>}
                                                    {planHighlighlight.override &&

                                                        <>
                                                            <h4>Forced Override Options</h4>

                                                            <input className={"options-input"} placeholder="Search Options Override" ref={oinpref} type="text" onChange={overridefilterValCopy} />
                                                            <br />
                                                            {inpo && (
                                                                <>
                                                                    <p className={"greyp"}>{ov.length} items found </p>{" "}
                                                                    <button onClick={overrideclearSearchCopy}>Clear</button>
                                                                </>
                                                            )}
                                                            <hr />
                                                            <div style={{ maxHeight: "200px", overflowY: "scroll" }}>

                                                                {overrideselectedOne.length &&
                                                                    overrideselectedOne.map((x) => (
                                                                        <p className={x.OptionForced} onClick={overridereturnVal} data-id={x.id} key={x.id}>
                                                                            {x.SalesDescription}
                                                                        </p>
                                                                    ))}
                                                            </div>
                                                            <hr className={"hr"} />
                                                            <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
                                                                {inpo
                                                                    ? ov.map((x) => (
                                                                        <p className={x.OptionForced} onClick={overrideaddSearchSelected} data-id={x.id} key={x.id}>
                                                                            {x.SalesDescription}
                                                                        </p>
                                                                    ))
                                                                    :
                                                                    overrideOptions.map((x) => (
                                                                        <p className={x.OptionForced} onClick={overrideaddSelected} data-id={x.id} key={x.id}>
                                                                            {x.SalesDescription}
                                                                        </p>
                                                                    ))}
                                                            </div>
                                                        </>}
                                                </div>
                                            </>}
                                        {highlight.plan &&
                                            <>
                                                <GridContainer>
                                                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                                                        <TextField margin="dense" name="plan" value={planState.plan} onChange={handlePlanEdit} variant="outlined" label="Plan" InputLabelProps={{
                                                            shrink: true,
                                                        }} />
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                                                        <TextField margin="dense" onChange={handlePlanEdit} name="elevation" variant="outlined" label="Elevation" value={planState.elevation} />
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                                                        <TextField margin="dense" onChange={handlePlanEdit} name="garageSwing" variant="outlined" label="Garage Swing" value={planState.garageSwing} />
                                                    </GridItem>
                                                </GridContainer>

                                                <GridContainer>
                                                    {/* <GridItem xs={12} sm={4} md={4} className={classes.center}>
                                                        <TextField margin="dense" onChange={handlePlanEdit} name="special" variant="outlined" label="Special" InputLabelProps={{
                                                            shrink: true,
                                                        }} value={planState.special} />
                                                    </GridItem> */}
                                                    <GridItem xs={12} sm={4} className={classes.center}>
                                                        <TextField margin="dense" onChange={handlePlanEdit} name="foundationDesign" variant="outlined" label="Foundation Design"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }} value={planState.foundationDesign} />
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4} className={classes.center}>
                                                        <TextField margin="dense" onChange={handlePlanEdit} name="brickSelection1" variant="outlined" label="Brick Selection 1" InputLabelProps={{
                                                            shrink: true,
                                                        }} value={planState.brickSelection1} />
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4} className={classes.center}>
                                                        <TextField margin="dense" onChange={handlePlanEdit} name="brickSelection2" variant="outlined" label="Brick Selection 2" InputLabelProps={{
                                                            shrink: true,
                                                        }} value={planState.brickSelection2} />
                                                    </GridItem>
                                                </GridContainer>

                                                <GridContainer>

                                                    <GridItem xs={12} sm={6} className={classes.center}>
                                                        <TextField margin="dense" onChange={handlePlanEdit} name="additionalNotes" multiline
                                                            rows={4} variant="outlined" label="Additional Notes" InputLabelProps={{
                                                                shrink: true,
                                                            }} value={planState.additionalNotes} />
                                                    </GridItem>

                                                    <GridItem xs={12} sm={6} className={classes.center}>
                                                        <FormControlLabel
                                                            control={
                                                                <Switch
                                                                    checked={planState.specialStatus}
                                                                    onChange={handlePlanEdit} name="specialStatus"
                                                                    color="secondary"
                                                                />
                                                            }
                                                            label="Special"
                                                        />
                                                        {planState.specialStatus && <TextField margin="dense" onChange={handlePlanEdit} name="special" multiline
                                                            rows={2} variant="outlined" label="Special" InputLabelProps={{
                                                                shrink: true,
                                                            }} value={planState.special} />}

                                                    </GridItem>
                                                </GridContainer>
                                                <GridContainer>
                                                    <GridItem xs={12} sm={6}>
                                                        <FormGroup row>
                                                            <FormControlLabel
                                                                control={<Switch checked={planState.droppedGarageStatus} onChange={handlePlanEdit} name="droppedGarageStatus" color="secondary" />}
                                                                label="Dropped Garage"
                                                            />
                                                            {planState.droppedGarageStatus && <TextField margin="dense" variant="outlined" label="More Info" onChange={handlePlanEdit} placeholder="Test Content" name="droppedGarage" value={planState.droppedGarage} InputLabelProps={{
                                                                shrink: true,
                                                            }} />}

                                                        </FormGroup>
                                                    </GridItem>

                                                    <GridItem xs={12} sm={6}>
                                                        <FormGroup row>
                                                            <FormControlLabel
                                                                control={
                                                                    <Switch
                                                                        checked={planState.enhancedLotStatus}
                                                                        onChange={handlePlanEdit} name="enhancedLotStatus"
                                                                        color="secondary"
                                                                    />
                                                                }
                                                                label="Enhanced Lot"
                                                            />
                                                            {planState.enhancedLotStatus && <TextField margin="dense" variant="outlined" label="More Info" onChange={handlePlanEdit} name="enhancedLot" value={planState.enhancedLot} InputLabelProps={{
                                                                shrink: true,
                                                            }} />}


                                                        </FormGroup>
                                                    </GridItem>
                                                </GridContainer>
                                                <GridContainer>
                                                    <GridItem xs={12} sm={6}>
                                                        <FormControl component="fieldset">
                                                            <FormLabel style={{ margin: 0 }} component="legend">Water Injection / Moisture Injection</FormLabel>
                                                            <RadioGroup aria-label="waterMoisture" name="waterMoisture" value={planState.waterMoisture} onChange={handlePlanEdit}>
                                                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                                <FormControlLabel value="No" control={<Radio />} label="No" />
                                                                <FormControlLabel value="Needs Info" control={<Radio />} label="Needs Info" />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </GridItem>

                                                    <GridItem xs={12} sm={6}>
                                                        <FormControl component="fieldset">
                                                            <FormLabel style={{ margin: 0 }} component="legend">Piers</FormLabel>
                                                            <RadioGroup aria-label="piers" name="piers" value={planState.piers} onChange={handlePlanEdit}>
                                                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                                <FormControlLabel value="No" control={<Radio />} label="No" />
                                                                <FormControlLabel value="Needs Info" control={<Radio />} label="Needs Info" />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </GridItem>
                                                </GridContainer>
                                            </>}
                                        {highlight.personnel &&
                                            <>
                                                <GridContainer>
                                                    <GridItem xs={12} sm={4} className={classes.center}>
                                                        <TextField margin="dense" variant="outlined" label="Div. Const. Mgr." onChange={handlePersonnelEdit} name="divConstMgr" value={personnelState.divConstMgr} InputLabelProps={{
                                                            shrink: true,
                                                        }} />
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4} className={classes.center}>
                                                        <TextField margin="dense" variant="outlined" label="Const. Mgr." onChange={handlePersonnelEdit} name="constMgr" value={personnelState.constMgr} InputLabelProps={{
                                                            shrink: true,
                                                        }} />
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4} className={classes.center}>
                                                        <TextField margin="dense" variant="outlined" label="Div. sales Mgr." onChange={handlePersonnelEdit} name="divSalesMgr" value={personnelState.divSalesMgr} InputLabelProps={{
                                                            shrink: true,
                                                        }} />
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4} className={classes.center}>
                                                        <TextField margin="dense" variant="outlined" label="Sales Counselor" onChange={handlePersonnelEdit} name="salesCounselor" value={personnelState.salesCounselor} InputLabelProps={{
                                                            shrink: true,
                                                        }} />
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4} className={classes.center}>
                                                        <TextField margin="dense" variant="outlined" label="Edited By" onChange={handlePersonnelEdit} name="editedBy" value={personnelState.editedBy} InputLabelProps={{
                                                            shrink: true,
                                                        }} />
                                                    </GridItem>
                                                </GridContainer>
                                            </>}
                                    </fieldset>
                                </GridItem>
                            </GridContainer>
                            {/* <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <fieldset className={clsx(classes.fieldset, classes.my2)}>
                                        <legend>Email Recipients</legend>

                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <FormControl component="fieldset" className={classes.formControl}>
                                                  
                                                    <FormGroup>
                                                        <FormControlLabel
                                                            control={<Checkbox checked={dfwOps} onChange={handleChange} name="dfwOps" />}
                                                            label="DFW Ops"
                                                        />
                                                        <FormControlLabel
                                                            control={<Checkbox checked={houstonOps} onChange={handleChange} name="houstonOps" />}
                                                            label="Houston Ops"
                                                        />
                                                        <FormControlLabel
                                                            control={<Checkbox checked={austinOps} onChange={handleChange} name="austinOps" />}
                                                            label="Austin Ops"
                                                        />
                                                        <FormControlLabel
                                                            control={<Checkbox checked={sanAntonioOps} onChange={handleChange} name="sanAntonioOps" />}
                                                            label="San Antonio Ops"
                                                        />
                                                        <FormControlLabel
                                                            control={<Checkbox checked={archServAdmin} onChange={handleChange} name="archServAdmin" />}
                                                            label="Architecture Services Admin"
                                                        />
                                                    </FormGroup>
                                                </FormControl>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <FormControl component="fieldset" className={classes.formControl}>
                                                  
                                                    <FormGroup>

                                                        <FormControlLabel
                                                            control={<Checkbox checked={dfwPurchase} onChange={handleChange} name="dfwPurchase" />}
                                                            label="DFW Purchasing"
                                                        />
                                                        <FormControlLabel
                                                            control={<Checkbox checked={houstonPurchase} onChange={handleChange} name="houstonPurchase" />}
                                                            label="Houston Purchasing"
                                                        />
                                                        <FormControlLabel
                                                            control={<Checkbox checked={austinPurchase} onChange={handleChange} name="austinPurchase" />}
                                                            label="Austin Purchasing"
                                                        />
                                                        <FormControlLabel
                                                            control={<Checkbox checked={sanAntonioPurchase} onChange={handleChange} name="sanAntonioPurchase" />}
                                                            label="San Antonio Purchasing"
                                                        />
                                                    </FormGroup>
                                                </FormControl>
                                            </GridItem>


                                            <GridItem xs={12} sm={12} md={12} className={classes.my2}>

                                                <Autocomplete
                                                    multiple
                                                    id="tags-outlined"
                                                    options={email}
                                                    getOptionLabel={(option) => option.email}
                                                    fullWidth={true}
                                                    defaultValue={
                                                        [email[1],
                                                        email[2],
                                                        email[3],
                                                        email[4]]}
                                                    filterSelectedOptions
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
                                                            label="Email Addresses"
                                                            placeholder="Add Email(s)"
                                                        />
                                                    )}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </fieldset>
                                </GridItem>
                            </GridContainer> */}
                        </CardBody>
                    </CustomCard>
                </GridItem>

                <GridItem xs={12} sm={12} md={7}>
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
                                <legend>Start Memo</legend>
                                {/* <GridContainer>
                                    {[1,2,3,4,5].map(x => <GridItem key={x} xs={12} sm={4} md={4} className={classes.center}>
                                        <TextField disabled className={classes.darkText} color="primary" margin="dense" variant="outlined" label={x} value={x} />
                                    </GridItem>)}
                                    </GridContainer> */}

                                <GridContainer>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled className={classes.darkText} color="primary" margin="dense" variant="outlined" label="Job Number" value="00281-081" />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Job Start Date" value={memoState.jobStartDate} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Edited on Date" value={memoState.editedDate} />
                                    </GridItem>
                                </GridContainer>

                            </fieldset>

                            <fieldset className={classes.fieldset}>
                                <legend>Location</legend>

                                <GridContainer>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Region City" defaultValue="Dallas" />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Brand" defaultValue="Highland Dallas" />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Subdivision" defaultValue="Prairie View" />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Address" defaultValue="13924 Round Prairie Lane" />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="City, State, Zip" defaultValue="Frisco, TX 75035" />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="County" defaultValue="Collin" />
                                    </GridItem>
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
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled className={classes.darkText} color="primary" margin="dense" variant="outlined" label="Memo Type" value={memoState.memoType} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Put on PH Date" value={memoState.putOnPHDate} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Released from PH" value={memoState.releasedFromPHDate} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Sold" value={memoState.soldDate} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Purchaser" value={jobState.purchaser} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Sales Price" value={jobState.salesPrice} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Special" value={jobState.special} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Cash Lot" value={jobState.cashLot} />
                                    </GridItem>
                                </GridContainer>
                            </fieldset>

                            <fieldset className={classes.fieldset}>
                                <legend>Plan</legend>

                                <GridContainer>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Plan" value={planState.plan} InputLabelProps={{
                                            shrink: true,
                                        }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4}  className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Elevation" value={planState.elevation} InputLabelProps={{
                                            shrink: true,
                                        }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4}  className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Garage Swing" value={planState.garageSwing} InputLabelProps={{
                                            shrink: true,
                                        }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Special" InputLabelProps={{
                                            shrink: true,
                                        }} value={planState.special} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4}  className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Dropped Garage(Inches)" InputLabelProps={{
                                            shrink: true,
                                        }} value={(planState.droppedGarageStatus ? 'Yes - ' : "No") + planState.droppedGarage} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4}  className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Piers" InputLabelProps={{
                                            shrink: true,
                                        }} value={planState.piers} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Water Injection / Moisture Conditioning" InputLabelProps={{
                                            shrink: true,
                                        }} value={planState.waterMoisture} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Foundation Design"
                                            InputLabelProps={{
                                                shrink: true,
                                            }} value={planState.foundationDesign} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Enhanced Lot" InputLabelProps={{
                                            shrink: true,
                                        }} value={(planState.enhancedLotStatus ? "Yes - " : "No") + planState.enhancedLot} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Brick Selection 1" InputLabelProps={{
                                            shrink: true,
                                        }} value={planState.brickSelection1} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Brick Selection 2" InputLabelProps={{
                                            shrink: true,
                                        }} value={planState.brickSelection2} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Additional Notes" InputLabelProps={{
                                            shrink: true,
                                        }} value={planState.additionalNotes} />
                                    </GridItem>
                                </GridContainer>
                                <hr className={"hr"} />
                                <GridContainer style={{ marginTop: "10px" }}>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <Typography>Selected</Typography>
                                        {filterOptions(selectedOne, "standard").map(x => <p className={x.OptionForced} key={x.id}>{x.SalesDescription}</p>)}

                                    </GridItem>
                                    <GridItem xs={12} sm={4}  className={classes.center}>
                                        <Typography>Forced</Typography>
                                        {filterOptions(selectedOne, "forced").map(x => <p className={x.OptionForced} key={x.id}>{x.SalesDescription}</p>)}
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={4} className={classes.center}>
                                        <Typography>Override</Typography>
                                        {filterOptions(overrideselectedOne, "override").map(x => <p className={x.OptionForced} key={x.id}>{x.SalesDescription}</p>)}
                                    </GridItem>
                                </GridContainer>
                                <hr className={"hr"} />

                            </fieldset>
                            <fieldset className={classes.fieldset}>
                                <legend>Personnel</legend>

                                <GridContainer>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Div. Const. Mgr." value={personnelState.divConstMgr} InputLabelProps={{
                                            shrink: true,
                                        }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Const. Mgr." value={personnelState.constMgr} InputLabelProps={{
                                            shrink: true,
                                        }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Div. sales Mgr." value={personnelState.divSalesMgr} InputLabelProps={{
                                            shrink: true,
                                        }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Sales Counselor" value={personnelState.salesCounselor} InputLabelProps={{
                                            shrink: true,
                                        }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} className={classes.center}>
                                        <TextField disabled margin="dense" variant="outlined" label="Edited By" value={personnelState.editedBy} InputLabelProps={{
                                            shrink: true,
                                        }} />
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
            </GridContainer>
        </>
    )
}