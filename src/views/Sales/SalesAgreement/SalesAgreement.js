
import React, {useState, useEffect, useMemo, forwardRef} from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from "@material-ui/core/Grid";
// import TextField from '@material-ui/core/TextField';
// import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from '@material-ui/core/Paper';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';

// import Close from "@material-ui/icons/Close";

// import MaterialTable from 'material-table';
import SalesTables from './SalesTables';

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button";
// import Card from "components/Card/Card";
// import CardBody from "components/Card/CardBody";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import Constants from 'constants/Constants'
import styles from "./Styles";
import {
  getAllProjects,
  // getProjectByQuery,
  // getProjectByRegionNumber,
  // getProjectByAreaNumber,
  // getProjectByProjectNumber
} from 'services/FetchService';
import {selector, useRecoilValueLoadable} from 'recoil';
// import payLoad from 'services/DataRefinerService';
// import Loader from 'components/Loader/Loader';



export const fetchJobDetailsState = selector({
  key: "fetchJobDetailsState",
  get: async ({get}) => {
    try{
      const response = await getAllProjects.get().then(response => response.data);     
      // const {communities, addresses, refinedData, mappedCommunities} = payLoad(response);
      // console.log("All response value: ",payLoad(response));
      // return {communities, addresses, refinedData, mappedCommunities};
     
      }catch(e){
        throw e
      }
    }
});






// const salesColumnz = 
// [
//   { id: 'JobNumber', label: 'Job Number', minWidth: 150},
//   { id: 'ProjectName', label: 'Project Name', minWidth: 250 },
//   { id: 'Address', label: 'Address', minWidth: 250 },
//   { id: 'City', label: 'City', minWidth: 250 },
//   { id: 'State', label: 'State', minWidth: 10 },
//   { id: 'Zip', label: 'Zip', minWidth: 10 },
//   { id: 'County', label: 'County', minWidth: 150},
//   { id: 'Plan', label: 'Plan', minWidth: 150 },
//   { id: 'Elevation', label: 'Elevation', minWidth: 10},
//   { id: 'PurchaserName', label: 'Purchaser Name', minWidth: 350 },
//   { id: 'SalesPrice', label: 'Sales Price', minWidth: 50}
// ];


// const columns = salesColumnz;
const useStyles = makeStyles(styles);
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const steps = {
  next: [false, false],
  count: 0
};


export default function SalesAgreement() {

// Temporary fetch call
 async function fetchData(){
  try{
    const response = await getAllProjects().then(response => response.data); 
    console.log("Inside Response: ", response);    
   
    }catch(e){
      throw e
    }

 }

 useEffect(() => {
     try {
   
    fetchData();
    
    }
    catch(err) {
      console.log(err);
    };
  }, []);



const fetchedData = useRecoilValueLoadable(fetchJobDetailsState);
const fetchDetails = useMemo(() => fetchedData, [fetchedData]);

  const classes = useStyles();
  // const getDataValue = (data, id) =>{
  //   const newData = data.find(value => +value.JobID === id);
  //   return newData;
  // }
  
  const getDataAddress = (data, receivedAddy) =>{
    const newData = data.find(value => value.Address === receivedAddy);
    console.log("Content of new data inside getDataAddress: ", newData)
    return newData;
  }

  const [step, setStep] = useState(steps);
  const [open, setOpen] = useState(false);
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  

  const [communityName, setCommunityName] = useState(null);
  const [addressDetails, setAddressDetails] = useState(null);

    
  const changeCommunity = (event, newValue) => {
    let nextSt = step.next;
    nextSt.splice(step.count, 1, true);
    setStep({...step, next: nextSt, count: step.count + 1});
    setCommunityName(newValue);
  }

  const changeAddress = (event, newValue) => {
    let nextSt = step.next;
    nextSt.splice(step.count, 1, true);
    setStep({...step, next: nextSt, count: step.count + 1});
    setAddressDetails(newValue);
  }
  useEffect(() => {
    return function cleanup() {
      let id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });

  const handleClose = () => {
    setOpen(false);
    setStep(Object.assign(steps, {
      next: [false, false],
      count: 0
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  }
  const goToPage = () => {
    console.log("Is gotopage working???");
    setOpen(false);
    setStep(Object.assign(steps, {
      next: [false, false],
      count: 0
    }))
  }
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

// const rows = data;

// if(!rows){
//   return "...loading";
// } 

let comm = [], mappedAddy={};
if(fetchDetails.state === "hasValue"){
  const {contents:{communities}} = fetchDetails;
  // const {contents:{addresses}} = fetchDetails;
  const {contents:{mappedCommunities}} = fetchDetails;
  comm = communities;
  mappedAddy = mappedCommunities; 
  console.log(fetchDetails.contents.refinedData);
 
}

  return (
    <div>  
       <Grid
          container 
          justify="flex-end"
          alignItems="flex-end">
            <Button
              color="info"
              className={classes.marginRight}
              onClick={handleOpen}>
              Create Agreement
            </Button>
        </Grid>

        <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Select Existing Agreement</DialogTitle>
        <DialogContent>
          <FormControl variant="outlined" className={classes.formControl}>
        {/* <InputLabel htmlFor="Community">Community</InputLabel> */}
       
        <Autocomplete
            id="community"
            options={comm}
            onChange={changeCommunity}
            name="community"
            getOptionLabel={(option) => option}
            // style={{ width: 300 }}
            renderInput={(params) => <TextField {...params}  label="Community" variant="outlined" />}
          />
      </FormControl>
      {steps.next[0] ?     <FormControl variant="outlined" className={classes.formControl}>
      <Autocomplete
            id="address"
            options={mappedAddy[communityName]}
            onChange={changeAddress}
            getOptionLabel={(option) => option}
            // style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Address" name="address" variant="outlined" />}
          />
      </FormControl> : null} 
  
        </DialogContent>
      {steps.next[1] ?  <div className={`${classes.center} ${classes.marginBottom}` }>
        <Button variant="contained" onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Link to={{pathname: `/admin/sales-details/${addressDetails}`, state: getDataAddress(fetchDetails.contents.refinedData, addressDetails)}}>
      <Button variant="contained" onClick={goToPage} color="info">
        View
      </Button>
      </Link>
     
    </div>: null }
   
      </Dialog>
                      
      <GridContainer>
        <GridItem xs={12}>
        <Paper className={classes.root}>
      <SalesTables /> 
    
    </Paper>
        </GridItem>
      </GridContainer>  
     
    </div>   
  );
};
