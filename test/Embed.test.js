require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import * as lib0 from '../dist.0';
import * as lib1 from '../dist.1';
import { EmbedExampleActive, EmbedExampleCustom, EmbedExampleAspectRatio, EmbedExampleIframe, EmbedExampleSettings, EmbedExampleVimeo, EmbedExampleYouTube } from '../doc/Embed';

const _expect=(C) => {

    const node1=mount(<C lib={lib1} />).childAt(0);
    const node0=mount(<C lib={lib0} />).childAt(0);

    try {
        expect(node1.html()).toBe(node0.html());
    } catch (e) {
        console.log(`1:${node1.childAt(0).debug()}\n0:${node0.childAt(0).debug()}`);
        throw e;
    }
}

describe('Embed', () => {

    it('active', () => _expect(EmbedExampleActive));

    it('service:custom', () => _expect(EmbedExampleCustom));

    it('service:vimeo', () => _expect(EmbedExampleVimeo));

    it('service:youtube', () => _expect(EmbedExampleYouTube));

    it('aspect ratio', () => _expect(EmbedExampleAspectRatio));

    it('Iframe', () => _expect(EmbedExampleIframe));

    it('settings', () => _expect(EmbedExampleSettings));
});
