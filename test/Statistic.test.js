require('./setup');
import React from 'react';
import { mount } from 'enzyme';

import { Statistic as Statistic0, Icon as Icon0, Image as Image0 } from '../dist.0';
import { Statistic as Statistic1, Icon as Icon1, Image as Image1 } from '../dist.1';

const _expect=(C) => expect(mount(<C Statistic={Statistic1} Icon={Icon1} Image={Image1} />).html()).toBe(mount(<C Statistic={Statistic0} Icon={Icon0} Image={Image0} />).html());

describe('Statistic', () => {

    it('empty', () => expect(mount(<Statistic1 />).html()).toBe(mount(<Statistic0 />).html()));

    it('basic', () => _expect(Basic));

    it('basic:shorthand', () => _expect(BasicShorthand));

    it('group', () => _expect(Group));

    it('group:shorthand', () => _expect(GroupShorthand));

    it('label', () => _expect(Label));

    it('label:top', () => _expect(TopLabel));

    it('value', () => _expect(Value));

    it('value:shorthand', () => _expect(ValueShorthand));

    it('colored', () => _expect(Colored));

    it('colored:group', () => _expect(ColoredGroup));

    it('evenly divided', () => _expect(EvenlyDivided));

    it('floated', () => _expect(Floated));

    it('horizontal', () => _expect(Horizontal));

    it('horizontal:group', () => _expect(HorizontalGroup));

    it('horizontal:shorthand', () => _expect(HorizontalShorthand));

});

const Basic=({ Statistic }) => (
    <Statistic>
        <Statistic.Value>5,550</Statistic.Value>
        <Statistic.Label>Downloads</Statistic.Label>
    </Statistic>
);

const BasicShorthand=({ Statistic }) => <Statistic label='Downloads' value='5,550' />;

const Group=({ Statistic }) => (
    <div>
        <Statistic.Group>
            <Statistic>
                <Statistic.Value>22</Statistic.Value>
                <Statistic.Label>Faves</Statistic.Label>
            </Statistic>
            <Statistic>
                <Statistic.Value>31,200</Statistic.Value>
                <Statistic.Label>Views</Statistic.Label>
            </Statistic>
            <Statistic>
                <Statistic.Value>22</Statistic.Value>
                <Statistic.Label>Members</Statistic.Label>
            </Statistic>
        </Statistic.Group>
    </div>
);

const GroupShorthand=({ Statistic }) => <Statistic.Group items={[
    { key: 'faves', label: 'Faves', value: '22' },
    { key: 'views', label: 'Views', value: '31,200' },
    { key: 'members', label: 'Members', value: '22' },
]} />;

const TopLabel=({ Statistic }) => (
    <Statistic>
        <Statistic.Label>Views</Statistic.Label>
        <Statistic.Value>40,509</Statistic.Value>
    </Statistic>
);

const Label=({ Statistic }) => (
    <Statistic>
        <Statistic.Value>2,204</Statistic.Value>
        <Statistic.Label>Views</Statistic.Label>
    </Statistic>
);

const Value=({ Statistic, Icon, Image }) => (
    <Statistic.Group>
        <Statistic>
            <Statistic.Value>22</Statistic.Value>
            <Statistic.Label>Saves</Statistic.Label>
        </Statistic>

        <Statistic>
            <Statistic.Value text>
                Three
                <br />
                Thousand
            </Statistic.Value>
            <Statistic.Label>Signups</Statistic.Label>
        </Statistic>

        <Statistic>
            <Statistic.Value>
                <Icon name='plane' />5
            </Statistic.Value>
            <Statistic.Label>Flights</Statistic.Label>
        </Statistic>

        <Statistic>
            <Statistic.Value>
                <Image src='/images/avatar/small/joe.jpg' inline circular />
                42
            </Statistic.Value>
            <Statistic.Label>Team Members</Statistic.Label>
        </Statistic>
    </Statistic.Group>
);

const ValueShorthand=({ Statistic }) => (
    <Statistic.Group>
        <Statistic label='Saves' value='22' />
        <Statistic label='Signups' value='Three Thousand' text />
        <Statistic label='Flights' value='5' />
        <Statistic label='Team Members' value='42' />
    </Statistic.Group>
);

const Colored=({ Statistic }) => (
    <Statistic.Group>
        <Statistic color='red'>
            <Statistic.Value>27</Statistic.Value>
            <Statistic.Label>red</Statistic.Label>
        </Statistic>
        <Statistic color='orange'>
            <Statistic.Value>8'</Statistic.Value>
            <Statistic.Label>orange</Statistic.Label>
        </Statistic>
        <Statistic color='yellow'>
            <Statistic.Value>28</Statistic.Value>
            <Statistic.Label>yellow</Statistic.Label>
        </Statistic>
    </Statistic.Group>
);

