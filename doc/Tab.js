import React, { useState } from 'react';

export const TabExampleActiveIndex=({ lib: { Tab } }) => {

    const [activeIndex, setState]=useState(1);

    const handleRangeChange=(e) => setState(e.target.value);
    const handleTabChange=(e, { activeIndex }) => setState(activeIndex)

    const panes=[
        { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
        { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
        { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
    ]

    return (
        <div>
            <div>activeIndex: {activeIndex}</div>
            <input type='range' max='2' value={activeIndex} onChange={handleRangeChange} />
            <Tab panes={panes} activeIndex={activeIndex} onTabChange={handleTabChange} />
        </div>
    )
};

export const TabExampleDefaultActiveIndex=({ lib: { Tab } }) => <Tab panes={[
    { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
    { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
]} defaultActiveIndex={2} />;

export const TabExampleCustomMenuItem=({ lib: { Tab, Menu, Label } }) => <Tab panes={[
    {
        menuItem: { key: 'users', icon: 'users', content: 'Users' },
        render: () => <Tab.Pane>Tab 1 Content</Tab.Pane>,
    },
    {
        menuItem: (
            <Menu.Item key='messages'>
                Messages<Label>15</Label>
            </Menu.Item>
        ),
        render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
    },
]} />

export const TabExampleContentShorthand=({ lib: { Tab, List, Label } }) => <Tab panes={[
    {
        menuItem: 'Tab 1',
        pane: { key: 'tab1', content: 'This is a massive tab', size: 'massive' },
    },
    {
        menuItem: 'Tab 2',
        pane: { key: 'tab2', content: 'This tab has center-aligned text', textAlign: 'center' },
    },
    {
        menuItem: 'Tab 3',
        pane: { key: 'tab3', content: <div>This tab contains a <Label>JSX</Label> element</div> },
    },
    {
        menuItem: 'Tab 4',
        pane: (
            <Tab.Pane key='tab4'>
                <p>This tab has complex content</p>

                <List>
                    <List.Item>Apples</List.Item>
                    <List.Item>Pears</List.Item>
                    <List.Item>Oranges</List.Item>
                </List>
            </Tab.Pane>
        ),
    },
]} renderActiveOnly={false} />;

const panes=[
    { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
    { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
]

export const TabExampleOnTabChange=({ lib: { Tab, Segment } }) => {

    const [state, setState]=useState({});

    const handleChange=(e, data) => setState(data);

    return (
        <div>
            <Tab panes={panes} onTabChange={handleChange} />
            <Segment tertiary>
                <pre>{JSON.stringify(state, null, 2)}</pre>
            </Segment>
        </div>
    )
};

export const TabExampleVerticalTabular=({ lib: { Tab } }) =>
    <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={[
        { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
        { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
        { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
    ]} />;



export const TabExample=({ lib }) => {

    return (
        <div>
            <h3>Active index</h3>
            <TabExampleActiveIndex lib={lib} />

            <br />
            <h3>Default active index</h3>
            <TabExampleDefaultActiveIndex lib={lib} />

            <br />
            <h3>Custom menu item</h3>
            <TabExampleCustomMenuItem lib={lib} />

            <br />
            <h3>Content shorthand</h3>
            <TabExampleContentShorthand lib={lib} />

            <br />
            <h3>Tab onTabChange</h3>
            should display active tab props on every change
            <TabExampleOnTabChange lib={lib} />

            <br />
            <h3>Vertical menu</h3>
            <TabExampleVerticalTabular lib={lib} />
        </div>
    );
}
