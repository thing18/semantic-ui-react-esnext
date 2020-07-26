require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Portal as Portal0 } from '../dist.0';
import { Portal as Portal1 } from '../dist.1';

describe('Portal', () => {

    const props={ open: false, trigger: <button /> };

    const node1=mount(<Portal1 {...props} ><div></div></Portal1>);
    const node0=mount(<Portal0 {...props} ><div></div></Portal0>);

    it('initial mount', () => expect(node1.html()).toBe(node0.html()));

    it('update props: set open=true', () => {
        node1.setProps({ open: true });
        node0.setProps({ open: true });
        expect(node1.html()).toBe(node0.html());
    })

    it('update props: set onMount', () => {

        let __flag=0;
        const handler=() => __flag+=1;

        node1.setProps({ onMount: handler });
        node0.setProps({ onMount: handler });

        node1.instance().handleMount();
        node0.instance().handleMount();
        expect(__flag).toBe(2);
    })

});

process.exitCode=0;
