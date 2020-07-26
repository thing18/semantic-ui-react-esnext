require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Step as Step0, StepGroup as StepGroup0 } from '../dist.0';
import { Step as Step1, StepGroup as StepGroup1 } from '../dist.1';

test('Step', () => {

    const run=props => {

        const node1=mount(<Step1 {...props} ></Step1>);
        const node0=mount(<Step0 {...props} ></Step0>);

        console.log(`${node1.html()}\n${node0.html()}`);
        // console.log(Step0.handledProps);

        // return expect(node1.matchesElement(node0));
        expect(node1.html()).toBe(node0.html());
        node1.simulate('click');
    }

    run({
        active: true, icon: 'copy', ordered: true,
        title: 'title',
        description: 'description',
        onClick: () => console.log('onClick called'),
    });
});

test('StepGroup', () => {

    const run=props => {

        const node1=mount(<StepGroup1 {...props} ></StepGroup1>);
        const node0=mount(<StepGroup0 {...props} ></StepGroup0>);

        console.log(`${node1.html()}\n${node0.html()}`);
        // console.log(Step0.handledProps);

        // return expect(node1.matchesElement(node0));
        expect(node1.html()).toBe(node0.html());
        node1.simulate('click');
    }

    run({
        attached: 'top', size: 'large', ordered: true,
        items: [
            {
                key: 'shipping',
                icon: 'truck',
                title: 'Shipping',
                description: 'Choose your shipping options',
            },
            {
                key: 'billing',
                active: true,
                icon: 'payment',
                title: 'Billing',
                description: 'Enter billing information',
            },
            { key: 'confirm', disabled: true, icon: 'info', title: 'Confirm Order' },
        ],
        onClick: () => console.log('onClick called'),
    });
});
