require('./setup');
import faker from 'faker';
import React, { useState } from 'react';
import { mount } from 'enzyme';

import { Accordion as Accordion0, Icon as Icon0, Image as Image0, Button as Button0 } from '../dist.0';
import { Accordion as Accordion1, Icon as Icon1, Image as Image1, Button as Button1 } from '../dist.1';

const _expect=(C) => {

    const wrapper1=mount(<C Accordion={Accordion1} Icon={Icon1} Image={Image1} Button={Button1} />);
    const node0=mount(<C Accordion={Accordion0} Icon={Icon0} Image={Image0} Button={Button0} />);

    try {
        expect(wrapper1.html()).toBe(node0.html());
    } catch (e) {
        console.log(`1:${wrapper1.childAt(0).debug()}\n0:${node0.childAt(0).debug()}`);
        throw e;
    }
}

describe('Accordion', () => {

    it('empty', () => expect(mount(<Accordion1 defaultActiveIndex={0} />).html()).toBe(mount(<Accordion0 />).html()));

    it('basic', () => _expect(Basic));

    it('basic:shorthand', () => _expect(BasicShorthand));

    it('basic:styled', () => _expect(BasicStyled));
});

const Basic=({ Accordion, Icon }) => {

    const [activeIndex, setState]=useState(0);

    const handleClick=(e, titleProps) => setState(activeIndex===titleProps.index? -1:index);

    return (
        <Accordion>
            <Accordion.Title active={activeIndex===0} index={0} onClick={handleClick} >
                <Icon name='dropdown' />
                What is a dog?
            </Accordion.Title>
            <Accordion.Content active={activeIndex===0}>
                <p>
                    A dog is a type of domesticated animal. Known for its loyalty and
                    faithfulness, it can be found as a welcome guest in many households
                    across the world.
                </p>
            </Accordion.Content>
            <Accordion.Title active={activeIndex===1} index={1} onClick={handleClick}            >
                <Icon name='dropdown' />
                What kinds of dogs are there?
            </Accordion.Title>
            <Accordion.Content active={activeIndex===1}>
                <p>
                    There are many breeds of dogs. Each breed varies in size and
                    temperament. Owners often select a breed of dog that they find to be
                    compatible with their own lifestyle and desires from a companion.
            </p>
            </Accordion.Content>

            <Accordion.Title active={activeIndex===2} index={2} onClick={handleClick}            >
                <Icon name='dropdown' />
                How do you acquire a dog?
            </Accordion.Title>
            <Accordion.Content active={activeIndex===2}>
                <p>
                    Three common ways for a prospective owner to acquire a dog is from
                    pet shops, private owners, or shelters.
                </p>
                <p>
                    A pet shop may be the most convenient way to buy a dog. Buying a dog
                    from a private owner allows you to assess the pedigree and
                    upbringing of your dog before choosing to take it home. Lastly,
                    finding your dog from a shelter, helps give a good home to a dog who
                    may not find one so readily.
                </p>
            </Accordion.Content>
        </Accordion>
    );
};

const BasicShorthand=({ Accordion }) => <Accordion defaultActiveIndex={0} panels={[
    {
        key: 'what-is-dog',
        title: 'What is a dog?',
        content: [
            'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome',
            'guest in many households across the world.',
        ].join(' '),
    },
    {
        key: 'kinds-of-dogs',
        title: 'What kinds of dogs are there?',
        content: [
            'There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog',
            'that they find to be compatible with their own lifestyle and desires from a companion.',
        ].join(' '),
    },
    {
        key: 'acquire-dog',
        title: 'How do you acquire a dog?',
        content: {
            content: (
                <div>
                    <p>
                        Three common ways for a prospective owner to acquire a dog is from
                        pet shops, private owners, or shelters.
          </p>
                    <p>
                        A pet shop may be the most convenient way to buy a dog. Buying a dog
                        from a private owner allows you to assess the pedigree and
                        upbringing of your dog before choosing to take it home. Lastly,
                        finding your dog from a shelter, helps give a good home to a dog who
                        may not find one so readily.
          </p>
                </div>
            ),
        },
    },
]} />;

const BasicStyled=({ Accordion, Icon }) => {

    const [activeIndex, setState]=useState(0);

    const handleClick=(e, titleProps) => setState(activeIndex===titleProps.index? -1:index);

    return (
        <Accordion styled>
            <Accordion.Title active={activeIndex===0} index={0} onClick={handleClick} >
                <Icon name='dropdown' />
                {faker.lorem.sentence()}
            </Accordion.Title>
            <Accordion.Content active={activeIndex===0}>
                <p>{faker.lorem.paragraph()}</p>
            </Accordion.Content>

            <Accordion.Title active={activeIndex===1} index={1} onClick={handleClick}            >
                <Icon name='dropdown' />
                {faker.lorem.sentence()}
            </Accordion.Title>
            <Accordion.Content active={activeIndex===1}>
                <p>{faker.lorem.paragraph()}</p>
            </Accordion.Content>

            <Accordion.Title active={activeIndex===2} index={2} onClick={handleClick}            >
                <Icon name='dropdown' />
                {faker.lorem.sentence()}
            </Accordion.Title>
            <Accordion.Content active={activeIndex===2}>
                <p>{faker.lorem.paragraphs(2)}</p>
            </Accordion.Content>
        </Accordion>
    );
};
