// To use styles from other sources, import the styles and add to object e.g cardTitle
import {
    cardTitle,
    roseColor
} from "assets/jss/hhi-js-styles";


export const StartMemoJsStyles = {
    root: {
        display: 'flex',
    },
 
 
    flexCenter: {
        display: 'flex',
        justifyContent: 'center'
    },

    darkText: {
        color: "#000 !important"
    },
    // formControl: {
    //     margin: theme.spacing(1),
    // },
    cursor: {
        cursor: "pointer"
    },
    activate: {
        color: "#f00",
        fontWeight: "600"
    },
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
    fieldset: {
        borderColor: "rgba(250,250,250, 0.4)"
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
    },
    sticky: {
        position: "sticky",
        top: "5%"
    },
}