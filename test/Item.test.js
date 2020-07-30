require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Item as Item0, Icon as Icon0, Image as Image0 } from '../dist.0';
import { Item as Item1, Icon as Icon1, Image as Image1 } from '../dist.1';

const _expect=(C) => expect(mount(<C Item={Item1} Icon={Icon1} Image={Image1} />).html())
    .toBe(mount(<C Item={Item0} Icon={Icon0} Image={Image0} />).html());

describe('Item', () => {

    it('empty', () => expect(mount(<Item1 />).html()).toBe(mount(<Item0 />).html()));

    it('basic', () => _expect(Basic));

    it('shorthand', () => _expect(Shorthand));

    it('contents', () => _expect(Contents));

    it('descriptions', () => _expect(Descriptions));

    it('contents extra', () => _expect(ExtraContent));

    it('headers', () => _expect(Headers));

    it('images', () => _expect(Images));

    it('link', () => _expect(Link));

    it('metadata', () => _expect(Metadata));

    it('ratings', () => _expect(Ratings));
});

const paragraph=<Image0 src='/images/wireframe/short-paragraph.png' />;

const Basic=({ Item, Image }) => (
    <Item.Group>
        <Item>
            <Item.Image size='tiny' src='/images/wireframe/image.png' />

            <Item.Content>
                <Item.Header as='a'>Header</Item.Header>
                <Item.Meta>Description</Item.Meta>
                <Item.Description>
                    paragraph
                </Item.Description>
                <Item.Extra>Additional Details</Item.Extra>
            </Item.Content>
        </Item>

        <Item>
            <Item.Image size='tiny' src='/images/wireframe/image.png' />

            <Item.Content>
                <Item.Header as='a'>Header</Item.Header>
                <Item.Meta>Description</Item.Meta>
                <Item.Description>
                    paragraph
                </Item.Description>
                <Item.Extra>Additional Details</Item.Extra>
            </Item.Content>
        </Item>
    </Item.Group>
);

const Shorthand=({ Item }) => <Item.Group items={[
    {
        childKey: 0,
        image: '/images/wireframe/image.png',
        header: 'Header',
        description: 'Description',
        meta: 'Metadata',
        extra: 'Extra',
    },
    {
        childKey: 1,
        image: '/images/wireframe/image.png',
        header: 'Header',
        description: 'Description',
        meta: 'Metadata',
        extra: 'Extra',
    },
]} />

const Contents=({ Item }) => (
    <Item.Group divided>
        <Item>
            <Item.Image size='tiny' src='/images/wireframe/image.png' />
            <Item.Content verticalAlign='middle'>Content A</Item.Content>
        </Item>

        <Item>
            <Item.Image size='tiny' src='/images/wireframe/image.png' />
            <Item.Content verticalAlign='middle'>Content B</Item.Content>
        </Item>

        <Item>
            <Item.Image size='tiny' src='/images/wireframe/image.png' />
            <Item.Content content='Content C' verticalAlign='middle' />
        </Item>
    </Item.Group>
);

const description=[
    'Cute dogs come in a variety of shapes and sizes. Some cute dogs are cute for their adorable faces, others for their',
    'tiny stature, and even others for their massive size.',
].join(' ');

const Descriptions=({ Item }) => (
    <Item.Group>
        <Item>
            <Item.Image size='small' src='/images/wireframe/image.png' />

            <Item.Content>
                <Item.Header as='a'>Cute Dog</Item.Header>
                <Item.Description>
                    <p>{description}</p>
                    <p>
                        Many people also have their own barometers for what makes a cute
                        dog.
                    </p>
                </Item.Description>
            </Item.Content>
        </Item>

        <Item>
            <Item.Image size='small' src='/images/wireframe/image.png' />

            <Item.Content>
                <Item.Header as='a'>Cute Dog</Item.Header>
                <Item.Description content={description} />
            </Item.Content>
        </Item>

        <Item>
            <Item.Image size='small' src='/images/wireframe/image.png' />
            <Item.Content header='Cute Dog' description={description} />
        </Item>
    </Item.Group>
);

