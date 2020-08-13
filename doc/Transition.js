import _ from 'lodash';
import React, { useState, Fragment, useRef } from 'react';

export const TransitionExampleTransition=({ lib: { Button, Divider, Image, Transition } }) => {

    const [state, setState]=useState({ visible: true });

    const toggleVisibility=() => setState((prevState) => ({ visible: !prevState.visible }))

    const { visible }=state

    return (
        <div>
            <Button
                content={visible? 'Hide':'Show'}
                onClick={toggleVisibility}
            />
            <Divider hidden />
            <Transition visible={visible} animation='scale' duration={500}>
                <Image size='small' src='/images/leaves/1.png' />
            </Transition>
        </div>
    )
};

const users=['ade', 'chris', 'christian', 'daniel', 'elliot', 'helen']

export const TransitionExampleGroup=({ lib: { Button, Image, List, Transition } }) => {

    const [state, setState]=useState({ items: users.slice(0, 3) });

    const handleAdd=() => setState((prevState) => ({ items: users.slice(0, prevState.items.length+1) }))

    const handleRemove=() => setState((prevState) => ({ items: prevState.items.slice(0, -1) }))

    const { items }=state

    return (
        <div>
            <Button.Group>
                <Button
                    disabled={items.length===0}
                    icon='minus'
                    onClick={handleRemove}
                />
                <Button
                    disabled={items.length===users.length}
                    icon='plus'
                    onClick={handleAdd}
                />
            </Button.Group>

            <Transition.Group
                as={List}
                duration={200}
                divided
                size='huge'
                verticalAlign='middle'
            >
                {items.map((item) => (
                    <List.Item key={item}>
                        <Image avatar src={`/images/avatar/small/${item}.jpg`} />
                        <List.Content header={_.startCase(item)} />
                    </List.Item>
                ))}
            </Transition.Group>
        </div>
    )
};

const transitions=['jiggle', 'flash', 'shake', 'pulse', 'tada', 'bounce', 'glow'];

const options=transitions.map((name) => ({ key: name, text: name, value: name }));

export const TransitionExampleTransitionExplorer=({ lib: { Form, Grid, Image, Transition } }) => {

    const [state, setState]=useState({ animation: transitions[0], duration: 500, visible: true })

    const handleChange=(e, { name, value }) => setState({ [name]: value })

    const toggleVisibility=() => setState((prevState) => ({ visible: !prevState.visible }))

    const { animation, duration, visible }=state

    return (
        <Grid columns={2}>
            <Grid.Column as={Form}>
                <Form.Select
                    label='Choose transition'
                    name='animation'
                    onChange={handleChange}
                    options={options}
                    value={animation}
                />
                <Form.Input
                    label={`Duration: ${duration}ms `}
                    min={100}
                    max={2000}
                    name='duration'
                    onChange={handleChange}
                    step={100}
                    type='range'
                    value={duration}
                />
                <Form.Button content='Run' onClick={toggleVisibility} />
            </Grid.Column>

            <Grid.Column>
                <Transition
                    animation={animation}
                    duration={duration}
                    visible={visible}
                >
                    <Image centered size='small' src='/images/leaves/5.png' />
                </Transition>
            </Grid.Column>
        </Grid>
    )
};

const gtransitions=['browse', 'browse right', 'drop', 'fade', 'fade up', 'fade down', 'fade left', 'fade right', 'fly up', 'fly down', 'fly left', 'fly right', 'horizontal flip', 'vertical flip', 'scale', 'slide up', 'slide down', 'slide left', 'slide right', 'swing up', 'swing down', 'swing left', 'swing right', 'zoom'];
const goptions=gtransitions.map((name) => ({ key: name, text: name, value: name }))

export const TransitionExampleGroupExplorer=({ lib: { Form, Grid, Image, Transition } }) => {

    const [state, setState]=useState({ animation: transitions[0], duration: 500, visible: true });

    const handleChange=(e, { name, value }) => setState({ [name]: value })

    const handleVisibility=() => setState((prevState) => ({ visible: !prevState.visible }))

    const { animation, duration, visible }=state

    return (
        <Grid columns={2}>
            <Grid.Column as={Form}>
                <Form.Select
                    label='Choose transition'
                    name='animation'
                    onChange={handleChange}
                    options={goptions}
                    value={animation}
                />
                <Form.Input
                    label={`Duration: ${duration}ms `}
                    min={100}
                    max={2000}
                    name='duration'
                    onChange={handleChange}
                    step={100}
                    type='range'
                    value={duration}
                />
                <Form.Button
                    content={visible? 'Unmount':'Mount'}
                    onClick={handleVisibility}
                />
            </Grid.Column>

            <Grid.Column>
                <Transition.Group animation={animation} duration={duration}>
                    {visible&&(
                        <Image centered size='small' src='/images/leaves/4.png' />
                    )}
                </Transition.Group>
            </Grid.Column>
        </Grid>
    )
};

export const TransitionExampleDuration=({ lib: { Form, Grid, Image, Transition } }) => {

    const [state, setState]=useState({ hide: 500, show: 500, visible: true })

    const handleChange=(e, { name, value }) => setState({ [name]: value })

    const toggleVisibility=() => setState((prevState) => ({ visible: !prevState.visible }))

    const { hide, show, visible }=state

    return (
        <Grid columns={2}>
            <Grid.Column as={Form}>
                <Form.Input
                    label={`Hide duration: ${hide}ms `}
                    min={100}
                    max={5000}
                    name='hide'
                    onChange={handleChange}
                    step={100}
                    type='range'
                    value={hide}
                />
                <Form.Input
                    label={`Show duration: ${show}ms `}
                    min={100}
                    max={5000}
                    name='show'
                    onChange={handleChange}
                    step={100}
                    type='range'
                    value={show}
                />
                <Form.Button content='Run' onClick={toggleVisibility} />
            </Grid.Column>

            <Grid.Column>
                <Transition duration={{ hide, show }} visible={visible}>
                    <Image centered size='small' src='/images/leaves/3.png' />
                </Transition>
            </Grid.Column>
        </Grid>
    )
};

export const TransitionExamples=({ lib }) => (

    <Fragment>

        <h3>Transition</h3>
        <TransitionExampleTransition lib={lib} />

        <Divider />
        <h3>Group</h3>
        <TransitionExampleGroup lib={lib} />

        <Divider />
        <h3>Transition Explorer</h3>
        <TransitionExampleTransitionExplorer lib={lib} />

        <Divider />
        <h3>Group Explorer</h3>
        <TransitionExampleGroupExplorer lib={lib} />

        <Divider />
        <h3>Duration</h3>
        <TransitionExampleDuration lib={lib} />

    </Fragment>
);
