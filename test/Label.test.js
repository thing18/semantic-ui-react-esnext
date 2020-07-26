require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Label as Label0 } from '../dist.0';
import { Label as Label1 } from '../dist.1';

describe('Label', () => {

    it('empty', () => expect(mount(<Label1 />).html()).toBe(mount(<Label0 />).html()));

    it('all props xmt icon+image', () => {

        const props={
            basic: true, active: true, attched: 'top', circular: true, color: 'red',
            corner: 'left', floating: true, horizontal: true, tag: true, pointing: 'above',
            prompt: true, ribbon: true, size: 'large'
        };

        const html1=mount(<Label1 {...props} />).html();
        const html2=mount(<Label0 {...props} />).html();

        expect(html1).toBe(html2);
    });

    it('image:true', () => {

        const props={
            basic: true, active: true, attched: 'top', circular: true, color: 'red',
            corner: 'left', floating: true, horizontal: true, tag: true, pointing: 'above',
            prompt: true, ribbon: true, size: 'large', image: true
        };

        const html1=mount(<Label1 {...props} />).html();
        const html2=mount(<Label0 {...props} />).html();

        expect(html1).toBe(html2);
    });

    it('image:url', () => {

        const props={
            basic: true, active: true, attched: 'top', circular: true, color: 'red',
            corner: 'left', floating: true, horizontal: true, tag: true, pointing: 'above',
            prompt: true, ribbon: true, size: 'large', image: 'image.png'
        };

        const html1=mount(<Label1 {...props} />).html();
        const html2=mount(<Label0 {...props} />).html();

        expect(html1).toBe(html2);
    });

    it('event:onClick', () => {

        let __flag=0;
        const handler=() => __flag+=1;

        const props={ basic: true, content: 'test', onClick: handler };

        mount(<Label1 {...props} />).simulate('click');
        mount(<Label0 {...props} />).simulate('click');

        expect(__flag).toBe(2);
    })

    it('event:onRemove', () => {

        let __flag=0;
        const handler=() => __flag+=1;

        const props={ basic: true, content: 'test', onRemove: handler, icon: 'copy' };

        // console.log();
        mount(<Label1 {...props} />).find('.icon').last().simulate('click');
        mount(<Label0 {...props} />).find('.icon').last().simulate('click');

        expect(__flag).toBe(2);
    })

});

process.exitCode=0;
