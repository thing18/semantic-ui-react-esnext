import faker from 'faker';
import _ from 'lodash';
import React, { useState, Fragment, useRef } from 'react';
import { Example } from './doc';


export const DropdownExampleDropdown=({ lib: { Dropdown } }) => (
    <Dropdown text='File'>
        <Dropdown.Menu>
            <Dropdown.Item text='New' />
            <Dropdown.Item text='Open...' description='ctrl + o' />
            <Dropdown.Item text='Save as...' description='ctrl + s' />
            <Dropdown.Item text='Rename' description='ctrl + r' />
            <Dropdown.Item text='Make a copy' />
            <Dropdown.Item icon='folder' text='Move to folder' />
            <Dropdown.Item icon='trash' text='Move to trash' />
            <Dropdown.Divider />
            <Dropdown.Item text='Download As...' />
            <Dropdown.Item text='Publish To Web' />
            <Dropdown.Item text='E-mail Collaborators' />
        </Dropdown.Menu>
    </Dropdown>
);

const friendOptions=[
    {
        key: 'Jenny Hess',
        text: 'Jenny Hess',
        value: 'Jenny Hess',
        image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
    },
    {
        key: 'Elliot Fu',
        text: 'Elliot Fu',
        value: 'Elliot Fu',
        image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
    },
    {
        key: 'Stevie Feliciano',
        text: 'Stevie Feliciano',
        value: 'Stevie Feliciano',
        image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
    },
    {
        key: 'Christian',
        text: 'Christian',
        value: 'Christian',
        image: { avatar: true, src: '/images/avatar/small/christian.jpg' },
    },
    {
        key: 'Matt',
        text: 'Matt',
        value: 'Matt',
        image: { avatar: true, src: '/images/avatar/small/matt.jpg' },
    },
    {
        key: 'Justen Kitsune',
        text: 'Justen Kitsune',
        value: 'Justen Kitsune',
        image: { avatar: true, src: '/images/avatar/small/justen.jpg' },
    },
]

export const DropdownExampleSelection=({ lib: { Dropdown } }) => (
    <Dropdown
        placeholder='Select Friend'
        fluid
        selection
        options={friendOptions}
    />
)

const options=[
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2 },
    { key: 3, text: 'Choice 3', value: 3 },
]

export const DropdownExampleSimple=({ lib: { Menu, Dropdown } }) => (
    <Menu compact>
        <Dropdown text='Dropdown' options={options} simple item />
    </Menu>
);

export const DropdownExampleClearable=({ lib: { Dropdown } }) => <Dropdown clearable options={options} selection />

const countryOptions=[
    { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
    { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
    { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
    { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
    { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
    { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
    { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
    { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
    { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
    { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
    { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
    { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
    { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
    { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
    { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
    { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
    { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
    { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
    { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
    { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
    { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
    { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
]

export const DropdownExampleClearableMultiple=({ lib: { Dropdown } }) => <Dropdown clearable fluid multiple search selection options={countryOptions} placeholder='Select Country' />;

export const examples=[
    { h: 'Simple', c: DropdownExampleSimple },
    { h: 'Clearable', c: DropdownExampleClearable },
    { h: 'Clearable multiple', c: DropdownExampleClearableMultiple },
    { h: 'Dropdown', c: DropdownExampleDropdown },
    { h: 'Selection', c: DropdownExampleSelection },
];

export const DropdownExamples=({ lib, lib: { Divider } }) => (

    <div>
        {examples.map(({ h, c }, i) => <Example key={i} lib={lib} header={h} item={c} />)}
    </div>
);
