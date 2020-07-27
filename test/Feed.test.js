require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Feed as Feed0, Icon as Icon0 } from '../dist.0';
import { Feed as Feed1, Icon as Icon1 } from '../dist.1';

describe('Feed', () => {

    it('empty', () => expect(mount(<Feed1 />).html()).toBe(mount(<Feed0 />).html()));

    it('basic', () => {

        const html1=mount(<FeedBasic Feed={Feed1} Icon={Icon1} />).html();
        const html0=mount(<FeedBasic Feed={Feed0} Icon={Icon0} />).html();

        expect(html1).toBe(html0);
    });

    it('events', () => {

        const events=[
            {
                date: '1 Hour Ago',
                image: '/images/avatar/small/elliot.jpg',
                meta: '4 Likes',
                summary: 'Elliot Fu added you as a friend',
            },
            {
                date: '4 days ago',
                image: '/images/avatar/small/helen.jpg',
                meta: '1 Like',
                summary: 'Helen Troy added 2 new illustrations',
                extraImages: [
                    '/images/wireframe/image.png',
                    '/images/wireframe/image-text.png',
                ],
            },
            {
                date: '3 days ago',
                image: '/images/avatar/small/joe.jpg',
                meta: '8 Likes',
                summary: 'Joe Henderson posted on his page',
                extraText:
                    "Ours is a life of constant reruns. We're always circling back to where we'd we started.",
            },
            {
                date: '4 days ago',
                image: '/images/avatar/small/justen.jpg',
                meta: '41 Likes',
                summary: 'Justen Kitsune added 2 new photos of you',
                extraText:
                    'Look at these fun pics I found from a few years ago. Good times.',
                extraImages: [
                    '/images/wireframe/image.png',
                    '/images/wireframe/image-text.png',
                ],
            },
        ];

        const html1=mount(<Feed1 events={events} />).html();
        const html0=mount(<Feed0 events={events} />).html();

        expect(html1).toBe(html0);
    });

    it('shorthands', () => {

        const events=[
            {
                date: '1 Hour Ago',
                image: '/images/avatar/small/elliot.jpg',
                meta: '4 Likes',
                summary: 'Elliot Fu added you as a friend',
            },
            {
                date: '4 days ago',
                image: '/images/avatar/small/helen.jpg',
                meta: '1 Like',
                summary: 'Helen Troy added 2 new illustrations',
                extraImages: [
                    '/images/wireframe/image.png',
                    '/images/wireframe/image-text.png',
                ],
            },
            {
                date: '2 Days Ago',
                image: '/images/avatar/small/jenny.jpg',
                meta: '8 Likes',
                summary: 'Jenny Hess added you as a friend',
            },
            {
                date: '3 days ago',
                image: '/images/avatar/small/joe.jpg',
                meta: '8 Likes',
                summary: 'Joe Henderson posted on his page',
                extraText: [
                    "Ours is a life of constant reruns. We're always circling back to where we'd we started, then starting all",
                    "over again. Even if we don't run extra laps that day, we surely will come back for more of the same another",
                    'day soon.',
                ].join(' '),
            },
            {
                date: '4 days ago',
                image: '/images/avatar/small/justen.jpg',
                meta: '41 Likes',
                summary: 'Justen Kitsune added 2 new photos of you',
                extraImages: [
                    '/images/wireframe/image.png',
                    '/images/wireframe/image-text.png',
                ],
            },
        ];

        const html1=mount(<Feed1 events={events} />).html();
        const html0=mount(<Feed0 events={events} />).html();

        expect(html1).toBe(html0);
    });

    it('content:date', () => {

        const html1=mount(<ContentDate Feed={Feed1} />).html();
        const html0=mount(<ContentDate Feed={Feed0} />).html();

        expect(html1).toBe(html0);
    });

    it('content:date:shorthand', () => {

        const html1=mount(<ContentDateShorthand Feed={Feed1} />).html();
        const html0=mount(<ContentDateShorthand Feed={Feed0} />).html();

        expect(html1).toBe(html0);
    });

    it('extra:images', () => {

        const html1=mount(<ExtraImages Feed={Feed1} />).html();
        const html0=mount(<ExtraImages Feed={Feed0} />).html();

        expect(html1).toBe(html0);
    });

    it('extra:images:shorthand', () => {

        const html1=mount(<ExtraImagesShorthand Feed={Feed1} />).html();
        const html0=mount(<ExtraImagesShorthand Feed={Feed0} />).html();

        expect(html1).toBe(html0);
    });

    it('extra:text', () => {

        const html1=mount(<ExtraText Feed={Feed1} />).html();
        const html0=mount(<ExtraText Feed={Feed0} />).html();

        expect(html1).toBe(html0);
    });

    it('extra:text:shorthand', () => {

        const html1=mount(<ExtraTextShorthand Feed={Feed1} />).html();
        const html0=mount(<ExtraTextShorthand Feed={Feed0} />).html();

        expect(html1).toBe(html0);
    });

    it('icon:label', () => {

        const html1=mount(<IconLabel Feed={Feed1} Icon={Icon1} />).html();
        const html0=mount(<IconLabel Feed={Feed0} Icon={Icon0} />).html();

        expect(html1).toBe(html0);
    });

    it('icon:label:shorthand', () => {

        const html1=mount(<IconLabelShorthand Feed={Feed1} />).html();
        const html0=mount(<IconLabelShorthand Feed={Feed0} />).html();

        expect(html1).toBe(html0);
    });

    it('image:label', () => {

        const html1=mount(<ImageLabel Feed={Feed1} />).html();
        const html0=mount(<ImageLabel Feed={Feed0} />).html();

        expect(html1).toBe(html0);
    });

    it('image:label:shorthand', () => {

        const html1=mount(<ImageLabelShorthand Feed={Feed1} />).html();
        const html0=mount(<ImageLabelShorthand Feed={Feed0} />).html();

        expect(html1).toBe(html0);
    });

    it('summary:date', () => {

        const html1=mount(<SummaryDate Feed={Feed1} />).html();
        const html0=mount(<SummaryDate Feed={Feed0} />).html();

        expect(html1).toBe(html0);
    });

    it('summary:date:shorthand', () => {

        const html1=mount(<SummaryDateShorthand Feed={Feed1} />).html();
        const html0=mount(<SummaryDateShorthand Feed={Feed0} />).html();

        expect(html1).toBe(html0);
    });
});


