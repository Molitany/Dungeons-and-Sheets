import { Box, Button, Container, Grid } from "@mui/material";
import { Race } from "./Race";

export function Builder(props: { charater: any, setCharater: React.Dispatch<any> }) {

    return (
        <>
            <Container maxWidth={false}>

                <Grid container spacing={2} >

                    <Grid xs={1.7} onClick={() => console.log("Yes")}>
                        {/* <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center">Race</Box> */}
                        {/* <Box
                        component="img"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            border: 1,
                            borderColor: 'grey.500',
                            width: "50%",
                        }}
                        src={"http://cdn.onlinewebfonts.com/svg/img_143472.png"}
                    ></Box> */}
                        <Button fullWidth>Racs</Button>
                    </Grid>
                    <Grid xs={1.7}>
                        <Button fullWidth>Class / Level</Button>
                    </Grid>
                    <Grid xs={1.7}>
                        <Button fullWidth>Ability Scores / Feats</Button>
                    </Grid>
                    <Grid xs={1.7}>
                        <Button fullWidth>Background</Button>
                    </Grid>
                    <Grid xs={1.7}>
                        <Button fullWidth>Proficiencies</Button>
                    </Grid>
                    <Grid xs={1.7}>
                        <Button fullWidth>Spells</Button>
                    </Grid>
                    <Grid xs={1.7}>
                        <Button fullWidth>Equipment</Button>
                    </Grid>
                    <Grid xs={12}>
                        <Race charater={props.charater} setCharater={props.setCharater}></Race>
                    </Grid>
                </Grid >
            </Container>

        </>
    )
}