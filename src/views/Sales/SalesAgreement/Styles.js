import {
  defaultFont,
  grayColor
} from "assets/jss/hhi-js-styles";

const salesAgreementStyle = theme => ({
  root: {
    width: '100%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  container: {
    maxHeight: '440',
  },
  cardTitle: {
    marginTop: "0",
    marginBottom: "3px",
    color: grayColor[2],
    fontSize: "18px"
  },
  cardHeader: {
    zIndex: "3"
  },
  cardSubtitle: {
    ...defaultFont,
    color: grayColor[0],
    fontSize: "14px",
    margin: "0 0 10px"
  },
  center: {
    textAlign: "center"
  },
  right: {
    textAlign: "right"
  },
  left: {
    textAlign: "left"
  },
  marginRight: {
    marginRight: "5px"
  },
  marginBottom: {
    marginBottom: "10px"
  },
  modalSectionTitle: {
    marginTop: "30px"
  },
  formControl: {
    margin: theme.spacing(1),
    width: '90%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

export default salesAgreementStyle;