const FeedBasic=({ Feed, Icon }) => (
    <Feed>
        <Feed.Event>
            <Feed.Label>
                <img src='/images/avatar/small/elliot.jpg' />
            </Feed.Label>
            <Feed.Content>
                <Feed.Summary>
                    <Feed.User>Elliot Fu</Feed.User> added you as a friend
                            <Feed.Date>1 Hour Ago</Feed.Date>
                </Feed.Summary>
                <Feed.Meta>
                    <Feed.Like>
                        <Icon name='like' />4 Likes
                            </Feed.Like>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>

        <Feed.Event>
            <Feed.Label image='/images/avatar/small/helen.jpg' />
            <Feed.Content>
                <Feed.Summary>
                    <a>Helen Troy</a> added <a>2 new illustrations</a>
                    <Feed.Date>4 days ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra images>
                    <a>
                        <img src='/images/wireframe/image.png' />
                    </a>
                    <a>
                        <img src='/images/wireframe/image.png' />
                    </a>
                </Feed.Extra>
                <Feed.Meta>
                    <Feed.Like>
                        <Icon name='like' />1 Like
          </Feed.Like>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>

        <Feed.Event>
            <Feed.Label image='/images/avatar/small/jenny.jpg' />
            <Feed.Content>
                <Feed.Summary
                    date='2 Days Ago'
                    user='Jenny Hess'
                    content='add you as a friend'
                />
                <Feed.Meta>
                    <Feed.Like>
                        <Icon name='like' />8 Likes
          </Feed.Like>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>

        <Feed.Event>
            <Feed.Label image='/images/avatar/small/joe.jpg' />
            <Feed.Content>
                <Feed.Summary>
                    <a>Joe Henderson</a> posted on his page
          <Feed.Date>3 days ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                    Ours is a life of constant reruns. We're always circling back to where
                    we'd we started, then starting all over again. Even if we don't run
                    extra laps that day, we surely will come back for more of the same
                    another day soon.
        </Feed.Extra>
                <Feed.Meta>
                    <Feed.Like>
                        <Icon name='like' />5 Likes
          </Feed.Like>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>

        <Feed.Event>
            <Feed.Label image='/images/avatar/small/justen.jpg' />
            <Feed.Content>
                <Feed.Summary>
                    <a>Justen Kitsune</a> added <a>2 new photos</a> of you
          <Feed.Date>4 days ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra images>
                    <a>
                        <img src='/images/wireframe/image.png' />
                    </a>
                    <a>
                        <img src='/images/wireframe/image.png' />
                    </a>
                </Feed.Extra>
                <Feed.Meta>
                    <Feed.Like>
                        <Icon name='like' />
            41 Likes
          </Feed.Like>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>
    </Feed>
);

const ContentDate=({ Feed }) => (
    <Feed>
        <Feed.Event>
            <Feed.Label image='image.jpg' />
            <Feed.Content>
                <Feed.Date>3 days ago</Feed.Date>
                <Feed.Summary>
                    You added <a>Jenny Hess</a> to your <a>coworker</a> group.
                        </Feed.Summary>
            </Feed.Content>
        </Feed.Event>
    </Feed>
);

const ContentDateShorthand=({ Feed }) => {
    const image='/images/avatar/small/jenny.jpg'
    const date='3 days ago'
    const summary='You added Jenny Hess to your coworker group.'

    return (
        <Feed>
            <Feed.Event image={image} date={date} summary={summary} />

            <Feed.Event>
                <Feed.Label image={image} />
                <Feed.Content date={date} summary={summary} />
            </Feed.Event>
        </Feed>
    );
}

