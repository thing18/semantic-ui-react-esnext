require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Breadcrumb as Breadcrumb0 } from '../dist.0';
import { Breadcrumb as Breadcrumb1 } from '../dist.1';

describe('Breadcrumb', () => {

    it('empty', () => expect(mount(<Breadcrumb1 />).html()).toBe(mount(<Breadcrumb0 />).html()));

    // it('all props', () => {

    //     const props={
    //         attached: true, basic: true, celled: true, collapsing: true, color: 'red', columns: 4,
    //         compact: true, definition: true, fixed: true, inverted: true, padded: true, selecBreadcrumb: true,
    //         singleLine: true, size: 'large', sorBreadcrumb: true, stackable: true, striped: true, structured: true,
    //         textAlign: 'right', unstackable: true, verticalAlign: 'middle'
    //     };

    //     const html1=mount(<Breadcrumb1 {...props} />).html();
    //     const html0=mount(<Breadcrumb0 {...props} />).html();

    //     expect(html1).toBe(html0);
    // });

    // it('shorthands', () => {

    //     const props={
    //         footerRow: { cells: ['footer1', 'footer2', 'footer3', 'footer4'] },
    //         headerRows: [{ cells: ['header1', 'header2', 'header3', 'header4'] }]
    //     };

    //     const html1=mount(<Breadcrumb1 {...props} />).html();
    //     const html0=mount(<Breadcrumb0 {...props} />).html();

    //     expect(html1).toBe(html0);
    // });
});
