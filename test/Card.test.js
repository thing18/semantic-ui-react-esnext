require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Card as Card0, Icon as Icon0, Image as Image0, Button as Button0 } from '../dist.0';
import { Card as Card1, Icon as Icon1, Image as Image1, Button as Button1, Feed as Feed1 } from '../dist.1';

const _expect=(C) => {

    const wrapper1=mount(<C Card={Card1} Icon={Icon1} Image={Image1} Button={Button1} />);
    const node0=mount(<C Card={Card0} Icon={Icon0} Image={Image0} Button={Button0} />);

    try {
        expect(wrapper1.html()).toBe(node0.html());
    } catch (e) {
        console.log(`1:${wrapper1.childAt(0).debug()}\n0:${node0.childAt(0).debug()}`);
        throw e;
    }
}

describe('Card', () => {

    it('empty', () => expect(mount(<Card1 />).html()).toBe(mount(<Card0 />).html()));

    it('basic', () => _expect(Basic));

    it('basic:shorthand', () => _expect(Shorthand));

    it('group', () => _expect(Groups));

    it('group:shorthand', () => _expect(GroupShorthand));

    it('content:block', () => _expect(ContentBlock));

    it('content:block', () => _expect(ContentBlock));

    it('content:extra', () => _expect(ExtraContent));

    it('header', () => _expect(Header));

    it('link', () => _expect(LinkCard));

    it('link:shorthand', () => _expect(LinkCardShorthand));

    it('image', () => _expect(ImageCard));
});

const Basic=({ Card, Icon, Image }) => (
    <Card>
        <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
        <Card.Content>
            <Card.Header>Matthew</Card.Header>
            <Card.Meta>
                <span className='date'>Joined in 2015</span>
            </Card.Meta>
            <Card.Description>
                Matthew is a musician living in Nashville.
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
                <Icon name='user' />
                22 Friends
            </a>
        </Card.Content>
    </Card>
);

const Shorthand=({ Card, Icon }) => (
    <Card
        image='/images/avatar/large/elliot.jpg'
        header='Elliot Baker'
        meta='Friend'
        description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
        extra={<a><Icon name='user' />16 Friends</a>}
    />
);

const Groups=({ Card, Image, Button }) => (
    <Card.Group>
        <Card>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='/images/avatar/large/steve.jpg'
                />
                <Card.Header>Steve Sanders</Card.Header>
                <Card.Meta>Friends of Elliot</Card.Meta>
                <Card.Description>
                    Steve wants to add you to the group <strong>best friends</strong>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='green'>
                        Approve
          </Button>
                    <Button basic color='red'>
                        Decline
          </Button>
                </div>
            </Card.Content>
        </Card>
        <Card>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='/images/avatar/large/molly.png'
                />
                <Card.Header>Molly Thomas</Card.Header>
                <Card.Meta>New User</Card.Meta>
                <Card.Description>
                    Molly wants to add you to the group <strong>musicians</strong>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='green'>
                        Approve
          </Button>
                    <Button basic color='red'>
                        Decline
          </Button>
                </div>
            </Card.Content>
        </Card>
        <Card>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='/images/avatar/large/jenny.jpg'
                />
                <Card.Header>Jenny Lawrence</Card.Header>
                <Card.Meta>New User</Card.Meta>
                <Card.Description>
                    Jenny requested permission to view your contact details
        </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='green'>
                        Approve
          </Button>
                    <Button basic color='red'>
                        Decline
          </Button>
                </div>
            </Card.Content>
        </Card>
    </Card.Group>
);

const GroupShorthand=({ Card }) => <Card.Group items={[
    {
        header: 'Project Report - April',
        description:
            'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
        meta: 'ROI: 30%',
    },
    {
        header: 'Project Report - May',
        description:
            'Bring to the table win-win survival strategies to ensure proactive domination.',
        meta: 'ROI: 34%',
    },
    {
        header: 'Project Report - June',
        description:
            'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
        meta: 'ROI: 27%',
    },
]} />;

const ContentBlock=({ Card }) => (
    <Card>
        <Card.Content>
            <Card.Header>Recent Activity</Card.Header>
        </Card.Content>
        <Card.Content>
            <Feed1>
                <Feed1.Event>
                    <Feed1.Label image='/images/avatar/small/jenny.jpg' />
                    <Feed1.Content>
                        <Feed1.Date content='1 day ago' />
                        <Feed1.Summary>
                            You added <a>Jenny Hess</a> to your <a>coworker</a> group.
            </Feed1.Summary>
                    </Feed1.Content>
                </Feed1.Event>

                <Feed1.Event>
                    <Feed1.Label image='/images/avatar/small/molly.png' />
                    <Feed1.Content>
                        <Feed1.Date content='3 days ago' />
                        <Feed1.Summary>
                            You added <a>Molly Malone</a> as a friend.
            </Feed1.Summary>
                    </Feed1.Content>
                </Feed1.Event>

                <Feed1.Event>
                    <Feed1.Label image='/images/avatar/small/elliot.jpg' />
                    <Feed1.Content>
                        <Feed1.Date content='4 days ago' />
                        <Feed1.Summary>
                            You added <a>Elliot Baker</a> to your <a>musicians</a> group.
            </Feed1.Summary>
                    </Feed1.Content>
                </Feed1.Event>
            </Feed1>
        </Card.Content>
    </Card>
);

const description=[
    'Amy is a violinist with 2 years experience in the wedding industry.',
    'She enjoys the outdoors and currently resides in upstate New York.',
].join(' ');

const ExtraContent=({ Card, Icon }) => (
    <Card>
        <Card.Content header='About Amy' />
        <Card.Content description={description} />
        <Card.Content extra>
            <Icon name='user' />4 Friends
    </Card.Content>
    </Card>
);

const Header=({ Card }) => (
    <Card.Group>
        <Card>
            <Card.Content>
                <Card.Header>Matthew Harris</Card.Header>
                <Card.Meta>Co-Worker</Card.Meta>
                <Card.Description>
                    Matthew is a pianist living in Nashville.
        </Card.Description>
            </Card.Content>
        </Card>

        <Card>
            <Card.Content>
                <Card.Header content='Jake Smith' />
                <Card.Meta content='Musicians' />
                <Card.Description content='Jake is a drummer living in New York.' />
            </Card.Content>
        </Card>

        <Card>
            <Card.Content
                header='Elliot Baker'
                meta='Friend'
                description='Elliot is a music producer living in Chicago.'
            />
        </Card>

        <Card
            header='Jenny Hess'
            meta='Friend'
            description='Jenny is a student studying Media Management at the New School'
        />
    </Card.Group>
);

const LinkCard=({ Card }) => (
    <Card
        href='#card-example-link-card'
        header='Elliot Baker'
        meta='Friend'
        description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
    />
);

const LinkCardShorthand=({ Card }) => (
    <Card
        link
        header='Rick Sanchez'
        meta='Scientist'
        description={[
            'Rick is a genius scientist whose alcoholism and reckless,',
            ' nihilistic behavior are a source of concern for his family.',
        ].join('')}
    />
);

const ImageCard=({ Card, Image, Icon }) => (
    <Card>
        <Image src='/images/avatar/large/daniel.jpg' wrapped ui={false} />
        <Card.Content>
            <Card.Header>Daniel</Card.Header>
            <Card.Meta>Joined in 2016</Card.Meta>
            <Card.Description>
                Daniel is a comedian living in Nashville.
      </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
                <Icon name='user' />
        10 Friends
      </a>
        </Card.Content>
    </Card>
);
