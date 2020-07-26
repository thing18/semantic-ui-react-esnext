require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Table as Table0 } from '../dist.0';
import { Table as Table1 } from '../dist.1';

describe('Table', () => {

    it('empty', () => expect(mount(<Table1 />).html()).toBe(mount(<Table0 />).html()));

    it('all props', () => {

        const props={
            attached: true, basic: true, celled: true, collapsing: true, color: 'red', columns: 4,
            compact: true, definition: true, fixed: true, inverted: true, padded: true, selectable: true,
            singleLine: true, size: 'large', sortable: true, stackable: true, striped: true, structured: true,
            textAlign: 'right', unstackable: true, verticalAlign: 'middle'
        };

        const html1=mount(<Table1 {...props} />).html();
        const html0=mount(<Table0 {...props} />).html();

        expect(html1).toBe(html0);
    });

    it('shorthands', () => {

        const props={
            footerRow: { cells: ['footer1', 'footer2', 'footer3', 'footer4'] },
            headerRows: [{ cells: ['header1', 'header2', 'header3', 'header4'] }]
        };

        const html1=mount(<Table1 {...props} />).html();
        const html0=mount(<Table0 {...props} />).html();

        expect(html1).toBe(html0);
    });
});
