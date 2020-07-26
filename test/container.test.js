require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import Faker from 'faker';

import { Container as Container0 } from '../dist.0';
import { Container as Container1 } from '../dist.1';

test('Container', () => {

    const p=Faker.lorem.paragraph();

    const run=props => expect(mount(<Container1 {...props}>{p}</Container1>).html()).toBe(mount(<Container0 {...props}>{p}</Container0>).html());

    run({ fluid: true });
    run({ text: true });
    run({ fluid: true, textAlign: 'left' });
});
