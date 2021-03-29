import React from 'react';
import TextField from '@material-ui/core/TextField';



export default function JobEdit() {

    return (
        <>
            <TextField color="primary" margin="dense" name="memoType" variant="outlined" label="Memo Type" defaultValue="Inside Job Edit" />
            <div>Value of state in Memo Type is : Inside Job Edit</div>
        </>
    )
};
