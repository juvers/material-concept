import Dashboard from "views/Dashboard/Dashboard";
import Product from "views/Product/Product";
import NewModel from "views/NewModel/NewModel";
import ArchLog from "views/ArchLog/ArchLog";
import ChangeOrders from "views/Sales/ChangeOrders/ChangeOrders";
import PriceQuote from "views/Sales/PriceQuote/PriceQuote";
import SalesAgreement from "views/Sales/SalesAgreement/SalesAgreement";
import SalesDetails from "views/Sales/SalesAgreement/SalesDetails";
import SalesReports from "views/Sales/SalesReports/SalesReports";
import StartMemo from "views/StartMemo/StartMemo";
import ClosingInformationForm from "views/Sales/ClosingInformationForm/ClosingInformationForm";
// import Components from "views/Components/Components";
import Profile from "views/Profile/Profile";
import PdfMerger from "views/Tools/PdfMerger";

// icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import AvTimerIcon from '@material-ui/icons/AvTimer';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import ApartmentIcon from '@material-ui/icons/Apartment';
import BuildIcon from '@material-ui/icons/Build';
import AssignmentIcon from '@material-ui/icons/Assignment';
var dashRoutes = [
    // Routes not to be shown on menu should start here

    {
        path: "/sales-details",
        name: "Sales Details",
        component: SalesDetails,
        layout: "/admin",
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
        layout: "/admin",
    },

    // Routes not to be shown on menu should end here

    {
        path: "/dashboard",
        name: "Dashboard",
        icon: AvTimerIcon,
        component: Dashboard,
        layout: "/admin"
    },

    {
        path: "/start-memo",
        name: "Start Memo",
        icon: AssignmentIcon,
        component: StartMemo,
        layout: "/admin"
    },

    {
        collapse: true,
        name: "Sales",
        icon: "content_paste",
        state: "formsCollapse",
        views: [{
                path: "/change-orders",
                name: "Change Orders",
                mini: "CO",
                component: ChangeOrders,
                layout: "/admin"
            },
            {
                path: "/price-quote",
                name: "Price Quote",
                mini: "PQ",
                component: PriceQuote,
                layout: "/admin"
            },
            {
                path: "/sales-agreement",
                name: "Sales Agreement",
                mini: "SA",
                component: SalesAgreement,
                layout: "/admin"
            },
            {
                path: "/sales-report",
                name: "Sales Reports",
                mini: "SR",
                component: SalesReports,
                layout: "/admin"
            },
            {
                path: "/closing-information-form",
                name: "Closing Information Form",
                mini: "CIF",
                component: ClosingInformationForm,
                layout: "/admin"
            }
        ]
    },
    {
        path: "/arch-log",
        name: "Arch Log",
        icon: HomeWorkIcon,
        component: ArchLog,
        layout: "/admin"
    },
    {
        path: "/new-model",
        name: "New Model",
        icon: ApartmentIcon,
        component: NewModel,
        layout: "/admin"
    },
    {
        path: "/product",
        name: "Product",
        icon: DashboardIcon,
        component: Product,
        layout: "/admin"
    },
    //   {
    //   path: "/components",
    //   name: "Components", 
    //   icon: BuildIcon,
    //   component: Components,
    //   layout: "/admin"
    // },
    {
        collapse: true,
        name: "Tools",
        icon: BuildIcon,
        state: "pageCollapse",
        views: [{
                path: "/pdf-merger",
                name: "PDF Merger",
                mini: "PM",
                component: PdfMerger,
                layout: "/admin"
            },


        ]
    },

];
export default dashRoutes;