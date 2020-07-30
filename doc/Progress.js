import React, { useState } from 'react';

export const ProgressExampleBar=({ lib: { Progress } }) => <Progress percent={33} />;

export const ProgressExampleLabel=({ lib: { Progress } }) => <Progress percent={55}>Label</Progress>;

export const ProgressExampleLabelProp=({ lib: { Progress } }) => <Progress percent={55} label='Label' />

export const ProgressExampleProgressPercent=({ lib: { Progress } }) => <Progress value='4' total='5' progress='percent' />;

export const ProgressExampleProgressRatio=({ lib: { Progress } }) => <Progress value='3' total='5' progress='ratio' />;

export const ProgressExampleProgressValue=({ lib: { Progress } }) => <Progress progress='value' value={35} />;

export const ProgressExampleProgressValuePercentageOfTotal=({ lib: { Progress } }) => <Progress progress='value' value={35} total={50} />;

export const ProgressExampleAutoSuccess=({ lib: { Progress, Button } }) => {

    const [state, setState]=useState(0);

    const toggle=() => setState(prev => prev===0? 100:0);

    return (
        <div>
            <Progress percent={state} autoSuccess />
            <Button onClick={toggle}>Toggle Complete</Button>
        </div>
    );
};

export const ProgressExampleIndicating=({ lib: { Progress, Button } }) => {

    const [state, setState]=useState(33);

    const increment=() => setState(prev => prev>=100? 0:prev+20);

    return (
        <div>
            <Progress percent={state} indicating />
            <Button onClick={increment}>Increment</Button>
        </div>
    );
};

export const ProgressExampleAttached=({ lib: { Progress, Segment } }) => (
    <Segment>
        <Progress percent={50} attached='top' />
        La la la la
        <Progress percent={50} attached='bottom' />
    </Segment>
);

export const ProgressExampleColor=({ lib: { Progress } }) => (
    <div>
        <Progress percent={32} color='red' />
        <Progress percent={59} color='orange' />
        <Progress percent={13} color='yellow' />
        <Progress percent={37} color='olive' />
        <Progress percent={83} color='green' />
        <Progress percent={23} color='teal' />
        <Progress percent={85} color='blue' />
        <Progress percent={38} color='violet' />
        <Progress percent={47} color='purple' />
        <Progress percent={29} color='pink' />
        <Progress percent={68} color='brown' />
        <Progress percent={36} color='grey' />
        <Progress percent={72} color='black' />
    </div>
);
