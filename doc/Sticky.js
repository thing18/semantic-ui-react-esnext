import _ from 'lodash';
import React, { useState, Fragment, useRef } from 'react';

const Placeholder=({ Image }) => <Image src='/images/wireframe/paragraph.png' />;

export const StickyExampleActive=({ lib: { Checkbox, Grid, Header, Image, Rail, Ref, Segment, Sticky } }) => {

    const [state, setState]=useState({ active: true });
    const contextRef=useRef();

    const handleToggle=() => setState((prevState) => ({ active: !prevState.active }));

    const { active }=state;

    return (
        <Grid centered columns={3}>
            <Grid.Column>
                <Ref innerRef={contextRef}>
                    <Segment>
                        {_.times(10, (i) => <Placeholder key={i} Image={Image} />)}

                        <Rail position='left'>
                            <Sticky context={contextRef}>
                                <Segment>
                                    <Checkbox
                                        checked={active}
                                        label='Activate Sticky on right'
                                        onChange={handleToggle}
                                        toggle
                                    />
                                </Segment>
                            </Sticky>
                        </Rail>

                        <Rail position='right'>
                            <Sticky active={active} context={contextRef}>
                                <Header as='h3'>Stuck Content</Header>
                                <Image src='/images/wireframe/image.png' />
                            </Sticky>
                        </Rail>
                    </Segment>
                </Ref>
            </Grid.Column>
        </Grid>
    )
};

export const StickyExampleOversized=({ lib: { Grid, Header, Image, Item, Rail, Ref, Segment, Sticky } }) => {

    // const [state, setState]=useState({});
    const contextRef=useRef()

    return (
        <Grid centered columns={3}>
            <Grid.Column>
                <Ref innerRef={contextRef}>
                    <Segment>
                        {_.times(15, (i) => <Placeholder key={i} Image={Image} />)}

                        <Rail position='left'>
                            <Sticky context={contextRef}>
                                <Item.Group divided>
                                    {_.times(12, (i) => (
                                        <Item key={i}>
                                            <Item.Image
                                                size='tiny'
                                                src='/images/wireframe/image.png'
                                            />
                                            <Item.Content>
                                                <Item.Header as='a'>Followup Article</Item.Header>
                                                <Item.Meta>By Author</Item.Meta>
                                            </Item.Content>
                                        </Item>
                                    ))}
                                </Item.Group>
                            </Sticky>
                        </Rail>

                        <Rail position='right'>
                            <Sticky context={contextRef}>
                                <Header as='h3'>Stuck Content</Header>
                                <Image src='/images/wireframe/image.png' />
                            </Sticky>
                        </Rail>
                    </Segment>
                </Ref>
            </Grid.Column>
        </Grid>
    )
};

export const StickyExampleAboveContent=({ lib: { Image, Input, Menu, Segment, Sticky } }) => {

    const contextRef=useRef()

    return (
        <div ref={contextRef}>
            <Sticky context={contextRef}>
                <Menu
                    attached='top'
                    tabular
                    style={{ backgroundColor: '#fff', paddingTop: '1em' }}
                >
                    <Menu.Item as='a' active name='bio' />
                    <Menu.Item as='a' active={false} name='photos' />
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Input
                                transparent
                                icon={{ name: 'search', link: true }}
                                placeholder='Search users...'
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Sticky>
            <Segment attached='bottom'>
                {_.times(5, (i) => (
                    <Image key={i} src='/images/wireframe/paragraph.png' />
                ))}
            </Segment>
        </div>
    )
};

export const StickyExampleOffset=({ lib: { Grid, Header, Image, Rail, Ref, Segment, Sticky } }) => {

    const contextRef=useRef()

    return (
        <Grid centered columns={3}>
            <Grid.Column>
                <Ref innerRef={contextRef}>
                    <Segment>
                        {_.times(10, (i) => (
                            <Placeholder key={i} Image={Image} />
                        ))}

                        <Rail position='left'>
                            {_.times(3, (i) => (
                                <Placeholder key={i} Image={Image} />
                            ))}

                            <Sticky context={contextRef} offset={100}>
                                <Header as='h3'>Stuck Content</Header>
                                <Image src='/images/wireframe/image.png' />
                            </Sticky>
                        </Rail>

                        <Rail position='right'>
                            <Sticky
                                bottomOffset={50}
                                context={contextRef}
                                offset={50}
                                pushing
                            >
                                <Header as='h3'>Stuck Content</Header>
                                <Image src='/images/wireframe/image.png' />
                            </Sticky>
                        </Rail>
                    </Segment>
                </Ref>
            </Grid.Column>
        </Grid>
    )
};

export const StickyExampleAdjacentContext=({ lib: { Grid, Header, Image, Rail, Ref, Segment, Sticky } }) => {

    const contextRef=useRef()

    return (
        <Grid centered columns={3}>
            <Grid.Column>
                <Ref innerRef={contextRef}>
                    <Segment>
                        {_.times(10, (i) => (
                            <Placeholder key={i} Image={Image} />
                        ))}

                        <Rail position='left'>
                            {_.times(3, (i) => (
                                <Placeholder key={i} Image={Image} />
                            ))}

                            <Sticky context={contextRef}>
                                <Header as='h3'>Stuck Content</Header>
                                <Image src='/images/wireframe/image.png' />
                            </Sticky>
                        </Rail>

                        <Rail position='right'>
                            <Sticky context={contextRef}>
                                <Header as='h3'>Stuck Content</Header>
                                <Image src='/images/wireframe/image.png' />
                            </Sticky>
                        </Rail>
                    </Segment>
                </Ref>
            </Grid.Column>
        </Grid>
    )
};

export const StickyExamplePushing=({ lib: { Grid, Header, Image, Rail, Ref, Segment, Sticky } }) => {
    const contextRef=useRef()

    return (
        <Grid centered columns={3}>
            <Grid.Column>
                <Ref innerRef={contextRef}>
                    <Segment>
                        {_.times(10, (i) => (
                            <Placeholder key={i} Image={Image} />
                        ))}

                        <Rail position='left'>
                            <Sticky context={contextRef} pushing>
                                <Header as='h3'>Stuck Content</Header>
                                <Image src='/images/wireframe/image.png' />
                            </Sticky>
                        </Rail>

                        <Rail position='right'>
                            {_.times(3, (i) => (
                                <Placeholder key={i} Image={Image} />
                            ))}

                            <Sticky context={contextRef} pushing>
                                <Header as='h3'>Stuck Content</Header>
                                <Image src='/images/wireframe/image.png' />
                            </Sticky>
                        </Rail>
                    </Segment>
                </Ref>
            </Grid.Column>
        </Grid>
    )
};

export const StickyExamples=({ lib }) => (

    <Fragment>

        <h3>Active</h3>
        <StickyExampleActive lib={lib} />

        <Divider />
        <h3>Offset</h3>
        <StickyExampleOffset lib={lib} />

        <Divider />
        <h3>Above content</h3>
        <StickyExampleAboveContent lib={lib} />

        <Divider />
        <h3>Adjacent context</h3>
        <StickyExampleAdjacentContext lib={lib} />

        <Divider />
        <h3>Oversized</h3>
        <StickyExampleOversized lib={lib} />

        <Divider />
        <h3>Pushing</h3>
        <StickyExamplePushing lib={lib} />

    </Fragment>
);
