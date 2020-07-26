require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Flag as Flag0 } from '../dist.0';
import { Flag as Flag1 } from '../dist.1';

test('Flag', () => {

    const run=props => expect(mount(<Flag1 {...props} />).html()).toBe(mount(<Flag0 {...props} />).html());

    run({ name: 'us' });
});
