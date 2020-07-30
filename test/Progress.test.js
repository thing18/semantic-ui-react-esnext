require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import * as lib0 from '../dist.0';
import * as lib1 from '../dist.1';
import { ProgressExampleBar, ProgressExampleLabel, ProgressExampleLabelProp, ProgressExampleProgressPercent, ProgressExampleProgressRatio, ProgressExampleProgressValue, ProgressExampleProgressValuePercentageOfTotal, ProgressExampleAutoSuccess, ProgressExampleIndicating, ProgressExampleAttached, ProgressExampleColor } from '../doc/Progress';

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

describe('Tab', () => {

    it('label', () => _expect(ProgressExampleLabel));

    it('label:props', () => _expect(ProgressExampleLabelProp));

    it('bar', () => _expect(ProgressExampleBar));

    it('bar:percent', () => _expect(ProgressExampleProgressPercent));

    it('bar:ratio', () => _expect(ProgressExampleProgressRatio));

    it('bar:value', () => _expect(ProgressExampleProgressValue));

    it('bar:value/total', () => _expect(ProgressExampleProgressValuePercentageOfTotal));

    it('auto success', () => _expect(ProgressExampleAutoSuccess));

    it('indicating', () => _expect(ProgressExampleIndicating));

    it('attached', () => _expect(ProgressExampleAttached));

    it('color', () => _expect(ProgressExampleColor));
});
