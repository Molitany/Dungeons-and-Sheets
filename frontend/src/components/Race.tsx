import { Radio, RadioGroup, Box, Typography, Grid } from "@mui/material";

export function Race(props: { charater: any, setCharater: React.Dispatch<any> }) {

    let races = [
        {
            Race: "Human",
            Attributes: {
                Age: "Humans reach adulthood in their late teens and live less than a century",
                Size: "Humans vary widely in height and build, from barely 5 feet to well over 6 feet tall. Regardless of your position in that range, your size is Medium.",
                Speed: "Your base walking speed is 30 feet.",
                Languages: "You can speak, read, and write Common and one extra language of your choice. Humans typically learn the languages of other peoples they deal with, including obscure dialects. They are fond of sprinkling their speech with words borrowed from other tongues: Orc curses, Elvish musical expressions, Dwarvish military phrases, and so on.",
            },
            Variants: [
                {
                    Name: "Standard Human",
                    "Ability Score Increase": "Your ability scores each increase by 1."
                },
                {
                    Name: "Variant Human",
                    "Ability Score Increase": "Two different ability scores of your choice increase by 1",
                    Skills: "You gain proficiency in one skill of your choice.",
                    Feat: "You gain one Feat of your choice."
                }
            ]
        },
        {
            Race: "Elf",
            Attributes: {
                Age: "Although elves reach physical maturity at about the same age as humans, the elven understanding of adulthood goes beyond physical growth to encompass worldly experience. An elf typically claims adulthood and an adult name around the age of 100 and can live to be 750 years old.",
                Size: "Elves range from under 5 to over 6 feet tall and have slender builds. Your size is Medium.",
                Speed: ["Your base walking speed is 30 feet.", ["Race Speed", "30"]],
                Darkvision: "Accustomed to twilit forests and the night sky, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You cant discern color in darkness, only shades of gray.",
                "Fey Ancestry": "You have advantage on saving throws against being charmed, and magic can't put you to sleep.",
                Trance: "Elves do not sleep. Instead they meditate deeply, remaining semi-conscious, for 4 hours a day. The Common word for this meditation is \"trance.\" While meditating, you dream after a fashion; such dreams are actually mental exercises that have become reflexive after years of practice. After resting in this way, you gain the same benefit a human would from 8 hours of sleep.",
                "Keen Senses": ["You have proficiency in the Perception skill.", ["Proficiencys", ["Perception"]]],
                Languages: ["You can speak, read, and write Common and Elven", ["Languages", ["Common", "Elven"]]],
            },
            Variants: [
                {
                    Name: "Dark Elf",
                    "Ability Score Increase": "Your Dexterity score increases by 2, Your Charisma score increases by 1",
                    "Superior Darkvision": "Your darkvision has a range of 120 feet, instead of 60.",
                    "Sunlight Sensitivity": "You have disadvantage on attack rolls and Wisdom (Perception) checks that rely on sight when you, the target of the attack, or whatever you are trying to perceive is in direct sunlight.",
                    "Drow Magic": "You know the Dancing Lights cantrip. When you reach 3rd level, you can cast the Faerie Fire spell once with this trait and regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the Darkness spell onceand regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.",
                    "Drow Weapon": "Training. You have proficiency with rapiers, shortswords, and hand crossbows."

                }
            ]
        }
    ]


    function RaceAttributes(race: string, attributes: any, variants: any) {
        let elementAttributes: JSX.Element[] = []
        for (const key in attributes) {

            elementAttributes.push(
                <Box sx={{ ml: 2, pr: 3 }}>
                    <Typography sx={{ fontWeight: 'bold', display: 'inline' }}> {key + ":"}</Typography>
                    <Typography sx={{ display: 'inline' }}> {attributes[key]}</Typography >
                </ Box >
            )
        }

        let elementVariants: JSX.Element[] = []

        variants.map((item: any) => {

            let elementVariantsAttributes: JSX.Element[] = []

            for (const key in item) {

                elementVariantsAttributes.push(
                    <Box sx={{ ml: 3 }}>
                        <Typography sx={{ fontWeight: 'bold', display: 'inline' }}> {key + ":"}</Typography>
                        <Typography sx={{ display: 'inline' }}> {item[key]}</Typography >
                    </ Box >
                )
            }

            elementVariants.push(
                <>
                    <Grid container sx={{ mt: 2 }} >
                        <Grid xs={11} sx={{ pr: 1 }}>
                            {elementVariantsAttributes}

                        </Grid>
                        <Grid xs={1}>
                            <Radio
                                value={`${race}|${item.Name}`}
                            />
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

    return (<>
        <RadioGroup onChange={(e) => {
            props.charater.Race = e.target.value
            props.setCharater(props.charater)
        }}>
            {
                races.map(item => (
                    <Box sx={{ border: 1 }}>
                        <>
                            <Box>

                                <Typography variant="h5" sx={{ display: 'inline' }}> {item.Race}</Typography >


                            </Box>
                            {
                                RaceAttributes(item.Race, item.Attributes, item.Variants)
                            }

                        </>
                    </Box>
                ))
            }
        </RadioGroup>
    </>)
}