const ColoredGroup=({ Statistic }) => (
    <Statistic.Group color='red'>
        <Statistic>
            <Statistic.Value>22</Statistic.Value>
            <Statistic.Label>Faves</Statistic.Label>
        </Statistic>
        <Statistic>
            <Statistic.Value>31,200</Statistic.Value>
            <Statistic.Label>Views</Statistic.Label>
        </Statistic>
        <Statistic>
            <Statistic.Value>22</Statistic.Value>
            <Statistic.Label>Members</Statistic.Label>
        </Statistic>
    </Statistic.Group>
);

const EvenlyDivided=({ Statistic, Icon, Image }) => (
    <Statistic.Group widths='four'>
        <Statistic>
            <Statistic.Value>22</Statistic.Value>
            <Statistic.Label>Saves</Statistic.Label>
        </Statistic>

        <Statistic>
            <Statistic.Value text>
                Three
        <br />
        Thousand
      </Statistic.Value>
            <Statistic.Label>Signups</Statistic.Label>
        </Statistic>

        <Statistic>
            <Statistic.Value>
                <Icon name='plane' />5
      </Statistic.Value>
            <Statistic.Label>Flights</Statistic.Label>
        </Statistic>

        <Statistic>
            <Statistic.Value>
                <Image src='/images/avatar/small/joe.jpg' className='circular inline' />
        42
      </Statistic.Value>
            <Statistic.Label>Team Members</Statistic.Label>
        </Statistic>
    </Statistic.Group>
);

const Floated=({ Statistic }) => (
    <div className='segment'>
        <Statistic floated='right'>
            <Statistic.Value>2,204</Statistic.Value>
            <Statistic.Label>Views</Statistic.Label>
        </Statistic>

        <p>
            Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex eam alia
            facete scriptorem, est autem aliquip detraxit at. Usu ocurreret
            referrentur at, cu epicurei appellantur vix. Cum ea laoreet recteque
            electram, eos choro alterum definiebas in. Vim dolorum definiebas an. Mei
            ex natum rebum iisque.
    </p>

        <p>
            Audiam quaerendum eu sea, pro omittam definiebas ex. Te est latine
            definitiones. Quot wisi nulla ex duo. Vis sint solet expetenda ne, his te
            phaedrum referrentur consectetuer. Id vix fabulas oporteat, ei quo vide
            phaedrum, vim vivendum maiestatis in.
    </p>

        <Statistic floated='left'>
            <Statistic.Value>2,204</Statistic.Value>
            <Statistic.Label>Views</Statistic.Label>
        </Statistic>

        <p>
            Eu quo homero blandit intellegebat. Incorrupte consequuntur mei id. Mei ut
            facer dolores adolescens, no illum aperiri quo, usu odio brute at. Qui te
            porro electram, ea dico facete utroque quo. Populo quodsi te eam, wisi
            everti eos ex, eum elitr altera utamur at. Quodsi convenire mnesarchum eu
            per, quas minimum postulant per id.
    </p>
        <p>
            Audiam quaerendum eu sea, pro omittam definiebas ex. Te est latine
            definitiones. Quot wisi nulla ex duo. Vis sint solet expetenda ne, his te
            phaedrum referrentur consectetuer. Id vix fabulas oporteat, ei quo vide
            phaedrum, vim vivendum maiestatis in.
    </p>
    </div>
);

const Horizontal=({ Statistic }) => (
    <Statistic horizontal>
        <Statistic.Value>2,204</Statistic.Value>
        <Statistic.Label>Views</Statistic.Label>
    </Statistic>
);

const HorizontalGroup=({ Statistic }) => (
    <Statistic.Group horizontal>
        <Statistic>
            <Statistic.Value>2,204</Statistic.Value>
            <Statistic.Label>Views</Statistic.Label>
        </Statistic>
        <Statistic>
            <Statistic.Value>3,322</Statistic.Value>
            <Statistic.Label>Downloads</Statistic.Label>
        </Statistic>
        <Statistic>
            <Statistic.Value>22</Statistic.Value>
            <Statistic.Label>Tasks</Statistic.Label>
        </Statistic>
    </Statistic.Group>
);

const HorizontalShorthand=({ Statistic }) => <Statistic horizontal label='Views' value='2,204' />;