const ExtraImages=({ Feed }) => (
    <Feed>
        <Feed.Event>
            <Feed.Label image='/images/avatar/small/helen.jpg' />
            <Feed.Content>
                <Feed.Date>3 days ago</Feed.Date>
                <Feed.Summary>
                    <a>Helen Troy</a> added 2 photos
                        </Feed.Summary>
                <Feed.Extra images>
                    <a>
                        <img src='/images/wireframe/image.png' />
                    </a>
                    <a>
                        <img src='/images/wireframe/image.png' />
                    </a>
                </Feed.Extra>
            </Feed.Content>
        </Feed.Event>
    </Feed>
);

const ExtraImagesShorthand=({ Feed }) => {
    const image='/images/avatar/small/helen.jpg'
    const date='3 days ago'
    const summary='Helen Troy added 2 photos'
    const extraImages=['/images/wireframe/image.png', '/images/wireframe/image-text.png'];

    return (
        <Feed>
            <Feed.Event image={image} date={date} summary={summary} extraImages={extraImages} />

            <Feed.Event>
                <Feed.Label image={image} />
                <Feed.Content date={date} summary={summary} extraImages={extraImages} />
            </Feed.Event>

            <Feed.Event>
                <Feed.Label image={image} />
                <Feed.Content>
                    <Feed.Date content={date} />
                    <Feed.Summary content={summary} />
                    <Feed.Extra images={extraImages} />
                </Feed.Content>
            </Feed.Event>
        </Feed>
    );
}

const ExtraText=({ Feed }) => (
    <Feed>
        <Feed.Event>
            <Feed.Label image='/images/avatar/small/laura.jpg' />
            <Feed.Content>
                <Feed.Date>3 days ago</Feed.Date>
                <Feed.Summary>
                    <a>Laura Faucet</a> created a post
        </Feed.Summary>
                <Feed.Extra text>
                    Have you seen what's going on in Israel? Can you believe it.
        </Feed.Extra>
            </Feed.Content>
        </Feed.Event>
    </Feed>
)

const ExtraTextShorthand=({ Feed }) => {
    const image='/images/avatar/small/laura.jpg'
    const date='3 days ago'
    const summary='Laura Faucet created a post'
    const extraText="Have you seen what's going on in Israel? Can you believe it."

    return (
        <Feed>
            <Feed.Event
                image={image}
                date={date}
                summary={summary}
                extraText={extraText}
            />

            <Feed.Event>
                <Feed.Label image={image} />
                <Feed.Content date={date} summary={summary} extraText={extraText} />
            </Feed.Event>

            <Feed.Event>
                <Feed.Label image={image} />
                <Feed.Content>
                    <Feed.Date content={date} />
                    <Feed.Summary content={summary} />
                    <Feed.Extra text content={extraText} />
                </Feed.Content>
            </Feed.Event>
        </Feed>
    );
}

const IconLabel=({ Feed, Icon }) => (
    <Feed>
        <Feed.Event>
            <Feed.Label>
                <Icon name='pencil' />
            </Feed.Label>
            <Feed.Content>
                <Feed.Date>Today</Feed.Date>
                <Feed.Summary>
                    You posted on your friend <a>Stevie Feliciano's</a> wall.
        </Feed.Summary>
            </Feed.Content>
        </Feed.Event>
    </Feed>
);

const IconLabelShorthand=({ Feed }) => (
    <Feed>
        <Feed.Event
            icon='pencil'
            date='Today'
            summary="You posted on your friend Stevie Feliciano's wall."
        />

        <Feed.Event>
            <Feed.Label icon='pencil' />
            <Feed.Content
                date='Today'
                summary="You posted on your friend Stevie Feliciano's wall."
            />
        </Feed.Event>
    </Feed>
);

const ImageLabel=({ Feed }) => (
    <Feed>
        <Feed.Event>
            <Feed.Label>
                <img src='/images/avatar/small/elliot.jpg' />
            </Feed.Label>
            <Feed.Content>
                You added Elliot Fu to the group <a>Coworkers</a>
            </Feed.Content>
        </Feed.Event>
    </Feed>
);

const ImageLabelShorthand=({ Feed }) => (
    <Feed>
        <Feed.Event
            image='/images/avatar/small/elliot.jpg'
            content='You added Elliot Fu to the group Coworkers'
        />
        <Feed.Event>
            <Feed.Label image='/images/avatar/small/elliot.jpg' />
            <Feed.Content content='You added Elliot Fu to the group Coworkers' />
        </Feed.Event>
    </Feed>
);

const SummaryDate=({ Feed }) => (
    <Feed>
        <Feed.Event>
            <Feed.Label>
                <img src='/images/avatar/small/jenny.jpg' />
            </Feed.Label>
            <Feed.Content>
                <Feed.Summary>
                    You added <a>Jenny Hess</a> to your <a>coworker</a> group.
                    <Feed.Date>3 days ago</Feed.Date>
                </Feed.Summary>
            </Feed.Content>
        </Feed.Event>
    </Feed>
);

const SummaryDateShorthand=({ Feed }) => (
    <Feed>
        <Feed.Event>
            <Feed.Label image='/images/avatar/small/jenny.jpg' />
            <Feed.Content>
                <Feed.Summary
                    content='You added Jenny Hess to your coworker group.'
                    date='3 days ago'
                />
            </Feed.Content>
        </Feed.Event>
    </Feed>
);
