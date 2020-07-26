require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Dimmer as Dimmer0 } from '../dist.0';
import { Dimmer as Dimmer1 } from '../dist.1';

describe('Dimmer', () => {

    const props={ active: false, page: true };

    const node1=mount(<Dimmer1 {...props} ><div></div></Dimmer1>);
    const node0=mount(<Dimmer0 {...props} ><div></div></Dimmer0>);

    it('initial mount', () => expect(node1.html()).toBe(node0.html()));

    it('update props: set active=true', () => {
        node1.setProps({ active: true });
        node0.setProps({ active: true });
        expect(node1.html()).toBe(node0.html());
    })

    // it('update props: set onMount', () => {

    //     let __flag=0;
    //     const handler=() => __flag+=1;

    //     node1.setProps({ onMount: handler });
    //     node0.setProps({ onMount: handler });

    //     node1.instance().handleMount();
    //     node0.instance().handleMount();
    //     expect(__flag).toBe(2);
    // })

});

process.exitCode=0;
