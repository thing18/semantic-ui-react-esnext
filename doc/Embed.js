import React, { useState, Fragment } from 'react';

export const EmbedExampleActive=({ lib: { Embed, Button, Divider } }) => {

    const [state, setState]=useState(false)

    const handleClick=() => setState(true);

    return (
        <div>
            <Embed
                active={state}
                icon='arrow circle down'
                id='90Omh7_I8vI'
                placeholder='/images/image-16by9.png'
                source='youtube'
            />

            <Divider hidden />

            <Button
                content='Activate'
                icon='bomb'
                labelPosition='left'
                onClick={handleClick}
            />
        </div>
    )
};

export const EmbedExampleCustom=({ lib: { Embed } }) => <Embed icon='right circle arrow' placeholder='/images/image-16by9.png' url='https://www.myfav.es/jack' />;

export const EmbedExampleVimeo=({ lib: { Embed } }) => <Embed id='125292332' placeholder='/images/vimeo-example.jpg' source='vimeo' />;

export const EmbedExampleYouTube=({ lib: { Embed } }) => <Embed id='O6Xo21L0ybE' placeholder='/images/image-16by9.png' source='youtube' />;

export const EmbedExampleIframe=({ lib: { Embed } }) => (
    <Embed autoplay={false}
        color='white'
        hd={false}
        id='gJscrxxl_Bg'
        iframe={{
            allowFullScreen: true,
            style: {
                padding: 10,
            },
        }}
        placeholder='/images/image-16by9.png'
        source='youtube' />
);

export const EmbedExampleSettings=({ lib: { Embed } }) => <Embed autoplay={false} brandedUI color='white' hd={false} id='D0WnZyxp_Wo' placeholder='/images/image-16by9.png' source='youtube' />;

export const EmbedExampleAspectRatio=({ lib: { Embed } }) => <Embed aspectRatio='4:3' id='HTZudKi36bo' placeholder='/images/4by3.jpg' source='youtube' />;

export const EmbedExamples=({ lib, lib: { Divider } }) => (

    <Fragment>

        <h3>Active</h3>
        <EmbedExampleActive lib={lib} />

        <Divider />
        <h3>Service: Custom</h3>
        <EmbedExampleCustom lib={lib} />

        <Divider />
        <h3>Service: Vimeo</h3>
        <EmbedExampleVimeo lib={lib} />

        <Divider />
        <h3>Service: YouTube</h3>
        <EmbedExampleYouTube lib={lib} />

        <Divider />
        <h3>IFrame</h3>
        <EmbedExampleIframe lib={lib} />

        <Divider />
        <h3>Settings</h3>
        <EmbedExampleSettings lib={lib} />

        <Divider />
        <h3>Aspect Ratio</h3>
        <EmbedExampleAspectRatio lib={lib} />
    </Fragment>
);
