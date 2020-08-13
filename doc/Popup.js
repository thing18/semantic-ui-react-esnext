import faker from 'faker';
import _ from 'lodash';
import React, { useState, Fragment, useRef } from 'react';

export const PopupExampleDisabled=({ lib: { Popup, Button } }) => (
    <Popup
        content='I will not render.'
        disabled
        trigger={<Button content='Button' />}
    />
);

export const PopupExamplePinned=({ lib: { Popup, Button } }) => (
    <Popup
        content='I will not flip!'
        on='click'
        pinned
        trigger={<Button content='Button' />}
    />
);

const users=[
    {
        name: 'Elliot Fu',
        bio: 'Elliot has been a member since July 2012',
        avatar: '/images/avatar/small/elliot.jpg',
    },
    {
        name: 'Stevie Feliciano',
        bio: 'Stevie has been a member since August 2013',
        avatar: '/images/avatar/small/stevie.jpg',
    },
    {
        name: 'Matt',
        bio: 'Matt has been a member since July 2014',
        avatar: '/images/avatar/small/matt.jpg',
    },
]

export const PopupExampleHeader=({ lib: { Popup, Image } }) => (
    <>
        {users.map((user) => (
            <Popup
                content={user.bio}
                key={user.name}
                header={user.name}
                trigger={<Image src={user.avatar} avatar />}
            />
        ))}
    </>
);

export const PopupExampleTrigger=({ lib: { Popup, Card, Image, Rating } }) => (
    <Popup
        trigger={
            <Card>
                <Image src='/images/movies/totoro-horizontal.jpg' />
                <Card.Content>
                    <Card.Header>My Neighbor Totoro</Card.Header>
                    <Card.Description>
                        Two sisters move to the country with their father in order to be
                        closer to their hospitalized mother, and discover the surrounding
                        trees are inhabited by magical spirits.
                    </Card.Description>
                </Card.Content>
            </Card>
        }
    >
        <Popup.Header>User Rating</Popup.Header>
        <Popup.Content>
            <Rating icon='star' defaultRating={3} maxRating={4} />
        </Popup.Content>
    </Popup>
);

export const PopupExampleActions=({ lib: { Button, Grid, Input, Popup } }) => (
    <Grid columns={1}>
        <Grid.Column>
            <Popup
                trigger={<Button icon='add' content='Add a friend' />}
                content='Sends an email invite to a friend.'
                on='hover'
            />
            <Popup
                trigger={
                    <Button color='red' icon='flask' content='Activate doomsday device' />
                }
                content={<Button color='green' content='Confirm the launch' />}
                on='click'
                position='top right'
            />
            <Popup
                trigger={<Input icon='search' placeholder='Search...' />}
                header='Movie Search'
                content='You may search by genre, header, year and actors'
                on='focus'
            />
        </Grid.Column>
        <Grid.Column>
            <Popup
                trigger={<Button>Click me or Hover me</Button>}
                header='Movie Search'
                content='Multiple events can trigger a popup'
                on={['hover', 'click']}
            />
        </Grid.Column>
    </Grid>
);

export const PopupExampleContext=({ lib: { Button, Popup } }) => {

    const contextRef=useRef();

    return (
        <>
            <Popup
                trigger={<Button content='Trigger Popup' />}
                context={contextRef}
                content='Hello'
                position='top center'
            />
            {'---------->'}
            <strong ref={contextRef}>here</strong>
        </>
    )
};

export const PopupExampleContextControlled=({ lib: { Button, Popup } }) => {

    const [state, setState]=useState({});
    const contextRef=useRef();

    const toggle=() => setState((prevState) => ({ open: !prevState.open }))

    return (
        <>
            <Button content='Open controlled Popup' onClick={toggle} />
            <Popup
                context={contextRef}
                content='Hello'
                position='top center'
                open={state.open}
            />
            {'---------->'}
            <strong ref={contextRef}>here</strong>
        </>
    )
};

const timeoutLength=2500

export const PopupExampleControlled=({ lib: { Button, Grid, Header, Popup, Segment } }) => {

    const [state, setState]=useState({ isOpen: false });
    const timeout=useRef();

    const handleOpen=() => {
        setState({ isOpen: true })

        timeout.current=setTimeout(() => setState({ isOpen: false }), timeoutLength);
    }

    const handleClose=() => {
        setState({ isOpen: false });
        clearTimeout(timeout.current);
    }

    return (
        <Grid>
            <Grid.Column width={8}>
                <Popup
                    trigger={<Button content='Open controlled popup' />}
                    content={`This message will self-destruct in ${
                        timeoutLength/1000
                        } seconds!`}
                    on='click'
                    open={state.isOpen}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    position='top right'
                />
            </Grid.Column>
            <Grid.Column width={8}>
                <Header>State</Header>
                <Segment secondary>
                    <pre>{JSON.stringify(state, null, 2)}</pre>
                </Segment>
            </Grid.Column>
        </Grid>
    )
};

