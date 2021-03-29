import React, {useState, useMemo} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import Button from '@material-ui/core/Button';

// import {useRecoilValueLoadable} from 'recoil';
// import {fetchJobDetailsState} from './SalesAgreement';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import clsx from 'clsx';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PrintIcon from '@material-ui/icons/Print';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import Image from 'material-ui-image';
import logo from 'assets/img/corporate/HighlandHomes_Plum_RGB.png';


const salesData = [
  {title: 'Affiliated Business Disclosure (Lending)', index:0},
  {title: 'Affiliated Business Disclosure (Title)', index: 1},
  {title: 'Artisan Community Specification Guidelines', index: 2},
  {title: 'Artisan Design Center Guidelines', index: 3},
  {title: 'Artisan Series Standard Contract Specifications', index: 4},
  {title: 'Artisan Wiring Instructions', index: 5},
  {title: 'Build Loan Process Milestones', index: 6},
  {title: 'Builder Limited Warranty', index: 7},
  {title: 'Buyer Lender Information', index: 8},
  {title: 'Change Order', index: 9},
  {title: 'Contingent Sale Addendum', index: 10},
  {title: 'Design Center Guidelines', index: 11},
  {title: 'Disclosures and Limitation of Liability Addendum', index: 12},
  {title: 'Estimated Closing Date', index: 13},
  {title: 'Granite Countertop Disclosure', index: 14},
  {title: 'Loan Guidelines', index: 15},
  {title: 'Optional Preferred Lender Incentive Addendum', index: 16},
  {title: 'Phone Cable TV and Internet Services Disclosure', index: 17},
  {title: 'Primary Residence Addendum', index: 18},
  {title: 'Quartz Countertops Disclosure', index: 19},
  {title: 'Quick Quote', index: 20},
  {title: 'Realtor Addendum', index: 21},
  {title: 'Sales Agreement', index: 22},
  {title: 'Utilities Transfer At Closing', index: 23},
  {title: 'Utility District Notice', index: 24},
  {title: 'VA FHA Addendum', index: 25},
  {title: 'Wood Floors Care and Maintenance Damage Disclosure', index: 26}
]
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];

const columns = [
  { field: 'id', headerName: 'OPTION CODE', width: 130 },
  { field: 'firstName', headerName: 'SALES DESCRIPTION', width: 180 },
  { field: 'lastName', headerName: 'QTY', width: 70 },
  {
    field: 'age',
    headerName: 'UNIT PRICE',
    type: 'number',
    width: 120,
  },
  {
    field: 'fullName',
    headerName: 'TOTAL PRICE',
    // sortable: false,
    type: 'number',
    width: 120,
    valueGetter: (params) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
      },
      button: {
        margin: theme.spacing(1),
      },
      lroot: {
        width: '100%',
        // backgroundColor: theme.palette.background.paper,
      },
      inline: {
        display: 'inline',
      },
      hide: {
        display: 'none'
      },
      list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: "100vh",
      },

      media: {
        height: 0,
        width: '100%',
        maxWidth: 200,
        paddingTop: '25%', // 16:9
      },
      paper: {
        padding: theme.spacing(2),
        // textAlign: 'center',
        color: theme.palette.text.secondary,
      },
  }));
 
