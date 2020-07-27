require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Message as Message0 } from '../dist.0';
import { Message as Message1 } from '../dist.1';

describe('Message', () => {

    it('empty', () => expect(mount(<Message1 />).html()).toBe(mount(<Message0 />).html()));

    it('all props', () => {

        const props={
            attached: 'top', color: 'blue', compact: true, content: 'message', error: true, floating: true,
            header: 'header', hidden: true, icon: 'copy', size: 'large'
        };

        const html1=mount(<Message1 {...props} />).html();
        const html0=mount(<Message0 {...props} />).html();

        expect(html1).toBe(html0);
    });

    it('shorthands', () => {

        const props={
            attached: 'top', color: 'blue', compact: true, content: 'message', error: true, floating: true,
            header: 'header', hidden: true, icon: 'copy', size: 'large', list: ['message1', 'message2', 'message3']
        };

        const html1=mount(<Message1 {...props} />).html();
        const html0=mount(<Message0 {...props} />).html();

        expect(html1).toBe(html0);
    });

    it('event:onDismiss', () => {

        let __flag=0;
        const props={
            header: 'header', icon: 'copy', content: 'content', onDismiss: () => ++__flag
        };

        mount(<Message1 {...props} />).find('.close').first().simulate('click');
        mount(<Message0 {...props} />).find('.close').first().simulate('click');

        expect(__flag).toBe(2);
    });
});
