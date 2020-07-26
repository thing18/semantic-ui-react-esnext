require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Header as Header0 } from '../dist.0';
import { Header as Header1 } from '../dist.1';

describe('Header', () => {

    it('empty', () => expect(mount(<Header1 />).html()).toBe(mount(<Header0 />).html()));

    it('as:h1', () => {

        const props={
            as: 'h1', content: 'test'
        };

        const html1=mount(<Header1 {...props} />).html();
        const html2=mount(<Header0 {...props} />).html();

        expect(html1).toBe(html2);
    });

    it('as:default', () => {

        const props={
            attached: 'top', block: true, color: 'red', content: 'test', disabled: true, dividing: true,
            floated: 'left', icon: 'copy', inverted: true, size: 'large', sub: true,
            subheader: 'subheader', textAlign: 'right', href: 'www.google.com'
        };

        const html1=mount(<Header1 {...props} />).html();
        const html2=mount(<Header0 {...props} />).html();

        expect(html1).toBe(html2);
    });
});
