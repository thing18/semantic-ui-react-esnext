require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Image as Image0 } from '../dist.0';
import { Image as Image1 } from '../dist.1';

describe('Image', () => {

    it('empty', () => expect(mount(<Image1 />).html()).toBe(mount(<Image0 />).html()));

    it('all props', () => {

        const props={
            avatar: true, bordered: true, centered: true, circular: true, dimmer: { active: true }, disabled: true,
            floated: 'left', fluid: false, hidden: true, href: 'www.google.com', inline: true, rounded: true, size: 'large',
            spaced: 'left', verticalAlign: 'top', wrapped: true,
            label: 'test', src: 'test.jpg', alt: 'this is an image', height: '100px', width: '100px'
        };

        const html1=mount(<Image1 {...props} />).html();
        const html2=mount(<Image0 {...props} />).html();

        expect(html1).toBe(html2);
    });
});
