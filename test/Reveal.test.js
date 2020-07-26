require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Reveal as Reveal0 } from '../dist.0';
import { Reveal as Reveal1 } from '../dist.1';

test('Reveal', () => {

    const run=props => {

        const node1=mount(<Reveal1 {...props} ></Reveal1>);
        const node0=mount(<Reveal0 {...props} ></Reveal0>);

        console.log(`${node1.html()}\n${node0.html()}`);

        return expect(node1.matchesElement(node0));
    }

    run({ active: true, animated: 'fade', instant: true });
});
