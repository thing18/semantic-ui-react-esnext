require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Grid as Grid0, GridColumn as GridColumn0, GridRow as GridRow0 } from '../dist.0';
import { Grid as Grid1, GridColumn as GridColumn1, GridRow as GridRow1 } from '../dist.1';

test('Grid', () => {

    const run=props => expect(mount(<Grid1 {...props} />).html()).toBe(mount(<Grid0 {...props} />).html());

    run({ divided: 'vertically', celled: true });
    run({ celled: 'internally' });
    run({ columns: 3, container: true });
    run({ columns: 3, doubling: true });
    run({ columns: 3, stackable: true });
    run({ reversed: 'computer', columns: 'equal' });
});

test('GridColumn', () => {

    const run=props => {

        const node1=mount(<Grid1><GridColumn1 {...props} /></Grid1>).html();
        const node0=mount(<Grid0><GridColumn0 {...props} /></Grid0>).html();

        // console.log(`${node1}\n${node0}`);

        return expect(node1).toBe(node0);
    }

    run({ only: 'tablet', color: 'red', width: 4, textAlign: 'justified', verticalAlign: 'top', stretched: true, floated: 'left' });
});

test('GridRow', () => {

    const run=props => {

        const node1=mount(<Grid1><GridRow1 {...props} >test</GridRow1></Grid1>).html();
        const node0=mount(<Grid0><GridRow0 {...props} >test</GridRow0></Grid0>).html();

        // console.log(`${node1}\n${node0}`);

        return expect(node1).toBe(node0);
    }

    run({ centered: true, columns: 'equal', divided: true });
});
