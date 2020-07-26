require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Input as Input0 } from '../dist.0';
import { Input as Input1 } from '../dist.1';

describe('Input', () => {

    it('empty', () => expect(mount(<Input1 />).html()).toBe(mount(<Input0 />).html()));

    it('all props', () => {

        const props={
            tabIndex: '1', type: 'number', action: 'action', actionPosition: 'left', disabled: true, error: true, fluid: true,
            focus: true, icon: 'copy', iconPosition: 'left', inverted: true, label: 'label', labelPosition: 'right', loading: true,
            size: 'large', transparent: true, input: { value: 'value' }
        };

        const html1=mount(<Input1 {...props} />).html();
        const html0=mount(<Input0 {...props} />).html();

        expect(html1).toBe(html0);
    });

    it('event:onChange:enabled', () => {

        let __value={ input1: 'value', input0: 'value' };

        const props={
            input: { id: 'input', value: 'value' }, onChange: (_e, { name, value }) => __value[name]=value
        };

        mount(<Input1 {...props} name='input1' />).find('#input').first().simulate('change', { target: { value: 'new-value-1' } });
        mount(<Input0 {...props} name='input0' />).find('#input').first().simulate('change', { target: { value: 'new-value-0' } });

        expect(__value.input0).toBe('new-value-0');
        expect(__value.input1).toBe('new-value-1');
    });

    it('event:onChange:disabled', () => {

        let __value={ input1: 'value', input0: 'value' };

        const props={
            disabled: true, input: { id: 'input', value: 'value' }, onChange: (_e, { name, value }) => __value[name]=value
        };

        mount(<Input1 {...props} name='input1' />).find('#input').first().simulate('change', { target: { value: 'new-value-1' } });
        mount(<Input0 {...props} name='input0' />).find('#input').first().simulate('change', { target: { value: 'new-value-0' } });

        expect(__value.input0).toBe('new-value-0');
        expect(__value.input1).toBe('value');
    });


    it('event:onChange:readOnly', () => {

        let __value={ input1: 'value', input0: 'value' };

        const props={
            readOnly: true, input: { id: 'input', value: 'value' }, onChange: (_e, { name, value }) => __value[name]=value
        };

        mount(<Input1 {...props} name='input1' />).find('#input').first().simulate('change', { target: { value: 'new-value-1' } });
        mount(<Input0 {...props} name='input0' />).find('#input').first().simulate('change', { target: { value: 'new-value-0' } });

        expect(__value.input0).toBe('new-value-0');
        expect(__value.input1).toBe('value');
    });

    it('ref', () => {

        const ref1=React.createRef();
        const ref0=React.createRef();

        const props={ value: 'tp' };

        mount(<Input1 {...props} ref={ref1} />);
        mount(<Input0 {...props} ref={ref0} />);

        expect(ref1.current).not.toBe(null);
        expect(ref0.current).not.toBe(null);
        expect(ref1.current.value).toBe('tp');
    });

    it('factory', () => {

        const props={
            tabIndex: '1', type: 'number', action: 'action', actionPosition: 'left', disabled: true, error: true, fluid: true,
            focus: true, icon: 'copy', iconPosition: 'left', inverted: true, label: 'label', labelPosition: 'right', loading: true,
            size: 'large', transparent: true, input: { value: 'value' }
        };

        const html1=mount(Input1.create(props)).html();
        const html0=mount(Input0.create(props)).html();

        expect(html1).toBe(html0);
    });
});
