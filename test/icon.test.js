require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Icon as Icon0, IconGroup as IconGroup0 } from '../dist.0';
import { Icon as Icon1, IconGroup as IconGroup1 } from '../dist.1';


test('Icon', () => {

    const run=props => expect(mount(<Icon1 {...props} />).html()).toBe(mount(<Icon0 {...props} />).html());

    run({ name: 'copy' });
    run({ name: 'copy', disabled: true });
    run({ name: 'copy', loading: true });
    run({ name: 'copy', fitted: true });
    run({ name: 'copy', size: 'large' });
    run({ name: 'copy', link: true });
    run({ name: 'copy', color: 'red' });
    run({ name: 'copy', flipped: 'vertically' });
    run({ name: 'copy', rotated: 'clockwise' });
    run({ name: 'copy', circular: true, inverted: true });
    run({ name: 'copy', bordered: true, inverted: true });
    run({ name: 'copy', disabled: true, bordered: true, inverted: true, loading: true, fitted: true, size: 'large', link: true, color: 'red', flipped: 'vertically', rotated: 'clockwise' });
});

test('Icon.create', () => {

    const run=props => expect(mount(Icon1.create(props)).html()).toBe(mount(Icon0.create(props)).html());

    run({ name: 'copy' });
    run({ name: 'copy', disabled: true });
    run({ name: 'copy', loading: true });
    run({ name: 'copy', fitted: true });
    run({ name: 'copy', size: 'large' });
    run({ name: 'copy', link: true });
    run({ name: 'copy', color: 'red' });
    run({ name: 'copy', flipped: 'vertically' });
    run({ name: 'copy', rotated: 'clockwise' });
    run({ name: 'copy', circular: true, inverted: true });
    run({ name: 'copy', bordered: true, inverted: true });
});

test('IconGroup', () => {

    const icon1=<Icon0 size='big' color='red' name='dont' />;
    const icon2=<Icon0 color='black' name='user' />;

    expect(mount(<IconGroup1 size='huge'>{icon1}{icon2}</IconGroup1>).html()).toBe(mount(<IconGroup0 size='huge'>{icon1}{icon2}</IconGroup0>).html());

});
