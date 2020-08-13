import { getMenuOptions } from './getMenuOptions';

export const getSelectedIndex = (config: any) => {

    const { multiple, selectedIndex, value } = config;

    const menuOptions = getMenuOptions(config);

    const enabledIndexes = menuOptions.reduce(
        (memo, item, index) => {
            if (!item.disabled) memo.push(index);
            return memo;
        },
        [] as number[],
    );

    let newSelectedIndex;

    // update the selected index
    if (!selectedIndex || selectedIndex < 0) {

        const firstIndex = enabledIndexes[0];

        // Select the currently active item, if none, use the first item.
        // Multiple selects remove active items from the list,
        // their initial selected index should be 0.
        newSelectedIndex = multiple
            ? firstIndex
            : menuOptions.findIndex(x => x.value === value) || firstIndex;
    } else if (multiple) {
        newSelectedIndex = enabledIndexes.find((index) => index >= selectedIndex);
        // multiple selects remove options from the menu as they are made active
        // keep the selected index within range of the remaining items
        if (selectedIndex >= menuOptions.length - 1) {
            newSelectedIndex = enabledIndexes[enabledIndexes.length - 1];
        }
    } else {
        const activeIndex = menuOptions.findIndex(x => x.value === value);

        // regular selects can only have one active item
        // set the selected index to the currently active item
        newSelectedIndex = enabledIndexes.includes(activeIndex) ? activeIndex : undefined;
    }

    if (!newSelectedIndex || newSelectedIndex < 0) {
        newSelectedIndex = enabledIndexes[0];
    }

    return newSelectedIndex;
};
