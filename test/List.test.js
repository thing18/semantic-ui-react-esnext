require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { List as List0 } from '../dist.0';
import { List as List1 } from '../dist.1';
import { copyFile } from 'fs';

describe('List', () => {

    it('empty', () => expect(mount(<List1 />).html()).toBe(mount(<List0 />).html()));

    it('all props', () => {

        const props={
            animated: true, bulleted: true, celled: true, divided: true, floated: 'left', horizontal: true, inverted: true,
            link: true, ordered: true, relaxed: true, selection: true, size: 'large', verticalAlign: 'top', link: true
        };

        const html1=mount(<List1 {...props} />).html();
        const html2=mount(<List0 {...props} />).html();

        expect(html1).toBe(html2);
    });

    it('items:basic', () => {

        const props={
            items: ['Apples', 'Pears', 'Oranges']
        };

        const html1=mount(<List1 {...props} />).html();
        const html2=mount(<List0 {...props} />).html();

        expect(html1).toBe(html2);
    });

    it('items:full', () => {

        const props={
            items: [
                { key: 0, icon: 'copy', content: 'Apples', header: 'header1', description: 'this a description #1' },
                { key: 1, icon: 'paste', content: 'Oranges', header: 'header2', description: 'this a description #2' },
            ]
        };

        const html1=mount(<List1 {...props} />).html();
        const html2=mount(<List0 {...props} />).html();

        expect(html1).toBe(html2);
        // console.log(html1);
    });

    it('onItemClick', () => {

        let __flag=0;

        const props={
            items: ['Apples', 'Pears', 'Oranges'],
            onItemClick: () => ++__flag
        };

        mount(<List1 {...props} />).find('.item').first().simulate('click');
        mount(<List0 {...props} />).find('.item').first().simulate('click');

        expect(__flag).toBe(2);
        // console.log(html1);
    });
});
