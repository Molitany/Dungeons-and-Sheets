import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ImageList from '@mui/material/ImageList';
import { useState, useEffect } from "react"

export function Description() {

    const [imageURL, setImageURL] = useState<string>('http://cdn.onlinewebfonts.com/svg/img_143472.png');

    return (
        <Grid container spacing={2} >
            <Grid xs={6}>
                <TextField fullWidth label="Character Name" />
            </Grid>
            <Grid xs={6}>
                <TextField fullWidth label="Player Name" />
            </Grid>
            <Grid xs={3}>
                <TextField fullWidth label="Age" type="number" />
            </Grid>
            <Grid xs={3}>
                <TextField fullWidth label="Sex" />
            </Grid>
            <Grid xs={3}>
                <TextField fullWidth label="Height" type="number" />
            </Grid>
            <Grid xs={3}>
                <TextField fullWidth label="Weight" type="number" />
            </Grid>
            <Grid xs={12}>
                <TextField fullWidth label="Description" multiline rows={4} />
            </Grid>

            <Grid xs={12}>
                <TextField fullWidth label="Backstory" multiline rows={4} />
            </Grid>

            <Grid xs={12}>
                <TextField fullWidth label="Image URL" id="imageURL" onChange={e => setImageURL(e.target.value)} />
            </Grid>

            <Grid xs={6}>
                <Box
                    component="img"
                    sx={{
                        border: 1,
                        borderColor: 'grey.500',
                        width: 1,
                    }}
                    src={imageURL}
                />
            </Grid>
        </Grid  >
    )
}