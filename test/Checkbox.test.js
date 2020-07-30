require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Checkbox as Checkbox0, Icon as Icon0, Image as Image0, Button as Button0 } from '../dist.0';
import { Checkbox as Checkbox1, Icon as Icon1, Image as Image1, Button as Button1 } from '../dist.1';

const _expect=(C) => {

    const wrapper1=mount(<C Checkbox={Checkbox1} Icon={Icon1} Image={Image1} Button={Button1} />).childAt(0);
    const node0=mount(<C Checkbox={Checkbox0} Icon={Icon0} Image={Image0} Button={Button0} />).childAt(0);

    try {
        expect(wrapper1.html()).toBe(node0.html());
    } catch (e) {
        console.log(`1:${wrapper1.childAt(0).debug()}\n0:${node0.childAt(0).debug()}`);
        throw e;
    }
}

describe('Checkbox', () => {

    it('empty', () => expect(mount(<Checkbox1 />).html()).toBe(mount(<Checkbox0 />).html()));

    // it('default:checked', () => _expect(Checked));
});

const Checked=({ Checkbox }) => <Checkbox label='This checkbox comes pre-checked' defaultChecked />;
