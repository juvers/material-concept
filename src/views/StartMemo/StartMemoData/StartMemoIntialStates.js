const steps = {
    next: [false, false],
    count: 0
};

const columns = [
    { field: 'id', headerName: 'Memo Type', width: 180 },
    { field: 'id', headerName: 'Original', width: 180 },
    { field: 'firstName', headerName: 'New', width: 180 },
    { field: 'lastName', headerName: 'Date', width: 180 },
    {
        field: 'age',
        headerName: 'Email',
        width: 180
    },
];

const rows = [{
        id: 1,
        lastName: 'Snow',
        firstName: '07/07/2020 08:13',
        age: "jburke@hhomesltd.com"
    },
    { id: 2, lastName: 'Spec', firstName: '07/07/2020 08:13', age: "jburke@hhomesltd.com" },
    { id: 3, lastName: 'Spec', firstName: '07/07/2020 08:13', age: "jburke@hhomesltd.com" },
    { id: 4, lastName: 'Spec', firstName: '07/07/2020 08:13', age: "jburke@hhomesltd.com" },
    { id: 5, lastName: 'Spec', firstName: '07/07/2020 08:13', age: "jburke@hhomesltd.com" },
    { id: 6, lastName: 'Spec', firstName: '07/07/2020 08:13', age: "jburke@hhomesltd.com" },
    { id: 7, lastName: 'Spec', firstName: '07/07/2020 08:13', age: "jburke@hhomesltd.com" },
    { id: 8, lastName: 'Spec', firstName: '07/07/2020 08:13', age: "jburke@hhomesltd.com" },
    { id: 9, lastName: 'Spec', firstName: '07/07/2020 08:13', age: "jburke@hhomesltd.com" },
];

const officeLocations = {
    dfwOps: true,
    houstonOps: false,
    austinOps: false,
    sanAntonioOps: false,
    archServAdmin: false,
    dfwPurchase: true,
    houstonPurchase: false,
    austinPurchase: false,
    sanAntonioPurchase: false
};

const MemoState = {
    memoType: "Choose One",
    jobStartDate: "2019-08-01",
    editedDate: "2020-12-30",
    phvalue: true,
    putOnPHDate: "2020-05-24",
    releasedph: true,
    releasedFromPHDate: "2020-08-15",
    sold: false,
    soldDate: "N/A"
};

const LocationState = {

};

const PlanState = {
    plan: 371,
    elevation: "A",
    garageSwing: "Left",
    specialStatus: false,
    special: "",
    droppedGarageStatus: false,
    droppedGarage: "",
    piers: "No",
    waterMoisture: "No",
    foundationDesign: "",
    enhancedLot: "",
    enhancedLotStatus: false,
    brickSelection1: "",
    brickSelection2: "",
    additionalNotes: ""
};

const JobState = {
    purchaser: "Teasley Dolores",
    salesPrice: "$399, 300",
    special: "Yes - See Below",
    cashLot: "No"
};

const PersonnelState = {
    divConstMgr: "",
    constMgr: "David Tanguay",
    divSalesMgr: "",
    salesCounselor: "Terry Denkhaus",
    editedBy: "Jude Kuti - jkuti@hhomes.com"
};

const HighlighterState = {
    // memo: true,
    job: true,
    plan: false,
    options: false,
    location: false,
    personnel: false
};

const PlanHighlight = {
    standard: true,
    override: false
};

const memoTypeData = ["Choose One", "Spec", "Model", "Pre-Sold", "Prototype", "Permit & Hold"];


export { steps, columns, rows, officeLocations, MemoState, JobState, PlanState, PersonnelState, HighlighterState, PlanHighlight, memoTypeData }