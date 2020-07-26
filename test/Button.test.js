require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Button as Button0, ButtonOr as ButtonOr0, ButtonGroup as ButtonGroup0 } from '../dist.0';
import { Button as Button1, ButtonOr as ButtonOr1, ButtonGroup as ButtonGroup1 } from '../dist.1';

describe('Button', () => {

    it('empty', () => expect(mount(<Button1 />).html()).toBe(mount(<Button0 />).html()));

    it('all props', () => {

        const props={
            active: true, animated: true, attached: 'bottom', basic: true, circular: true, color: 'red',
            compact: true, content: 'button text', disabled: true, floated: 'left', fluid: true, icon: 'copy',
            inverted: true, label: 'test label', labelPosition: 'left', loading: true, negative: true,
            positive: false, primary: true, secondary: false, size: 'large', toggle: true, role: 'button', tabIndex: '2'
        };

        const html1=mount(<Button1 {...props} />).html();
        const html2=mount(<Button0 {...props} />).html();

        expect(html1).toBe(html2);
    });

    it('event:onClick:enabled', () => {

        let __flag=0;

        const props={
            disabled: false, content: 'button text', onClick: () => ++__flag
        };

        mount(<Button1 {...props} />).find('.button').first().simulate('click');
        mount(<Button0 {...props} />).find('.button').first().simulate('click');

        expect(__flag).toBe(2);
    });

    it('event:onClick:disabled', () => {

        let __flag=0;

        const props={
            disabled: true, content: 'button text', onClick: () => ++__flag
        };

        mount(<Button1 {...props} />).find('.button').first().simulate('click');
        mount(<Button0 {...props} />).find('.button').first().simulate('click');

        expect(__flag).toBe(0);
    });

    it('ref', () => {

        const ref1=React.createRef();
        const ref0=React.createRef();

        const props={ content: 'content', label: 'label' };

        mount(<Button1 {...props} ref={ref1} />);
        mount(<Button0 {...props} ref={ref0} />);

        expect(ref1.current).not.toBe(null);
        expect(ref0.current).not.toBe(null);
        expect(typeof ref1.current.focus).toBe('function');
        expect(typeof ref0.current.focus).toBe('function');
    });


    it('factory', () => {

        const props={ content: 'content', label: 'label', ref: React.createRef() };

        const html1=mount(Button1.create(props)).html();
        const html0=mount(Button0.create(props)).html();

        expect(html1).toBe(html0);
    });

    it('Button.Or', () => {

        const props={
            text: 'ή'
        };

        const html1=mount(<ButtonOr1 {...props} />).html();
        const html0=mount(<ButtonOr0 {...props} />).html();

        expect(html1).toBe(html0);
    });

    it('Button.Group', () => {

        const props={
            attached: 'top', basic: true, buttons: ['button1', 'button2', 'button3'], color: 'red', compact: true, floated: 'left',
            fluid: true, icon: true, inverted: true, labeled: true, negative: true, secondary: true, size: 'large', toggle: true,
            vertical: true, widths: 4
        };

        const html1=mount(<ButtonGroup1 {...props} />).html();
        const html0=mount(<ButtonGroup0 {...props} />).html();

        expect(html1).toBe(html0);
    });
});
