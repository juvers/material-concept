import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone-uploader';
import { getDroppedOrSelectedFiles } from 'html5-file-selector';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { PDFDocument } from 'pdf-lib';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'justify',
    color: theme.palette.text.secondary,
  },
}));

// const animatedComponents = makeAnimated();

const PdfMerger = () => {

  const classes = useStyles();
  const getUploadParams = ({ meta }) => {
    console.log(meta);
    // temporary placeholder for server service
    return { url: 'https://httpbin.org/post' }
  }

  // const emails = ['jkuti@hhomes.com', 'jbk@hhomes.com', 'jburke@hhomes.com', 'jb@hhomes.com', 'jb@hhomes.com'];
  const [files, setFiles] = useState([]);
//   const [selected, setSelected] = useState([{ label: 'jbk@hhomes.com', value: 'jbk@hhomes.com' }]);
//   const emails = [{ label: 'jkuti@hhomes.com', value: 'jkuti@hhomes.com', },
//   { label: 'jbk@hhomes.com', value: 'jbk@hhomes.com' },
//   { label: 'jburke@hhomes.com', value: 'jburke@hhomes.com' },
//   { label: 'kcole@hhomes.com', value: 'kcole@hhomes.com' },
//   { label: 'msean@hhomes.com', value: 'msean@hhomes.com' },]

  // const [state, setState] = useState(emails);
  const handleChangeStatus = ({ meta, file }, status) => { 
    console.log("Inside handle status: ", status, meta, file);
    console.log(process.cwd());
    
    // setFiles([...files, file.name]);
    // console.log("Current files in queue: ", files);
  }


  async function copyPages() {

    const reader = new FileReader();
    console.log("Wa",reader.result)
    const url1 = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
    const url2 = 'https://pdf-lib.js.org/assets/with_large_page_count.pdf'
  
    const firstDonorPdfBytes = await fetch(url1).then(res => res.arrayBuffer())
    const secondDonorPdfBytes = await fetch(url2).then(res => res.arrayBuffer())
  
    const firstDonorPdfDoc = await PDFDocument.load(firstDonorPdfBytes)
    const secondDonorPdfDoc = await PDFDocument.load(secondDonorPdfBytes)
  
    const pdfDoc = await PDFDocument.create();
  
    const [firstDonorPage] = await pdfDoc.copyPages(firstDonorPdfDoc, [0])
    const [secondDonorPage] = await pdfDoc.copyPages(secondDonorPdfDoc, [742])
  
    pdfDoc.addPage(firstDonorPage)
    pdfDoc.insertPage(0, secondDonorPage)
  
    const pdfBytes = await pdfDoc.save();

    // Create blob and render
    const url = window.URL.createObjectURL(new Blob([pdfBytes]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `test.pdf`, `application/pdf`);
    // Append to html page
    document.body.appendChild(link);
    // Force download
    link.click();
    // Clean up and remove the link
    link.parentNode.removeChild(link);
  }

  
  const handleSubmit = (files, allFiles) => {
    copyPages();
    console.log("files map", files.map(f => f.meta));

    files.map(f => setFiles([...files, f]));
    console.log("Inside all files: ", files);


    
    // const reader = new FileReader();
    // reader.onload = e => {
    //   console.log("Inside result: ",e.target.result)
    //   // saveBase64AsFile(e.target.result, files[0].meta.name);

    // };
    // reader.readAsDataURL(files[0].file);
    allFiles.forEach(f => f.remove())
  }

  const getFilesFromEvent = e => {
    return new Promise(resolve => {
      getDroppedOrSelectedFiles(e).then(chosenFiles => {
        // console.log("Test dropped: ", chosenFiles[0] )
        resolve(chosenFiles.map(f => f.fileObject))
      })
    })
  }

  const InputChooseFile = ({ accept, onFiles, files, getFilesFromEvent }) => {
    const text = files.length > 0 ? 'Add more files' : 'Choose files to upload or drag and drop files here';
    const buttonAlignment = files.length > 0 ? "start" : "center";
    const buttonStyle = {
      backgroundColor: '#67b0ff',
      color: '#fff',
      cursor: 'pointer',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      marginLeft: 30,
      alignSelf: buttonAlignment
    }

    return (
      <label style={buttonStyle}>
        {text}
        <input
          style={{ display: 'none' }}
          type="file"
          accept={accept}
          multiple
          onChange={e => {
            getFilesFromEvent(e).then(chosenFiles => {
              onFiles(chosenFiles)
            })
          }}
        />
      </label>
    )
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Dropzone
              getUploadParams={getUploadParams}
              onChangeStatus={handleChangeStatus}
              onSubmit={handleSubmit}
              InputComponent={InputChooseFile}
              getFilesFromEvent={getFilesFromEvent}
              // classNames
              // granularize accepted formats to e.g. ".jpg"/".pdf"/
              // accept="image/*,audio/*,video/*" 
              submitButtonContent={'Merge'}
              styles={{
                // dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                // inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
                dropzone: { minHeight: 250, maxHeight: 400, width: "99%" },
                previewImage: { width: 100 }

              }}
            /></Paper>
        </Grid>
      </Grid>
    </div>

  );
};

export default PdfMerger;
