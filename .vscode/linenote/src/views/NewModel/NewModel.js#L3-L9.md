* Recreate component already pre-populated

- SalesAgreement fetches the data via dataService from FetchService
- N.B. FetchService invokes endpoint from Constants
- http-common.js makes the call via axios object creation (Which also invokes baseUrl from Constants creates a string as ff: baseUrl/endPoint e.g. codemo.highlandhomes.com/JobDetails)
- Recoil selector in Sales Agreement will refine and expose the data to all subscribers
- Sales Table subscribed to the selector offering and gets the data.


- Recoil's useRecoilValueLoadable hook is intended to be used for reading the value of asynchronous selectors. This hook will implicitly subscribe the component to the given state.
- Content available for display on page




* Code Base

- imports in table subscribing to data
 `import {useRecoilValueLoadable} from 'recoil';`
`import {fetchJobDetailsState} from './SalesAgreement';`

- check data arrival
    `let comm = [], mappedAddy={};
    if(fetchDetails.state === "hasValue"){
    const {contents:{communities}} = fetchDetails;
    // const {contents:{addresses}} = fetchDetails;
    const {contents:{mappedCommunities}} = fetchDetails;
    comm = communities;
    mappedAddy = mappedCommunities; 
    console.log(fetchDetails.contents.refinedData);
    
    }`

-  Open dialog and auto complete
`<Dialog open={open} onClose={handleClose} TransitionComponent={Transition} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Select Existing Agreement</DialogTitle>
        <DialogContent>
          <FormControl variant="outlined" className={classes.formControl}>
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
    {console.log("Do we have address details yet: ", addressDetails)}
      <Link to={{pathname: `/admin/sales-details/${addressDetails}`, state: getDataAddress(fetchDetails.contents.refinedData, addressDetails)}}>
      <Button variant="contained" onClick={goToPage} color="info">
        View
      </Button>
      </Link>
    </div>: null }
      </Dialog>`
