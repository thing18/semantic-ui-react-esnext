require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import * as lib0 from '../dist.0';
import * as lib1 from '../dist.1';
import { StickyExampleActive, StickyExampleAboveContent, StickyExampleOffset, StickyExampleOversized, StickyExamplePushing, StickyExampleAdjacentContext } from '../doc/Sticky';

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

describe('Sticky', () => {

    it('active', () => _expect(StickyExampleActive));

    it('above content', () => _expect(StickyExampleAboveContent));

    it('offset', () => _expect(StickyExampleOffset));

    it('overized', () => _expect(StickyExampleOversized));

    it('pushing', () => _expect(StickyExamplePushing));

    it('Adjacent Context', () => _expect(StickyExampleAdjacentContext));

});
