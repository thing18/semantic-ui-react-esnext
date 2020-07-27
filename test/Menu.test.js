require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Menu as Menu0 } from '../dist.0';
import { Menu as Menu1 } from '../dist.1';

describe('Menu', () => {

    it('empty', () => expect(mount(<Menu1 />).html()).toBe(mount(<Menu0 />).html()));

    it('all props', () => {

        const props={
            activeIndex: 0, items: ['item1', 'item2', 'item3'],
            attached: 'top', borderless: true,
        };

        const html1=mount(<Menu1 {...props} />).html();
        const html0=mount(<Menu0 {...props} />).html();

        expect(html1).toBe(html0);
    });

    it('event:Click', () => {

        const props={
            activeIndex: 0, items: ['item1', 'item2', 'item3'],
            attached: 'top', borderless: true,
        };

        const html1=mount(<Menu1 {...props} />);
        const html0=mount(<Menu0 {...props} />);

        expect(html1.html()).toBe(html0.html());

        html1.find('.item').last().simulate('click');
        html0.find('.item').last().simulate('click');

        expect(html1.html()).not.toBe(html0.html());
        console.log(`1:${html1.html()}\n0:${html0.html()}`);
    });
});