export const PopupExampleDefaultOpen=({ lib: { Button, Popup } }) => (
    <Popup
        content='Hello'
        open
        position='top center'
        trigger={<Button content='Already Open' />}
    />
);

export const PopupExampleDelay=({ lib: { Button, Popup } }) => (
    <Popup
        content='Popup will hide in 500ms after leaving mouse.'
        mouseEnterDelay={500}
        mouseLeaveDelay={500}
        on='hover'
        trigger={<Button>Open After 500ms</Button>}
    />
);

export const PopupExampleEventsEnabled=({ lib: { Button, Checkbox, Divider, Grid, Popup } }) => {
    const [eventsEnabled, setEventsEnabled]=useState(true)
    const [open, setOpen]=useState(false)

    return (
        <Grid columns={2}>
            <Grid.Column>
                <Checkbox
                    checked={open}
                    label={{ children: <code>open</code> }}
                    onChange={(e, data) => setOpen(data.checked)}
                />
                <Divider fitted hidden />
                <Checkbox
                    checked={eventsEnabled}
                    label={{ children: <code>eventsEnabled</code> }}
                    onChange={(e, data) => setEventsEnabled(data.checked)}
                />
            </Grid.Column>

            <Grid.Column>
                <Popup
                    content='Hello'
                    eventsEnabled={eventsEnabled}
                    on='click'
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={<Button content='A trigger' />}
                />
            </Grid.Column>
        </Grid>
    )
}

export const PopupExampleHideOnScroll=({ lib: { Button, Popup } }) => (
    <>
        <Popup
            trigger={<Button>Click me</Button>}
            content='Hide the popup on any scroll event'
            on='click'
            hideOnScroll
        />
        <Popup
            trigger={<Button>Hover me</Button>}
            content='Hide the popup on any scroll event'
            hideOnScroll
        />
    </>
);

export const PopupExampleMultiple=({ lib: { Button, Popup } }) => (
    <Popup
        trigger={<Button icon>Click me or Hover me</Button>}
        header='Movie Search'
        content='Multiple events can trigger a popup'
        on={['hover', 'click']}
    />
);

export const PopupExampleNested=({ lib: { Button, Popup, Grid } }) => (
    <Popup wide trigger={<Button content='Are you the one?' />} on='click'>
        <Grid divided columns='equal'>
            <Grid.Column>
                <Popup
                    trigger={<Button color='blue' content='Blue Pill' fluid />}
                    content='The story ends. You wake up in your bed and believe whatever you want to believe.'
                    position='top center'
                    size='tiny'
                    inverted
                />
            </Grid.Column>
            <Grid.Column>
                <Popup
                    trigger={<Button color='red' content='Red Pill' fluid />}
                    content='Stay in Wonderland, and I show you how deep the rabbit hole goes.'
                    position='top center'
                    size='tiny'
                    inverted
                />
            </Grid.Column>
        </Grid>
    </Popup>
);

export const PopupExampleOffset=({ lib: { Icon, Popup } }) => (
    <>
        <Popup
            trigger={<Icon size='large' name='heart' circular />}
            content='Way off to the left'
            offset='0, 50px'
            position='left center'
        />
        <Popup
            trigger={<Icon size='large' name='heart' circular />}
            content='As expected this popup is way off to the right'
            offset='0, 50px'
            position='right center'
        />
        <Popup
            trigger={<Icon size='large' name='heart' circular />}
            content='Way off to the top'
            offset='0, 50px'
            position='top center'
        />
        <Popup
            trigger={<Icon size='large' name='heart' circular />}
            content='As expected this popup is way off to the bottom'
            offset='0, 50px'
            position='bottom center'
        />
    </>
)

export const PopupExamplePopperDependencies=({ lib: { Button, Header, Placeholder, Popup } }) => {
    const [data, setData]=useState(null)
    const timer=useRef()

    return (
        <Popup
            on='click'
            onClose={() => {
                setData(null)
                clearTimeout(timer.current)
            }}
            onOpen={() => {
                setData(null)

                timer.current=setTimeout(() => {
                    setData({
                        description: faker.lorem.sentences(5),
                        name: faker.name.firstName(),
                        title: faker.name.title(),
                    })
                }, 2000)
            }}
            popperDependencies={[!!data]}
            trigger={<Button content='Simulate loading' icon='lab' />}
            wide
        >
            {data===null? (
                <Placeholder style={{ minWidth: '200px' }}>
                    <Placeholder.Header>
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line length='medium' />
                        <Placeholder.Line length='short' />
                    </Placeholder.Paragraph>
                </Placeholder>
            ):(
                    <>
                        <Header as='h2' content={data.name} subheader={data.title} />
                        <p>{data.description}</p>
                    </>
                )}
        </Popup>
    )
}
