require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { TextArea as TextArea0 } from '../dist.0';
import { TextArea as TextArea1 } from '../dist.1';

describe('TextArea', () => {

    it('empty', () => expect(mount(<TextArea1 />).html()).toBe(mount(<TextArea0 />).html()));

    it('all props', () => {

        const props={
            rows: 10, value: 'this is a text', readOnly: true
        };

        const html1=mount(<TextArea1 {...props} />).html();
        const html0=mount(<TextArea0 {...props} />).html();

        expect(html1).toBe(html0);
    });

    it('event:onChange', () => {

        let __value={ TextArea1: 'value', TextArea0: 'value' };

        const props={
            id: 'TextArea', value: 'value', onChange: (_e, { name, value }) => __value[name]=value
        };

        mount(<TextArea1 {...props} name='TextArea1' />).first().simulate('change', { target: { value: 'new-value-1' } });
        mount(<TextArea0 {...props} name='TextArea0' />).first().simulate('change', { target: { value: 'new-value-0' } });

        expect(__value.TextArea0).toBe('new-value-0');
        expect(__value.TextArea1).toBe('new-value-1');
    });

    it('event:onChange:disabled', () => {

        let __value={ TextArea1: 'value', TextArea0: 'value' };

        const props={
            disabled: true, id: 'TextArea', value: 'value', onChange: (_e, { name, value }) => __value[name]=value
        };

        mount(<TextArea1 {...props} name='TextArea1' />).first().simulate('change', { target: { value: 'new-value-1' } });
        mount(<TextArea0 {...props} name='TextArea0' />).first().simulate('change', { target: { value: 'new-value-0' } });

        expect(__value.TextArea0).toBe('new-value-0');
        expect(__value.TextArea1).toBe('value');
    });

    it('event:onChange:readOnly', () => {

        let __value={ TextArea1: 'value', TextArea0: 'value' };

        const props={
            readOnly: true, id: 'TextArea', value: 'value', onChange: (_e, { name, value }) => __value[name]=value
        };

        mount(<TextArea1 {...props} name='TextArea1' />).first().simulate('change', { target: { value: 'new-value-1' } });
        mount(<TextArea0 {...props} name='TextArea0' />).first().simulate('change', { target: { value: 'new-value-0' } });

        expect(__value.TextArea0).toBe('new-value-0');
        expect(__value.TextArea1).toBe('value');
    });

    it('ref', () => {

        const ref1=React.createRef();
        const ref0=React.createRef();

        const props={ value: 'tp', readOnly: true };

        mount(<TextArea1 {...props} ref={ref1} />);
        mount(<TextArea0 {...props} ref={ref0} />);

        expect(ref1.current).not.toBe(null);
        expect(ref0.current).not.toBe(null);
        expect(ref1.current.value).toBe('tp');
    });
});
