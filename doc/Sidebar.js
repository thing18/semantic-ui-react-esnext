import React, { useState, Fragment } from 'react';

export const SidebarExampleMultiple=({ lib: { Checkbox, Grid, Header, Icon, Image, Menu, Segment, Sidebar } }) => {
    const [visible, setVisible]=useState(false)

    return (
        <Grid columns={1}>
            <Grid.Column>
                <Checkbox
                    checked={visible}
                    label={{ children: <code>visible</code> }}
                    onChange={(e, data) => setVisible(data.checked)}
                />
            </Grid.Column>

            <Grid.Column>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        direction='left'
                        icon='labeled'
                        inverted
                        onHide={() => setVisible(false)}
                        vertical
                        visible={visible}
                        width='thin'
                    >
                        <Menu.Item as='a' icon='home' content='Home' />
                        <Menu.Item as='a' icon='gamepad' content='Games' />
                        <Menu.Item as='a' icon='camera' content='Channels' />
                    </Sidebar>

                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        direction='right'
                        inverted
                        vertical
                        visible={visible}
                    >
                        <Menu.Item as='a' header conent='File Permissions' />
                        <Menu.Item as='a'>Share on Social</Menu.Item>
                        <Menu.Item as='a'>Share by E-mail</Menu.Item>
                        <Menu.Item as='a'>Edit Permissions</Menu.Item>
                        <Menu.Item as='a'>Delete Permanently</Menu.Item>
                    </Sidebar>

                    <Sidebar.Pusher>
                        <Segment basic>
                            <Header as='h3'>Application Content</Header>
                            <Image src='/images/wireframe/paragraph.png' />
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Grid.Column>
        </Grid>
    )
}

function exampleReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_ANIMATION':
            return { ...state, animation: action.animation, visible: !state.visible }
        case 'CHANGE_DIMMED':
            return { ...state, dimmed: action.dimmed }
        case 'CHANGE_DIRECTION':
            return { ...state, direction: action.direction, visible: false }
        default:
            throw new Error()
    }
}

export const SidebarExampleTransitions=({ lib: { Button, Checkbox, Grid, Header, Icon, Image, Menu, Segment, Sidebar } }) => {
    const [state, dispatch]=React.useReducer(exampleReducer, {
        animation: 'overlay',
        direction: 'left',
        dimmed: false,
        visible: false,
    })

    const { animation, dimmed, direction, visible }=state;
    const vertical=direction==='bottom'||direction==='top'

    const VerticalSidebar=({ animation, direction, visible }) => (
        <Sidebar
            as={Menu}
            animation={animation}
            direction={direction}
            icon='labeled'
            inverted
            vertical
            visible={visible}
            width='thin'
        >
            <Menu.Item as='a'>
                <Icon name='home' />
                Home
            </Menu.Item>
            <Menu.Item as='a'>
                <Icon name='gamepad' />
                Games
            </Menu.Item>
            <Menu.Item as='a'>
                <Icon name='camera' />
                Channels
            </Menu.Item>
        </Sidebar>
    );

    const HorizontalSidebar=({ animation, direction, visible }) => (
        <Sidebar
            as={Segment}
            animation={animation}
            direction={direction}
            visible={visible}
        >
            <Grid textAlign='center'>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Header as='h3'>New Content Awaits</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                    <Grid.Column>
                        <Image src='/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                    <Grid.Column>
                        <Image src='/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                    <Grid.Column>
                        <Image src='/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Sidebar>
    );

    return (
        <div>
            <Checkbox
                checked={dimmed}
                label='Dim Page'
                onChange={(e, { checked }) =>
                    dispatch({ type: 'CHANGE_DIMMED', dimmed: checked })
                }
                toggle
            />

            <Header as='h5'>Direction</Header>
            <Button.Group>
                <Button
                    active={direction==='left'}
                    onClick={() =>
                        dispatch({ type: 'CHANGE_DIRECTION', direction: 'left' })
                    }
                >
                    Left
        </Button>
                <Button
                    active={direction==='right'}
                    onClick={() =>
                        dispatch({ type: 'CHANGE_DIRECTION', direction: 'right' })
                    }
                >
                    Right
        </Button>
                <Button
                    active={direction==='top'}
                    onClick={() =>
                        dispatch({ type: 'CHANGE_DIRECTION', direction: 'top' })
                    }
                >
                    Top
        </Button>
                <Button
                    active={direction==='bottom'}
                    onClick={() =>
                        dispatch({ type: 'CHANGE_DIRECTION', direction: 'bottom' })
                    }
                >
                    Bottom
        </Button>
            </Button.Group>

            <Header as='h5'>All Direction Animations</Header>
            <Button
                onClick={() =>
                    dispatch({ type: 'CHANGE_ANIMATION', animation: 'overlay' })
                }
            >
                Overlay
      </Button>
            <Button
                onClick={() =>
                    dispatch({ type: 'CHANGE_ANIMATION', animation: 'push' })
                }
            >
                Push
      </Button>
            <Button
                onClick={() =>
                    dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' })
                }
            >
                Scale Down
      </Button>

            <Header as='h5'>Vertical-Only Animations</Header>
            <Button
                disabled={vertical}
                onClick={() =>
                    dispatch({ type: 'CHANGE_ANIMATION', animation: 'uncover' })
                }
            >
                Uncover
      </Button>
            <Button
                disabled={vertical}
                onClick={() =>
                    dispatch({ type: 'CHANGE_ANIMATION', animation: 'slide along' })
                }
            >
                Slide Along
      </Button>
            <Button
                disabled={vertical}
                onClick={() =>
                    dispatch({ type: 'CHANGE_ANIMATION', animation: 'slide out' })
                }
            >
                Slide Out
      </Button>

            <Sidebar.Pushable as={Segment} style={{ overflow: 'hidden' }}>
                {vertical&&(
                    <HorizontalSidebar
                        animation={animation}
                        direction={direction}
                        visible={visible}
                    />
                )}
                {!vertical&&(
                    <VerticalSidebar
                        animation={animation}
                        direction={direction}
                        visible={visible}
                    />
                )}

                <Sidebar.Pusher dimmed={dimmed&&visible}>
                    <Segment basic>
                        <Header as='h3'>Application Content</Header>
                        <Image src='/images/wireframe/paragraph.png' />
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
    )
}

