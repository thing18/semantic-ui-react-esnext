require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Rail as Rail0 } from '../dist.0';
import { Rail as Rail1 } from '../dist.1';

test('Rail', () => {

    const run=props => {

        const node1=mount(<Rail1 {...props} ></Rail1>);
        const node0=mount(<Rail0 {...props} ></Rail0>);

        console.log(`${node1.html()}\n${node0.html()}`);

        return expect(node1.matchesElement(node0));
    }

    run({ close: 'very', position: 'left', content: 'this is a test', dividing: true });
});
