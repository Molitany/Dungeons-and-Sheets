import React, { useState } from 'react';

import TempletBuilder from '../../components/TempletBuilder';

const dndTemplt = {
    system: "dnd",
    version: "0.1",
    templet: [
        {
            element: "Container",
            props: [
                {
                    element: "Text",
                    props: { text: "Here is the awesome character of cool" }
                },
                {
                    element: "InputText",
                    props: { title: "Name", type: "text", id: "characterName" }
                },
                {
                    element: "Select",
                    props: {
                        options: [
                            { value: "Monk", text: "Monk" },
                            { value: "Bard", text: "Bard" }
                        ]
                    }
                },
            ]
        },
    ]
}



function CharacterBuilder() {

    return (
        <div>
            <TempletBuilder systemTemplet={dndTemplt.templet} />
        </div >
    )
}

export default CharacterBuilder;