export const SidebarExampleDimmed=({ lib: { Checkbox, Grid, Header, Icon, Image, Menu, Segment, Sidebar } }) => {
    const [visible, setVisible]=React.useState(false)

    return (
        <Grid columns={1}>
            <Grid.Column>
                <Checkbox
                    checked={visible}
                    label={{ children: <code>visible</code> }}
                    onChange={(e, data) => setVisible(data.checked)}
                />
            </Grid.Column>

            <Grid.Column>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        icon='labeled'
                        inverted
                        onHide={() => setVisible(false)}
                        vertical
                        visible={visible}
                        width='thin'
                    >
                        <Menu.Item as='a'>
                            <Icon name='home' />
              Home
            </Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='gamepad' />
              Games
            </Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='camera' />
              Channels
            </Menu.Item>
                    </Sidebar>

                    <Sidebar.Pusher dimmed={visible}>
                        <Segment basic>
                            <Header as='h3'>Application Content</Header>
                            <Image src='/images/wireframe/paragraph.png' />
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Grid.Column>
        </Grid>
    )
}

export const SidebarExampleVisible=({ lib: { Header, Icon, Image, Menu, Segment, Sidebar } }) => (
    <Sidebar.Pushable as={Segment}>
        <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            vertical
            visible
            width='thin'
        >
            <Menu.Item as='a'>
                <Icon name='home' />
        Home
      </Menu.Item>
            <Menu.Item as='a'>
                <Icon name='gamepad' />
        Games
      </Menu.Item>
            <Menu.Item as='a'>
                <Icon name='camera' />
        Channels
      </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher>
            <Segment basic>
                <Header as='h3'>Application Content</Header>
                <Image src='/images/wireframe/paragraph.png' />
            </Segment>
        </Sidebar.Pusher>
    </Sidebar.Pushable>
)

const initialState={ items: [], count: 0 }

const logReducer=(state, action) => {
    switch (action.type) {
        case 'clearLog':
            return initialState
        case 'updateLog':
            return {
                items: [
                    `${new Date().toLocaleTimeString()}: ${action.name}`,
                    ...state.items,
                ].slice(0, 20),
                count: state.count+1,
            }
        default:
            return state
    }
}

