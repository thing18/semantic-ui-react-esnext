require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Loader as Loader0 } from '../dist.0';
import { Loader as Loader1 } from '../dist.1';

test('Loader', () => {

    const run=props => expect(mount(<Loader1 {...props} >Loading</Loader1>).html()).toBe(mount(<Loader0 {...props} >Loading</Loader0>).html());

    run({});
    run({ active: true, inverted: true, size: 'large' });
    run({ active: true, inverted: true, indeterminate: true, inline: 'centered' });
});
