require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import * as lib0 from '../dist.0';
import * as lib1 from '../dist.1';
import {
    SidebarExampleMultiple, SidebarExampleTransitions, SidebarExampleDimmed,
    SidebarExampleVisible, SidebarExampleCallback, SidebarExampleTarget
} from '../doc/Sidebar';

const _expect=(C) => {

    const node1=mount(<C lib={lib1} />).childAt(0);
    const node0=mount(<C lib={lib0} />).childAt(0);

    try {
        expect(node1.html()).toBe(node0.html());
    } catch (e) {
        console.log(`1:${node1.childAt(0).debug()}\n0:${node0.childAt(0).debug()}`);
        throw e;
    }
}

describe('Sidebar', () => {

    it('multiple', () => _expect(SidebarExampleMultiple));

    it('transitions', () => _expect(SidebarExampleTransitions));

    it('dimmed', () => _expect(SidebarExampleDimmed));

    it('visible', () => _expect(SidebarExampleVisible));

    it('callback', () => _expect(SidebarExampleCallback));

    it('target', () => _expect(SidebarExampleTarget));

});