export const SidebarExampleCallback=({ lib: { Button, Checkbox, Grid, Header, Image, Label, Menu, Segment, Sidebar } }) => {
    const [logs, dispatch]=React.useReducer(logReducer, initialState)
    const [visible, setVisible]=React.useState(false)

    return (
        <Grid>
            <Grid.Column width={16}>
                <Checkbox
                    checked={visible}
                    label={{ children: <code>visible</code> }}
                    onChange={(e, data) => setVisible(data.checked)}
                />
            </Grid.Column>

            <Grid.Column width={8}>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        icon='labeled'
                        inverted
                        onHidden={() => dispatch({ name: 'onHidden', type: 'updateLog' })}
                        onHide={() => {
                            setVisible(false)
                            dispatch({ name: 'onHide', type: 'updateLog' })
                        }}
                        onShow={() => dispatch({ name: 'onShow', type: 'updateLog' })}
                        onVisible={() => dispatch({ name: 'onVisible', type: 'updateLog' })}
                        vertical
                        visible={visible}
                        width='thin'
                    >
                        <Menu.Item as='a'>Home</Menu.Item>
                        <Menu.Item as='a'>Games</Menu.Item>
                        <Menu.Item as='a'>Channels</Menu.Item>
                    </Sidebar>

                    <Sidebar.Pusher>
                        <Segment basic>
                            <Header as='h3'>Application Content</Header>
                            <Image src='/images/wireframe/paragraph.png' />
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Grid.Column>

            <Grid.Column width={8}>
                <Segment.Group>
                    <Segment>
                        <Button
                            compact
                            size='small'
                            floated='right'
                            onClick={() => dispatch({ type: 'clearLog' })}
                        >
                            Clear
            </Button>
            Event Log <Label circular>{logs.count}</Label>
                    </Segment>
                    <Segment secondary>
                        <pre>
                            {logs.items.map((e, i) => (
                                <div key={i}>{e}</div>
                            ))}
                        </pre>
                    </Segment>
                </Segment.Group>
            </Grid.Column>
        </Grid>
    )
}

export const SidebarExampleTarget=({ lib: { Checkbox, Grid, Header, Image, Menu, Ref, Segment, Sidebar } }) => {
    const segmentRef=React.useRef()
    const [visible, setVisible]=React.useState(false)

    return (
        <Grid columns={1}>
            <Grid.Column>
                <Checkbox
                    checked={visible}
                    label={{ children: <code>visible</code> }}
                    onChange={(e, data) => setVisible(data.checked)}
                />
            </Grid.Column>

            <Grid.Column>
                <Sidebar.Pushable as={Segment.Group} raised>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        icon='labeled'
                        inverted
                        onHide={() => setVisible(false)}
                        vertical
                        target={segmentRef}
                        visible={visible}
                        width='thin'
                    >
                        <Menu.Item as='a'>Home</Menu.Item>
                        <Menu.Item as='a'>Games</Menu.Item>
                        <Menu.Item as='a'>Channels</Menu.Item>
                    </Sidebar>

                    <Ref innerRef={segmentRef}>
                        <Segment secondary>
                            <Header as='h3'>Clickable area</Header>
                            <p>When you will click there, the sidebar will be closed.</p>
                        </Segment>
                    </Ref>

                    <Segment>
                        <Header as='h3'>Application Content</Header>
                        <Image src='/images/wireframe/paragraph.png' />
                    </Segment>
                </Sidebar.Pushable>
            </Grid.Column>
        </Grid>
    )
}

export const SidebarExamples=({ lib, lib: { Divider } }) => (

    <Fragment>

        <h3>Visible</h3>
        <SidebarExampleVisible lib={lib} />

        <Divider />
        <h3>Dimmed</h3>
        <SidebarExampleDimmed lib={lib} />

        <Divider />
        <h3>Multiple</h3>
        <SidebarExampleMultiple lib={lib} />

        <Divider />
        <h3>Transitions</h3>
        <SidebarExampleTransitions lib={lib} />

        <Divider />
        <h3>Callback</h3>
        <SidebarExampleCallback lib={lib} />

        <Divider />
        <h3>Target</h3>
        <SidebarExampleTarget lib={lib} />

    </Fragment>
);
