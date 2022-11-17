import { Radio, RadioGroup, Box, Typography, Grid, TableContainer, Table, TableRow, TableCell, TableHead, IconButton, Collapse } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React from "react";
import { receiveMessageOnPort } from "worker_threads";

interface Attributes {
    Key: string
    Name: string
    Description: string
    Source: string
    Features?: boolean
    Value?: string | string[] | (string | number)[][] | Spell[]
}

interface Spell {
    Key: string
    Source: string,
}

interface Race {
    RaceName: string
    Attributes: Attributes[]
    Variants: Variant[]
}

interface Variant {
    VariantName: string
    Attributes: Attributes[]
}


export function Race(props: { charater: any, setCharater: React.Dispatch<any> }) {

    let races: Race[] = [
        {
            RaceName: "Human",
            Attributes: [
                {
                    Key: "Age",
                    Name: "Age",
                    Description: "Humans reach adulthood in their late teens and live less than a century",
                    Source: "Race:Human",
                },
                {
                    Key: "Size",
                    Name: "Size",
                    Description: "Humans vary widely in height and build, from barely 5 feet to well over 6 feet tall. Regardless of your position in that range, your size is Medium.",
                    Value: "Medium",
                    Source: "Race:Human",
                },
                {
                    Key: "Race Speed",
                    Name: "Speed",
                    Description: "Your base walking speed is 30 feet.",
                    Value: "30",
                    Source: "Race:Human"
                },
                {
                    Key: "Languages",
                    Name: "Languages",
                    Description: "You can speak, read, and write Common and one extra language of your choice. Humans typically learn the languages of other peoples they deal with, including obscure dialects. They are fond of sprinkling their speech with words borrowed from other tongues: Orc curses, Elvish musical expressions, Dwarvish military phrases, and so on.",
                    Value: ["Common", "*"],
                    Source: "Race:Human"
                },
            ],
            Variants: [
                {
                    VariantName: "Standard Human",
                    Attributes: [
                        {
                            Key: "Ability-Score-Increase",
                            Name: "Ability Score Increase",
                            Description: "Your ability scores each increase by 1",
                            Value: [["Strength", 1], ["Dexterity", 1], ["Constitution", 1], ["Intelligence", 1], ["Wisdom", 1], ["Charisma", 1]],
                            Source: "Race:Human"
                        }
                    ]
                },
                {
                    VariantName: "Variant Human",
                    Attributes: [
                        {
                            Key: "Ability-Score-Increase",
                            Name: "Ability Score Increase",
                            Description: "Two different ability scores of your choice increase by 1",
                            Value: [["*", 1], ["*", 1]],
                            Source: "Race:Human"
                        },
                        {
                            Key: "Proficiency:Skill",
                            Name: "Skills",
                            Description: "You gain proficiency in one skill of your choice.",
                            Value: ["*"],
                            Source: "Race:Human"
                        },
                        {
                            Key: "Feat",
                            Name: "Feat",
                            Description: "You gain one Feat of your choice.",
                            Value: ["*"],
                            Source: "Race:Human"
                        }
                    ]
                },
            ]
        },
        {
            RaceName: "Elf",
            Attributes: [
                {
                    Key: "Age",
                    Name: "Age",
                    Description: "Although elves reach physical maturity at about the same age as humans, the elven understanding of adulthood goes beyond physical growth to encompass worldly experience. An elf typically claims adulthood and an adult name around the age of 100 and can live to be 750 years old.",
                    Source: "Race:Elf",
                },
                {
                    Key: "Size",
                    Name: "Size",
                    Description: "Elves range from under 5 to over 6 feet tall and have slender builds. Your size is Medium.",
                    Value: "Medium",
                    Source: "Race:Elf"
                },
                {
                    Key: "Race Speed",
                    Name: "Speed",
                    Description: "Your base walking speed is 30 feet.",
                    Value: "30",
                    Source: "Race:Elf"
                },
                {
                    Key: "Darkvision",
                    Name: "Darkvision",
                    Description: "Accustomed to twilit forests and the night sky, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You cant discern color in darkness, only shades of gray.",
                    Value: "60",
                    Source: "Race:Elf"
                },
                {
                    Key: "Fey-Ancestry",
                    Name: "Fey Ancestry",
                    Description: "You have advantage on saving throws against being charmed, and magic can't put you to sleep.",
                    Features: true,
                    Source: "Race:Elf"
                },
                {
                    Key: "Trance",
                    Name: "Trance",
                    Description: "Elves do not sleep. Instead they meditate deeply, remaining semi-conscious, for 4 hours a day. The Common word for this meditation is \"trance.\" While meditating, you dream after a fashion; such dreams are actually mental exercises that have become reflexive after years of practice. After resting in this way, you gain the same benefit a human would from 8 hours of sleep.",
                    Features: true,
                    Source: "Race:Elf"
                },
                {
                    Key: "Proficiencys",
                    Name: "Keen Senses",
                    Description: "You have proficiency in the Perception skill",
                    Value: "Perception",
                    Source: "Race:Elf"
                },
                {
                    Key: "Languages",
                    Name: "Languages",
                    Description: "You can speak, read, and write Common and Elven",
                    Value: ["Common", "Elven"],
                    Source: "Race:Elf"
                },

            ],
            Variants: [
                {
                    VariantName: "Dark Elf",
                    Attributes: [
                        {
                            Key: "Ability-Score-Increase",
                            Name: "Ability Score Increase",
                            Description: "Your Dexterity score increases by 2, Your Charisma score increases by 1",
                            Value: [["Dexterity", "2"], ["Charisma", "1"]],
                            Source: "Race:Dark-Elf"
                        },
                        {
                            Key: "Darkvision",
                            Name: "Superior Darkvision",
                            Description: "Your darkvision has a range of 120 feet, instead of 60.",
                            Value: "120",
                            Source: "Race:Dark-Elf"
                        },
                        {
                            Key: "Sunlight-Sensitivity",
                            Name: "Sunlight Sensitivity",
                            Description: "You have disadvantage on attack rolls and Wisdom (Perception) checks that rely on sight when you, the target of the attack, or whatever you are trying to perceive is in direct sunlight.",
                            Source: "Race:Dark-Elf",
                            Features: true
                        },
                        {
                            Key: "Spell",
                            Name: "Drow Magic",
                            Description: "You know the Dancing Lights cantrip. When you reach 3rd level, you can cast the Faerie Fire spell once with this trait and regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the Darkness spell onceand regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.",
                            Source: "Race:Dark-Elf",
                            Features: true,
                            Value: [{
                                Key: "Dancing-Lights",
                                Source: "Race:Dark-Elf",
                            }],
                        },
                        {
                            Key: "Proficiency:Weapon",
                            Name: "Drow Weapon",
                            Description: "Training. You have proficiency with rapiers, shortswords, and hand crossbows.",
                            Source: "Race:Dark-Elf",
                            Features: true,
                            Value: ["Rapiers", "Shortswords", "Hand crossbows"],
                        },
                    ]
                }
            ]
        }
    ]


    function RaceAttributes(race: Race) {
        let elementAttributes: JSX.Element[] = []


        race.Attributes.forEach((attribut) => {
            elementAttributes.push(
                <Box sx={{ ml: 2, pr: 3 }}>
                    <Typography sx={{ fontWeight: 'bold', display: 'inline' }}> {attribut.Name + ":"}</Typography>
                    <Typography sx={{ display: 'inline' }}> {attribut.Description}</Typography >
                </ Box >
            )

        })

        let elementVariants: JSX.Element[] = []

        race.Variants.forEach((variant) => {

            let elementVariantsAttributes: JSX.Element[] = []

            variant.Attributes.forEach((attribut) => {
                elementVariantsAttributes.push(
                    <Box sx={{ ml: 3 }}>
                        <Typography sx={{ fontWeight: 'bold', display: 'inline' }}> {attribut.Name + ":"}</Typography>
                        <Typography sx={{ display: 'inline' }}> {attribut.Description}</Typography >
                    </ Box >
                )

            })


            elementVariants.push(
                <>
                    <Grid container sx={{ mt: 2 }} >
                        <Grid xs={12} sx={{ fontWeight: 'bold' }}>{variant.VariantName}</Grid>
                        <Grid xs={1} container>
                            <Radio sx={{ width: "100%", borderRadius: "10px" }}
                                value={`${race.RaceName}|${variant.VariantName}`}
                            />
                        </Grid>
                        <Grid xs={11} sx={{ pr: 1 }}>
                            {elementVariantsAttributes}
                        </Grid>
                    </Grid>
                </>
            )
        })

        return <>
            {
                elementAttributes
            }
            {
                elementVariants
            }
        </>
    }

    function Row(props: { race: Race }) {
        const { race } = props;
        const [open, setOpen] = React.useState(false)

        let raceClosedRow: JSX.Element[] = []

        if (!open) {

            race.Variants.forEach((variant) => {

                raceClosedRow.push(
                    <TableRow >
                        <TableCell>
                            {variant.VariantName}
                        </TableCell>
                        <TableCell>
                            {variant.Attributes.find((attribut) => attribut.Key == "Ability-Score-Increase")?.Description}
                        </TableCell>
                    </TableRow>
                )
            })
        }



        return (

            <TableRow>
                <TableCell>
                    <Box sx={{ p: 1 }}>
                        <Typography variant="h5" sx={{ display: 'inline' }}> {race.RaceName}</Typography >

                        <Table size="small" aria-label="a dense table">
                            {!open ? raceClosedRow : null}
                        </Table>

                        <Collapse in={open} timeout='auto' unmountOnExit>
                            {RaceAttributes(race)}
                        </Collapse>
                    </Box>
                </TableCell>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>


        )

    }

    return (<>
        <RadioGroup onChange={(e) => {
            props.charater.Race = e.target.value
            props.setCharater(props.charater)
        }}>
            <TableContainer>
                <Table stickyHeader >
                    <TableHead>
                        <TableRow>
                            <TableCell>Race Name</TableCell>
                            <TableCell>Ability Score Increase</TableCell>
                        </TableRow>
                    </TableHead>

                    {
                        races.map(race => (
                            <Row race={race} />
                        ))
                    }
                </Table>
            </TableContainer>
        </RadioGroup>
    </>)
}