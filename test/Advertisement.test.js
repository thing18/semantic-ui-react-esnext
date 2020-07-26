require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Advertisement as Advertisement0 } from '../dist.0';
import { Advertisement as Advertisement1 } from '../dist.1';

test('Advertisement', () => {

    const run=props => {

        const node1=mount(<Advertisement1 {...props} ></Advertisement1>);
        const node0=mount(<Advertisement0 {...props} ></Advertisement0>);

        console.log(`${node1.html()}\n${node0.html()}`);

        return expect(node1.matchesElement(node0));
    }

    run({ unit: 'billboard', centered: true, test: 'this a text' });
});
