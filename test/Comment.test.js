require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Comment as Comment0, Icon as Icon0 } from '../dist.0';
import { Comment as Comment1, Icon as Icon1 } from '../dist.1';

describe('Comment', () => {

    it('empty', () => expect(mount(<Comment1 />).html()).toBe(mount(<Comment0 />).html()));

    it('collapsed', () => {

        const html1=mount(
            <Comment1.Group collapsed={true}>
                <Comment1>
                    <Comment1.Avatar as='a' src='/images/avatar/small/elliot.jpg' />
                    <Comment1.Content>
                        <Comment1.Author as='a'>Elliot Fu</Comment1.Author>
                        <Comment1.Metadata>
                            <span>1 day ago</span>
                        </Comment1.Metadata>
                        <Comment1.Text>No, it wont</Comment1.Text>
                        <Comment1.Actions>
                            <a>Reply</a>
                        </Comment1.Actions>
                    </Comment1.Content>

                    <Comment1.Group>
                        <Comment1>
                            <Comment1.Avatar as='a' src='/images/avatar/small/jenny.jpg' />
                            <Comment1.Content>
                                <Comment1.Author as='a'>Jenny Hess</Comment1.Author>
                                <Comment1.Metadata>
                                    <span>20 minutes ago</span>
                                </Comment1.Metadata>
                                <Comment1.Text>Maybe it would.</Comment1.Text>
                                <Comment1.Actions>
                                    <a>Reply</a>
                                </Comment1.Actions>
                            </Comment1.Content>
                        </Comment1>
                    </Comment1.Group>
                </Comment1>
            </Comment1.Group>
        ).html();

        const html0=mount(
            <Comment0.Group collapsed={true}>
                <Comment0>
                    <Comment0.Avatar as='a' src='/images/avatar/small/elliot.jpg' />
                    <Comment0.Content>
                        <Comment0.Author as='a'>Elliot Fu</Comment0.Author>
                        <Comment0.Metadata>
                            <span>1 day ago</span>
                        </Comment0.Metadata>
                        <Comment0.Text>No, it wont</Comment0.Text>
                        <Comment0.Actions>
                            <a>Reply</a>
                        </Comment0.Actions>
                    </Comment0.Content>

                    <Comment0.Group>
                        <Comment0>
                            <Comment0.Avatar as='a' src='/images/avatar/small/jenny.jpg' />
                            <Comment0.Content>
                                <Comment0.Author as='a'>Jenny Hess</Comment0.Author>
                                <Comment0.Metadata>
                                    <span>20 minutes ago</span>
                                </Comment0.Metadata>
                                <Comment0.Text>Maybe it would.</Comment0.Text>
                                <Comment0.Actions>
                                    <a>Reply</a>
                                </Comment0.Actions>
                            </Comment0.Content>
                        </Comment0>
                    </Comment0.Group>
                </Comment0>
            </Comment0.Group>
        ).html();

        expect(html1).toBe(html0);
    });

    it('actions', () => {

        const html1=mount(
            <Comment1.Group>
                <Comment1>
                    <Comment1.Avatar as='a' src='/images/avatar/small/joe.jpg' />
                    <Comment1.Content>
                        <Comment1.Author>Tom Lukic</Comment1.Author>
                        <Comment1.Text>This will be great for business reports. I will definitely download this.</Comment1.Text>
                        <Comment1.Actions>
                            <Comment1.Action>Reply</Comment1.Action>
                            <Comment1.Action>Save</Comment1.Action>
                            <Comment1.Action>Hide</Comment1.Action>
                            <Comment1.Action>
                                <Icon1 name='expand' />
                                Full-screen
                            </Comment1.Action>
                        </Comment1.Actions>
                    </Comment1.Content>
                </Comment1>
            </Comment1.Group>
        ).html();

        const html0=mount(
            <Comment0.Group>
                <Comment0>
                    <Comment0.Avatar as='a' src='/images/avatar/small/joe.jpg' />
                    <Comment0.Content>
                        <Comment0.Author>Tom Lukic</Comment0.Author>
                        <Comment0.Text>This will be great for business reports. I will definitely download this.</Comment0.Text>
                        <Comment0.Actions>
                            <Comment0.Action>Reply</Comment0.Action>
                            <Comment0.Action>Save</Comment0.Action>
                            <Comment0.Action>Hide</Comment0.Action>
                            <Comment0.Action>
                                <Icon0 name='expand' />
                                Full-screen
                            </Comment0.Action>
                        </Comment0.Actions>
                    </Comment0.Content>
                </Comment0>
            </Comment0.Group>
        ).html();

        expect(html1).toBe(html0);
    });

    it('minimal', () => {

        const html1=mount(
            <Comment1.Group minimal>
                <Comment1>
                    <Comment1.Avatar as='a' src='/images/avatar/small/matt.jpg' />
                    <Comment1.Content>
                        <Comment1.Author as='a'>Matt</Comment1.Author>
                        <Comment1.Metadata>
                            <span>Today at 5:42PM</span>
                        </Comment1.Metadata>
                        <Comment1.Text>How artistic!</Comment1.Text>
                        <Comment1.Actions>
                            <a>Reply</a>
                        </Comment1.Actions>
                    </Comment1.Content>
                </Comment1>

                <Comment1>
                    <Comment1.Avatar as='a' src='/images/avatar/small/elliot.jpg' />
                    <Comment1.Content>
                        <Comment1.Author as='a'>Elliot Fu</Comment1.Author>
                        <Comment1.Metadata>
                            <span>Yesterday at 12:30AM</span>
                        </Comment1.Metadata>
                        <Comment1.Text>
                            <p>This has been very useful for my research. Thanks as well!</p>
                        </Comment1.Text>
                        <Comment1.Actions>
                            <a>Reply</a>
                        </Comment1.Actions>
                    </Comment1.Content>

                    <Comment1.Group>
                        <Comment1>
                            <Comment1.Avatar as='a' src='/images/avatar/small/jenny.jpg' />
                            <Comment1.Content>
                                <Comment1.Author as='a'>Jenny Hess</Comment1.Author>
                                <Comment1.Metadata>
                                    <span>Just now</span>
                                </Comment1.Metadata>
                                <Comment1.Text>Elliot you are always so right :)</Comment1.Text>
                                <Comment1.Actions>
                                    <a>Reply</a>
                                </Comment1.Actions>
                            </Comment1.Content>
                        </Comment1>
                    </Comment1.Group>
                </Comment1>

                <Comment1>
                    <Comment1.Avatar as='a' src='/images/avatar/small/joe.jpg' />
                    <Comment1.Content>
                        <Comment1.Author as='a'>Joe Henderson</Comment1.Author>
                        <Comment1.Metadata>
                            <span>5 days ago</span>
                        </Comment1.Metadata>
                        <Comment1.Text>Dude, this is awesome. Thanks so much</Comment1.Text>
                        <Comment1.Actions>
                            <a>Reply</a>
                        </Comment1.Actions>
                    </Comment1.Content>
                </Comment1>
            </Comment1.Group>
        ).html();
        const html0=mount(
            <Comment0.Group minimal>
                <Comment0>
                    <Comment0.Avatar as='a' src='/images/avatar/small/matt.jpg' />
                    <Comment0.Content>
                        <Comment0.Author as='a'>Matt</Comment0.Author>
                        <Comment0.Metadata>
                            <span>Today at 5:42PM</span>
                        </Comment0.Metadata>
                        <Comment0.Text>How artistic!</Comment0.Text>
                        <Comment0.Actions>
                            <a>Reply</a>
                        </Comment0.Actions>
                    </Comment0.Content>
                </Comment0>

                <Comment0>
                    <Comment0.Avatar as='a' src='/images/avatar/small/elliot.jpg' />
                    <Comment0.Content>
                        <Comment0.Author as='a'>Elliot Fu</Comment0.Author>
                        <Comment0.Metadata>
                            <span>Yesterday at 12:30AM</span>
                        </Comment0.Metadata>
                        <Comment0.Text>
                            <p>This has been very useful for my research. Thanks as well!</p>
                        </Comment0.Text>
                        <Comment0.Actions>
                            <a>Reply</a>
                        </Comment0.Actions>
                    </Comment0.Content>

                    <Comment0.Group>
                        <Comment0>
                            <Comment0.Avatar as='a' src='/images/avatar/small/jenny.jpg' />
                            <Comment0.Content>
                                <Comment0.Author as='a'>Jenny Hess</Comment0.Author>
                                <Comment0.Metadata>
                                    <span>Just now</span>
                                </Comment0.Metadata>
                                <Comment0.Text>Elliot you are always so right :)</Comment0.Text>
                                <Comment0.Actions>
                                    <a>Reply</a>
                                </Comment0.Actions>
                            </Comment0.Content>
                        </Comment0>
                    </Comment0.Group>
                </Comment0>

                <Comment0>
                    <Comment0.Avatar as='a' src='/images/avatar/small/joe.jpg' />
                    <Comment0.Content>
                        <Comment0.Author as='a'>Joe Henderson</Comment0.Author>
                        <Comment0.Metadata>
                            <span>5 days ago</span>
                        </Comment0.Metadata>
                        <Comment0.Text>Dude, this is awesome. Thanks so much</Comment0.Text>
                        <Comment0.Actions>
                            <a>Reply</a>
                        </Comment0.Actions>
                    </Comment0.Content>
                </Comment0>
            </Comment0.Group>
        ).html();

        expect(html1).toBe(html0);
    });

    it('threaded', () => {

        const html1=mount(
            <Comment1.Group threaded>
                <Comment1>
                    <Comment1.Avatar as='a' src='/images/avatar/small/matt.jpg' />
                    <Comment1.Content>
                        <Comment1.Author as='a'>Matt</Comment1.Author>
                        <Comment1.Metadata>
                            <span>Today at 5:42PM</span>
                        </Comment1.Metadata>
                        <Comment1.Text>How artistic!</Comment1.Text>
                        <Comment1.Actions>
                            <a>Reply</a>
                        </Comment1.Actions>
                    </Comment1.Content>
                </Comment1>

                <Comment1>
                    <Comment1.Avatar as='a' src='/images/avatar/small/elliot.jpg' />
                    <Comment1.Content>
                        <Comment1.Author as='a'>Elliot Fu</Comment1.Author>
                        <Comment1.Metadata>
                            <span>Yesterday at 12:30AM</span>
                        </Comment1.Metadata>
                        <Comment1.Text>
                            <p>This has been very useful for my research. Thanks as well!</p>
                        </Comment1.Text>
                        <Comment1.Actions>
                            <a>Reply</a>
                        </Comment1.Actions>
                    </Comment1.Content>

                    <Comment1.Group>
                        <Comment1>
                            <Comment1.Avatar as='a' src='/images/avatar/small/jenny.jpg' />
                            <Comment1.Content>
                                <Comment1.Author as='a'>Jenny Hess</Comment1.Author>
                                <Comment1.Metadata>
                                    <span>Just now</span>
                                </Comment1.Metadata>
                                <Comment1.Text>Elliot you are always so right :)</Comment1.Text>
                                <Comment1.Actions>
                                    <a>Reply</a>
                                </Comment1.Actions>
                            </Comment1.Content>
                        </Comment1>
                    </Comment1.Group>
                </Comment1>

                <Comment1>
                    <Comment1.Avatar as='a' src='/images/avatar/small/joe.jpg' />
                    <Comment1.Content>
                        <Comment1.Author as='a'>Joe Henderson</Comment1.Author>
                        <Comment1.Metadata>
                            <span>5 days ago</span>
                        </Comment1.Metadata>
                        <Comment1.Text>Dude, this is awesome. Thanks so much</Comment1.Text>
                        <Comment1.Actions>
                            <a>Reply</a>
                        </Comment1.Actions>
                    </Comment1.Content>
                </Comment1>
            </Comment1.Group>
        ).html();
        const html0=mount(
            <Comment0.Group threaded>
                <Comment0>
                    <Comment0.Avatar as='a' src='/images/avatar/small/matt.jpg' />
                    <Comment0.Content>
                        <Comment0.Author as='a'>Matt</Comment0.Author>
                        <Comment0.Metadata>
                            <span>Today at 5:42PM</span>
                        </Comment0.Metadata>
                        <Comment0.Text>How artistic!</Comment0.Text>
                        <Comment0.Actions>
                            <a>Reply</a>
                        </Comment0.Actions>
                    </Comment0.Content>
                </Comment0>

                <Comment0>
                    <Comment0.Avatar as='a' src='/images/avatar/small/elliot.jpg' />
                    <Comment0.Content>
                        <Comment0.Author as='a'>Elliot Fu</Comment0.Author>
                        <Comment0.Metadata>
                            <span>Yesterday at 12:30AM</span>
                        </Comment0.Metadata>
                        <Comment0.Text>
                            <p>This has been very useful for my research. Thanks as well!</p>
                        </Comment0.Text>
                        <Comment0.Actions>
                            <a>Reply</a>
                        </Comment0.Actions>
                    </Comment0.Content>

                    <Comment0.Group>
                        <Comment0>
                            <Comment0.Avatar as='a' src='/images/avatar/small/jenny.jpg' />
                            <Comment0.Content>
                                <Comment0.Author as='a'>Jenny Hess</Comment0.Author>
                                <Comment0.Metadata>
                                    <span>Just now</span>
                                </Comment0.Metadata>
                                <Comment0.Text>Elliot you are always so right :)</Comment0.Text>
                                <Comment0.Actions>
                                    <a>Reply</a>
                                </Comment0.Actions>
                            </Comment0.Content>
                        </Comment0>
                    </Comment0.Group>
                </Comment0>

                <Comment0>
                    <Comment0.Avatar as='a' src='/images/avatar/small/joe.jpg' />
                    <Comment0.Content>
                        <Comment0.Author as='a'>Joe Henderson</Comment0.Author>
                        <Comment0.Metadata>
                            <span>5 days ago</span>
                        </Comment0.Metadata>
                        <Comment0.Text>Dude, this is awesome. Thanks so much</Comment0.Text>
                        <Comment0.Actions>
                            <a>Reply</a>
                        </Comment0.Actions>
                    </Comment0.Content>
                </Comment0>
            </Comment0.Group>
        ).html();

        expect(html1).toBe(html0);
    });
});