const SalesDetails = () => {
const history = useHistory();
// const jobDetailsLocal = useRecoilValueLoadable(fetchJobDetailsState);

// const fetchDetails = useMemo(() => jobDetailsLocal, [jobDetailsLocal]);
const [page, setPage] = useState(22)
// const [selectedDate, setSelectedDate] = useState(new Date().toISOString());


const classes = useStyles();
const [hide, setHide] = useState(false);
const hideGrid = () => {
    setHide(!hide);
};
// const handleDateChange = (date) => {
//   setSelectedDate(date);
// };
const goHome = () => {
    history.push('/admin/sales-agreement')
};
const {state} =useLocation();

const stateval = useMemo(() => state ,[state])
    return (
        <>
<div className={classes.lroot}>
<Button
        variant="contained"
        onClick={hideGrid}
        onMouseOver={(e) => e.target.style.cursor = "pointer"}
        className={classes.button}
        startIcon= {hide ? <VisibilityIcon /> : <VisibilityOffIcon  /> }
      >
        {hide ? `Show Agreement` : `Hide Agreement`}
      </Button>
      <Button
        variant="contained"
        onClick={goHome}
        className={classes.button}
        startIcon={<ArrowBackIcon />}
      >
        Go Back
      </Button>     
    </div>

    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item md={3} xs={12} className={clsx({[classes.hide]: hide})} >
          <Paper className={classes.paper}>
          <List component="nav" className={classes.list} aria-label="contacts">
            {salesData.map(x => <ListItem key={x.index + "0"} button>
                    <ListItemIcon key={x.index + "1"}>
                    <CheckIcon key={x.index + "2"}/>
                    </ListItemIcon>
                    <ListItemText onClick={() => setPage(x.index)} key={x.index + "3"} primary={x.title} />
                </ListItem> )}
                
            </List>
          </Paper>
        </Grid>

        {page === 22 && <Grid item  md={hide ? 12 : 9} xs={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                  <Paper className={classes.paper}>
                  <Autocomplete
                      id="builderList"
                      options={top100Films}
                      getOptionLabel={(option) => option.title}
                      renderInput={(params) => <TextField {...params} label="Builder" variant="outlined" />}
                    />

                  <Autocomplete
                      id="optionList"
                      options={top100Films}
                      getOptionLabel={(option) => option.title}
                      xs={12} md={4}
                      renderInput={(params) => <TextField style={{marginTop: "3rem"}} {...params} label="Option Category" variant="outlined" />}
                    />
                  <Autocomplete
                      id="optionDetails"
                      options={top100Films}
                      getOptionLabel={(option) => option.title}
                      xs={12} md={4}
                      renderInput={(params) => <TextField style={{marginTop: "3rem"}} {...params} label="Option" variant="outlined" />}
                    />
                     <Grid item xs={12} md={12}>
                        <Grid container>
                          <Grid item xs={12} md={4}>
                            <TextField
                              style={{width: "98%", marginTop: "3rem"}}
                              id="quantity"
                              label="QUANTITY:"
                              defaultValue="1"
                              // InputProps={{
                              //   readOnly: true,
                              // }}
                              variant="outlined"
                          />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              style={{width: "98%", marginTop: "3rem"}}
                                  id="unitPrice"
                                  label="UNIT PRICE:"
                                  defaultValue="500"
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                  variant="outlined"
                                />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              style={{width: "98%", marginTop: "3rem"}}
                                  id="totalPrice"
                                  label="TOTAL PRICE:"
                                  defaultValue="500"
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                  variant="outlined"
                                />
                          </Grid>
                          <Grid item xs={12} style={{textAlign: "right"}}>
                          <Button
                            style={{marginTop: "2rem"}}
                              variant="contained"
                              // onClick={goHome}
                              className={classes.button}
                              startIcon={<AddToQueueIcon />}
                            >
                              Add Option
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                     
                  </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Paper className={classes.paper}>
                    <Grid container>             
                    <Grid item xs={12} style={{textAlign: "right"}}>
                          <Button
                              variant="contained"
                              // onClick={goHome}
                              className={classes.button}
                              startIcon={<PrintIcon />}
                            >
                              Print
                            </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={4}></Grid>
                          <Grid item xs={4} style={{height: 50}}>
                                <Image
                                imageStyle={{width: '100%', height: '50px'}}
                                      src={logo}
                                    />
                          </Grid>
                          <Grid item xs={4}></Grid>
                        </Grid>
                        
                      </Grid>
                      <Grid item xs={6} md={6} style={{textAlign: "center"}}>
                      <TextField
                       style={{width: "50%", marginTop: "3rem"}}
                          id="date"
                          label="CREATED ON"
                          type="date"
                          defaultValue="2020-09-28"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} md={6} style={{textAlign: "center"}}>
                        <TextField
                        style={{width: "50%", marginTop: "3rem"}}
                            id="projJob"
                            label="PROJ-JOB:"
                            defaultValue={stateval?.JobNumber}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                        style={{width: "95%", marginTop: "3rem"}}
                            id="submittedBy"
                            label="SUBMITTED BY:"
                            defaultValue="Submittor Name"
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                        style={{width: "95%", marginTop: "3rem"}}
                            id="submittorEmail"
                            label="SUBMITTOR EMAIL:"
                            defaultValue="Submittor Email"
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                        style={{width: "95%", marginTop: "3rem"}}
                            id="community"
                            label="COMMUNITY:"
                            defaultValue={stateval?.ProjectName}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                        style={{width: "95%", marginTop: "3rem"}}
                            id="address"
                            label="ADDRESS:"
                            defaultValue={stateval?.Address}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                        style={{width: "95%", marginTop: "3rem"}}
                            id="buyer"
                            label="BUYER:"
                            defaultValue={stateval?.PurchaserName}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                        style={{width: "95%", marginTop: "3rem"}}
                            id="builder"
                            label="BUILDER:"
                            defaultValue="Builder Details"
                            InputProps={{
                              readOnly: true,
                            }}
                            
                          />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                        style={{width: "95%", marginTop: "3rem"}}
                            id="plan"
                            label="PLAN:"
                            defaultValue={stateval?.Plan}
                            InputProps={{
                              readOnly: true,
                            }}
                            variant="outlined"
                          />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Grid container>
                          <Grid item xs={6} md={6}>
                            <TextField
                              style={{width: "98%", marginTop: "3rem"}}
                              id="elevation"
                              label="ELEVATION:"
                              defaultValue={stateval?.Elevation}
                              InputProps={{
                                readOnly: true,
                              }}
                              variant="outlined"
                          />
                          </Grid>
                          <Grid item xs={6} md={6}>
                            <TextField
                              style={{width: "98%", marginTop: "3rem"}}
                                  id="stage"
                                  label="STAGE:"
                                  defaultValue="6"
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                  variant="outlined"
                                />
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <div style={{ height: 400, width: '100%', marginTop: "2rem" }}>
                          <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                    <Button
                      variant="contained"
                      // onClick={goHome}
                      className={classes.button}
                      startIcon={<DeleteIcon />}
                    >
                     Remove Selected Item(s)
                    </Button>
                    </Grid>
          
                    </Grid>
                  </Paper>
                </Grid>
           </Grid>
          </Paper>
        </Grid>}

        {page === 0 && <Grid item  md={hide ? 12 : 9} xs={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                  </Grid>
                  Inside Affiliated Business Disclosure(lending)
                  </Grid>
                  </Paper>
                  </Grid>}
                  {page === 1 && <Grid item  md={hide ? 12 : 9} xs={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                  </Grid>
                  Inside Affiliated Business Disclosure(Title)
                  </Grid>
                  </Paper>
                  </Grid>}
                  {page === 2 && <Grid item  md={hide ? 12 : 9} xs={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                  </Grid>
                  Inside Artisan Community Specification
                  </Grid>
                  </Paper>
                  </Grid>}

        
      </Grid>
    </div>
        </>
    )
};

export default SalesDetails;