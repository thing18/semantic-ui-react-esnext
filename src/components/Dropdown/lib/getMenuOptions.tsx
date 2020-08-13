import React from 'react';
import { DropdownItemProps } from '../DropdownItem';
import { escapeRegExp, deburr as _deburr } from '../../../lib';

export const getMenuOptions = (config: any) => {

    const { additionLabel, additionPosition, allowAdditions, deburr, multiple, options = [], search, searchQuery, value } = config;

    let filteredOptions = options as DropdownItemProps[];

    // filter out active options
    if (multiple) filteredOptions = filteredOptions.filter(x => !value.includes(x.value!));

    // filter by search query
    if (search && searchQuery) {
        // tslint:disable-next-line: triple-equals
        if (typeof search == 'function') {
            filteredOptions = search(filteredOptions, searchQuery);
        } else {
            // remove diacritics on search input and options, if deburr prop is set
            const strippedQuery = deburr ? _deburr(searchQuery) : searchQuery;

            const re = new RegExp(escapeRegExp(strippedQuery), 'i');

            filteredOptions = filteredOptions.filter(({ text }) => re.test(deburr ? _deburr(text as string) : text as string));
        }
    }

    // insert the "add" item
    if (allowAdditions && search && searchQuery && !filteredOptions.some(x => x.text === searchQuery)) {
        const additionLabelElement = React.isValidElement(additionLabel)
            ? React.cloneElement(additionLabel, { key: 'addition-label' })
            : additionLabel || '';

        const addItem = {
            key: 'addition',
            // by using an array, we can pass multiple elements, but when doing so
            // we must specify a `key` for React to know which one is which
            text: [additionLabelElement, <b key='addition-query'>{searchQuery}</b>],
            value: searchQuery,
            className: 'addition',
            'data-additional': true,
        };

        if (additionPosition === 'top') filteredOptions.unshift(addItem);
        else filteredOptions.push(addItem);
    }

    return filteredOptions;
};
