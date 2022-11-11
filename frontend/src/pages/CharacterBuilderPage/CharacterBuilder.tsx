import { useState } from 'react';
import { Description } from '../../components/Description';
import { Builder } from '../../components/DndCharcerBuilder';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';

import { TempletBuilder } from '../SystemBuilderPage/SystemBuilder';

function CharacterBuilder() {

    const [charater, setCharater] = useState<any>({});

    const [mainPage, setMainPage] = useState<JSX.Element>(<Builder charater={charater} setCharater={setCharater}></Builder>);


    return (
        <Box sx={{ flexGrow: 1, m: 1 }}>
            <Grid container spacing={2}>
                <Grid xs={6}>
                    <Button fullWidth onClick={() => setMainPage(<Builder charater={charater} setCharater={setCharater}></Builder>)}>Options</Button>
                </Grid>
                <Grid xs={6}>
                    <Button fullWidth onClick={() => setMainPage(<Description></Description>)}>Description</Button>
                </Grid>
                <Grid xs={12}>
                    {mainPage}
                </Grid>
            </Grid>
        </Box>
    )
}

export default CharacterBuilder;
