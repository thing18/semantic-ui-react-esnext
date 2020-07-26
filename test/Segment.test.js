require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Segment as Segment0 } from '../dist.0';
import { Segment as Segment1 } from '../dist.1';

test('Segment', () => {

    const run=props => {

        const node1=mount(<Segment1 {...props} ></Segment1>);
        const node0=mount(<Segment0 {...props} ></Segment0>);

        console.log(`${node1.html()}\n${node0.html()}`);

        // return expect(node1.matchesElement(node0));
        return expect(node1.html()).toBe(node0.html());
    }

    run({ attached: 'top', basic: true, loading: true });
});