const ExtraContent=({ Item, Icon }) => (
    <Item.Group>
        <Item>
            <Item.Image size='small' src='/images/wireframe/image.png' />

            <Item.Content>
                <Item.Header as='a'>Cute Dog</Item.Header>
                <Item.Description>{paragraph}</Item.Description>
                <Item.Extra>
                    <Icon color='green' name='check' /> 121 Votes
                </Item.Extra>
            </Item.Content>
        </Item>

        <Item>
            <Item.Image size='small' src='/images/wireframe/image.png' />

            <Item.Content>
                <Item.Header as='a'>Cute Dog</Item.Header>
                <Item.Description>{paragraph}</Item.Description>
                <Item.Extra content='121 Votes' />
            </Item.Content>
        </Item>

        <Item>
            <Item.Image size='small' src='/images/wireframe/image.png' />
            <Item.Content header='Cute Dog' extra='121 Votes' />
        </Item>
    </Item.Group>
);

const Headers=({ Item }) => (
    <Item.Group>
        <Item>
            <Item.Image size='tiny' src='/images/wireframe/image.png' />
            <Item.Content verticalAlign='middle'>
                <Item.Header as='a'>12 Years a Slave</Item.Header>
            </Item.Content>
        </Item>

        <Item>
            <Item.Image size='tiny' src='/images/wireframe/image.png' />
            <Item.Content verticalAlign='middle'>
                <Item.Header as='a' content='My Neighbor Totoro' />
            </Item.Content>
        </Item>

        <Item>
            <Item.Image size='tiny' src='/images/wireframe/image.png' />
            <Item.Content header='Watchmen' verticalAlign='middle' />
        </Item>
    </Item.Group>
);

const Images=({ Item }) => (
    <Item.Group divided>
        <Item>
            <Item.Image src='/images/wireframe/image.png' />
        </Item>

        <Item>
            <Item.Image src='/images/wireframe/image.png' />
        </Item>

        <Item image='/images/wireframe/image.png' />
    </Item.Group>
);

const Link=({ Item, Image }) => (
    <Item.Group>
        <Item>
            <Item.Image size='tiny' src='/images/wireframe/image.png' />

            <Item.Content>
                <Item.Header>Arrowhead Valley Camp</Item.Header>
                <Item.Meta>
                    <span className='price'>$1200</span>
                    <span className='stay'>1 Month</span>
                </Item.Meta>
                <Item.Description>{paragraph}</Item.Description>
            </Item.Content>
        </Item>

        <Item>
            <Item.Image size='tiny' src='/images/wireframe/image.png' />

            <Item.Content>
                <Item.Header>Buck's Homebrew Stayaway</Item.Header>
                <Item.Meta content='$1000 2 Weeks' />
                <Item.Description>{paragraph}</Item.Description>
            </Item.Content>
        </Item>

        <Item>
            <Item.Image size='tiny' src='/images/wireframe/image.png' />
            <Item.Content header='Arrowhead Valley Camp' meta='$1200 1 Month' />
        </Item>
    </Item.Group>
);

const Metadata=({ Item }) => (
    <Item.Group>
        <Item>
            <Item.Image size='tiny' src='/images/wireframe/image.png' />

            <Item.Content>
                <Item.Header>Arrowhead Valley Camp</Item.Header>
                <Item.Meta>
                    <span className='price'>$1200</span>
                    <span className='stay'>1 Month</span>
                </Item.Meta>
                <Item.Description>{paragraph}</Item.Description>
            </Item.Content>
        </Item>

        <Item>
            <Item.Image size='tiny' src='/images/wireframe/image.png' />

            <Item.Content>
                <Item.Header>Buck's Homebrew Stayaway</Item.Header>
                <Item.Meta content='$1000 2 Weeks' />
                <Item.Description>{paragraph}</Item.Description>
            </Item.Content>
        </Item>

        <Item>
            <Item.Image size='tiny' src='/images/wireframe/image.png' />
            <Item.Content header='Arrowhead Valley Camp' meta='$1200 1 Month' />
        </Item>
    </Item.Group>
);

const Ratings=({ Item, Icon }) => (
    <Item.Group>
        <Item>
            <Item.Image size='tiny' src='/images/avatar/large/jenny.jpg' />

            <Item.Content verticalAlign='middle'>
                <Item.Header>
                    <Icon name='like' />
          Veronika Ossi
        </Item.Header>
            </Item.Content>
        </Item>

        <Item>
            <Item.Image size='tiny' src='/images/avatar/large/justen.jpg' />

            <Item.Content verticalAlign='middle'>
                <Item.Header>
                    <Icon name='favorite' />
          Justen Kitsune
        </Item.Header>
            </Item.Content>
        </Item>
    </Item.Group>
)
