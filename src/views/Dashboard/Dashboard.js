import React, {useMemo, useEffect} from "react";
// import ChartistGraph from "react-chartist";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
// import Icon from "@material-ui/core/Icon";

import {
    AreaChart, Area,LineChart, BarChart, Bar,  Line, XAxis, YAxis, Brush, CartesianGrid,Tooltip as TP, Legend,ResponsiveContainer
  } from 'recharts';

// @material-ui/icons
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";

// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
// import Table from "components/Table/Table";
import Button from "components/CustomButtons/Button";
// import Danger from "components/Typography/Danger";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
// import CardIcon from "components/Card/CardIcon";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";


import styles from "assets/jss/hhi-js-styles/views/dashboardStyle";

import priceImage1 from "assets/img/highhomes1.jpg";
import priceImage2 from "assets/img/highhomes2.jpg";
import priceImage3 from "assets/img/highhomes3.jpg";


// import {
//   getAllProjects,
//   getProjectByQuery,
//   getProjectByRegionNumber,
//   getProjectByAreaNumber,
//   getProjectByProjectNumber,
//   getJobsByProjectNumber } from  'services/FetchService';


const fetchQueries = [281, 282, 283, 284, 285, 286];

// const loadQueries = (arr,) => arr.map()

const useStyles = makeStyles(styles);
export default function Dashboard() {
  // const [datum, setDatum] = useState(null); 
 
//  /* ============== Fetch Function Start ================= */
//   async function fetchData(){
//     // Promise.all([getProjectByRegionNumber(10), getProjectByRegionNumber(11)])
//     // .then(function (results) {
//     //   const res1 = results[0];
//     //   const res2 = results[1];
//     //   console.log(res1, res2)
//     // });
//     const t0 = performance.now();
//     const v = []
//     // await Promise.all(
//       // Array.from({length: 1000}, (_,x) => getJobsByProjectNumber(281).then(response => v.push(response.data))));

//     let [call1, call2, call3, call4, call5] = await Promise.all([   
//       // use map to unpack list of region numbers
//       getJobsByProjectNumber(281).then(response => response.data),
//       getJobsByProjectNumber(282).then(response => response.data),
//       getJobsByProjectNumber(283).then(response => response.data),
//       getJobsByProjectNumber(284).then(response => response.data),
//       getJobsByProjectNumber(285).then(response => response.data)
//     ]);

//   //   // try{
//   //   //   const response = await dataService.getJobDetails().then(response => response.data);     
//   //   //   const {communities, addresses, refinedData, mappedCommunities} = payLoad(response);
//   //   //   console.log("All response value: ",payLoad(response));
//   //   //   return {communities, addresses, refinedData, mappedCommunities};
//   //   //   }catch(e){
//   //   //     throw e
//   //   //   }
//   //   // }

    
//     console.log("Call 1: ", await call1)
//     console.log("Call 2: ", await call2)
//     console.log("Call 3: ", await call3)
//     console.log("Call 4: ", await call4)
//     console.log("Call 5: ", await call5)
//     console.log(v);
//     const t1 = performance.now();
//     console.log(`Call to test performance took ${t1 - t0} milliseconds.`);
//   }

   /* ============== Fetch Function End ================= */
  
  // useEffect(() => {
  //   // try{
  //   //   fetchData('http://demoapi.highlandhomes.com:5000/api/Jobs/281')
  //   // }catch (e){
  //   //   console.log("Error: ", e)
  //   // }


  //   try {
   
  //   fetchData();
    
  //   }
  //   catch(err) {
  //     console.log(err);
  //   };
  // })
    const data =  useMemo(
        () =>
    [
      {
        name: 'Dallas', bid: 4000, sales: 2400, amt: 2400,
      },
      {
        name: 'Tarrant', bid: 3000, sales: 1398, amt: 2210,
      },
      {
        name: 'Fulshear', bid: 2000, sales: 9800, amt: 2290,
      },
      {
        name: 'Brazoria', bid: 2780, sales: 3908, amt: 2000,
      },
      {
        name: 'Harris', bid: 1890, sales: 4800, amt: 2181,
      },
      {
        name: 'Hays', bid: 2390, sales: 3800, amt: 2500,
      },
      {
        name: 'Bexar', bid: 3490, sales: 4300, amt: 2100,
      },
    ], []);
  const classes = useStyles();
  return (
    <div>

<h3>Current Trends</h3>
      <br />
<GridContainer>

    <GridItem xs={12} sm={12} md={4}>
        <Card product className={classes.cardHover}>   
            <CardBody>
            <h4>Sales-Bid Descriptives</h4>
                <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                        >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <TP />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="bid" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
                </div>
            </CardBody>
        </Card>
    </GridItem>

    
    <GridItem xs={12} sm={12} md={4}>
        <Card product className={classes.cardHover}>   
            <CardBody>
            <h4>Sales-Bid Descriptives</h4>
                <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <TP />
                    <Area type="monotone" dataKey="bid" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="sales" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
                </AreaChart>
                </ResponsiveContainer>
                </div>
            </CardBody>
        </Card>
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
        <Card product className={classes.cardHover}>   
            <CardBody>
            <h4>Sales-Bid Descriptives</h4>
                <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <TP />
                    <Legend />
                    <Bar dataKey="sales" fill="#8884d8" background={{ fill: '#eee' }} />
                    <Bar dataKey="bid" fill="#82ca9d" />
                </BarChart>
                </ResponsiveContainer>
                </div>
            </CardBody>
        </Card>
    </GridItem>
</GridContainer>

<GridContainer>

    <GridItem xs={12} sm={12} md={4}>
        <Card product className={classes.cardHover}>   
            <CardBody>
                
            <h4>June 2020</h4>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
        <LineChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <TP />
          <Line type="monotone" dataKey="bid" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
        </ResponsiveContainer>
                </div>
            </CardBody>
        </Card>
    </GridItem>

    
    <GridItem xs={12} sm={12} md={4}>
        <Card product className={classes.cardHover}>   
            <CardBody>
            <h4>July 2020</h4>
                <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                <LineChart
                    width={500}
                    height={200}
                    data={data}
                    syncId="anyId"
                    margin={{
                        top: 10, right: 30, left: 0, bottom: 0,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <TP />
                    <Line type="monotone" dataKey="sales" stroke="#82ca9d" fill="#82ca9d" />
                    <Brush />
                    </LineChart>
                    
                </ResponsiveContainer>
                </div>
            </CardBody>
        </Card>
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
        <Card product className={classes.cardHover}>   
            <CardBody>
            <h4>August 2020</h4>
                <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>

                <AreaChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <TP />
          <Area type="monotone" dataKey="sales" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
        </ResponsiveContainer>
                </div>
            </CardBody>
        </Card>
    </GridItem>
</GridContainer>



      <h3>New Listings</h3>
      <br />
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card product className={classes.cardHover}>
            <CardHeader image className={classes.cardHeaderHover}>
              <a href="#home" onClick={e => e.preventDefault()}>
                <img src={priceImage1} alt="..." />
              </a>
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="View"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <ArtTrack className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Edit"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="success" simple justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Remove"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="danger" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardProductTitle}>
                <a href="#home" onClick={e => e.preventDefault()}>
                4 bedroom house
                </a>
              </h4>
              <p className={classes.cardProductDesciprion}>
              A rare opportunity to purchase a superb four bedroom, This ultra-modern, open plan apartment simply oozes style and sophistication.
              </p>
            </CardBody>
            <CardFooter product>
              <div className={classes.price}>
                <h4>$245,890</h4>
              </div>
              <div className={`${classes.stats} ${classes.productStats}`}>
                <Place /> 333 Main Street, Dallas, 74023
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card product className={classes.cardHover}>
            <CardHeader image className={classes.cardHeaderHover}>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={priceImage2} alt="..." />
              </a>
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="View"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <ArtTrack className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Edit"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="success" simple justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Remove"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="danger" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardProductTitle}>
                <a href="#home" onClick={e => e.preventDefault()}>
                3 bedroom townhouse
                </a>
              </h4>
              <p className={classes.cardProductDesciprion}>
              A rare opportunity to purchase a superb four bedroom, This ultra-modern, open plan apartment simply oozes style and sophistication.
              </p>
            </CardBody>
            <CardFooter product>
              <div className={classes.price}>
                <h4>$523,560</h4>
              </div>
              <div className={`${classes.stats} ${classes.productStats}`}>
                <Place /> 101 Sanford Farm Center, Mickinney, 75035
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card product className={classes.cardHover}>
            <CardHeader image className={classes.cardHeaderHover}>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={priceImage3} alt="..." />
              </a>
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="View"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <ArtTrack className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Edit"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="success" simple justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Remove"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="danger" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardProductTitle}>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                2 bedroom duplex
                </a>
              </h4>
              <p className={classes.cardProductDesciprion}>
              This exemplary conversion of a traditional mill is an architectural triumph, showcasing the exceptional appearance.
              </p>
            </CardBody>
            <CardFooter product>
              <div className={classes.price}>
                <h4>$895,999</h4>
              </div>
              <div className={`${classes.stats} ${classes.productStats}`}>
                <Place /> 4765 Commercial Drive, Forney, 76023
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
