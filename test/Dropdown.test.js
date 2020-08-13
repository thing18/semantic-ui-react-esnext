require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import * as lib0 from '../dist.0';
import * as lib1 from '../dist.1';
import { examples, DropdownExamples } from '../doc/Dropdown';

const _expect=(C) => {

    const node1=mount(<C lib={lib1} />).childAt(0);
    const node0=mount(<C lib={lib0} />).childAt(0);

    try {
        expect(node1.html()).toBe(node0.html());
        // expect(node1.matchesElement(node0)).toBeTruthy();
    } catch (e) {
        console.log(`1:${node1.childAt(0).debug()}\n0:${node0.childAt(0).debug()}`);
        throw e;
    }
}

describe('Dropdown', () => {

    it('true', () => _expect(DropdownExamples));

    console.log(examples.reduce((acc, { h, c }) => `${acc}it('${h}', () => _expect(${c.name}))\n`, ''));

});
