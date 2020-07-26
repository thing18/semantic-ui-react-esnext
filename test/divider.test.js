require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Divider as Divider0 } from '../dist.0';
import { Divider as Divider1 } from '../dist.1';

test('Divider', () => {

    const run=props => expect(mount(<Divider1 {...props} />).html()).toBe(mount(<Divider0 {...props} />).html());

    run({ vertical: true, content: 'AND' });
    run({ horizontal: true, content: 'AND' });
});
