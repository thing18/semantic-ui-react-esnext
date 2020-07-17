import { getMenuOptions } from './getMenuOptions';

export const getSelectedIndex = (config: any) => {
    const { additionLabel, additionPosition, allowAdditions, deburr, multiple, options, search, searchQuery, selectedIndex, value } = config;

    const menuOptions = getMenuOptions({ value, options, searchQuery, additionLabel, additionPosition, allowAdditions, deburr, multiple, search });

    const enabledIndicies = menuOptions.reduce(
        (memo, item, index) => {
            if (!item.disabled) memo.push(index);
            return memo;
        },
        [] as number[],
    );

    let newSelectedIndex;

    // update the selected index
    if (!selectedIndex || selectedIndex < 0) {

        const firstIndex = enabledIndicies[0];

        // Select the currently active item, if none, use the first item.
        // Multiple selects remove active items from the list,
        // their initial selected index should be 0.
        newSelectedIndex = multiple
            ? firstIndex
            : menuOptions.findIndex(x => x.value === value) || enabledIndicies[0];
    } else if (multiple) {
        // multiple selects remove options from the menu as they are made active
        // keep the selected index within range of the remaining items
        if (selectedIndex >= menuOptions.length - 1) {
            newSelectedIndex = enabledIndicies[enabledIndicies.length - 1];
        }
    } else {
        const activeIndex = menuOptions.findIndex(x => x.value === value);

        // regular selects can only have one active item
        // set the selected index to the currently active item
        newSelectedIndex = enabledIndicies.includes(activeIndex) ? activeIndex : undefined;
    }

    if (!newSelectedIndex || newSelectedIndex < 0) {
        newSelectedIndex = enabledIndicies[0];
    }

    return newSelectedIndex;
}