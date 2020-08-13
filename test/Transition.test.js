require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import * as lib0 from '../dist.0';
import * as lib1 from '../dist.1';
import { TransitionExampleDuration, TransitionExampleGroupExplorer, TransitionExampleTransitionExplorer, TransitionExampleTransition, TransitionExampleGroup } from '../doc/Transition';

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

describe('Transition', () => {

    it('active', () => _expect(TransitionExampleTransition));

    it('above content', () => _expect(TransitionExampleGroup));

    it('offset', () => _expect(TransitionExampleTransitionExplorer));

    it('overized', () => _expect(TransitionExampleGroupExplorer));

    it('pushing', () => _expect(TransitionExampleDuration));

});
