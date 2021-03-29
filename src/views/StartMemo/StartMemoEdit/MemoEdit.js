import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { MemoContext } from '../StartMemo';

export default function MemoEdit(props) {
// use ContextAPI over props
    // const [state, handleState] = useContext(MemoContext);

    // const [state, handleState] = props.transfers;

    return (
        <>

        Inside memo edit
            {/* <TextField color="primary" margin="dense" name="memoType" onChange={handleState} variant="outlined" label="Memo Type" defaultValue={state.memoType} />
            <div>Value of state in main Type is : {state.memoType}</div>
            
            <TextField color="primary" margin="dense" name="jobStartDate" onChange={handleState} variant="outlined" label="Job Start Date" defaultValue={state.jobStartDate} />
            <div>Value of state in Job Start Date is : {state.jobStartDate}</div>

            <TextField color="primary" margin="dense" name="editedDate" onChange={handleState} variant="outlined" label="Job Start Date" defaultValue={state.editedDate} />
            <div>Value of state in Edited on Date is : {state.editedDate}</div> */}
        </>
    )
};
