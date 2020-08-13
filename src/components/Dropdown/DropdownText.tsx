import React, { Children } from 'react';
import { SemanticShorthandContent, getClassName1, FCX, createShorthandFactory } from '../../lib';

export interface DropdownTextProps extends StrictDropdownTextProps {
    [key: string]: any;
}

export interface StrictDropdownTextProps {
    /** An element type to render as (string or function). */
    as?: React.ElementType;

    /** Primary content. */
    children?: React.ReactNode;

    /** Additional classes. */
    className?: string;

    /** Shorthand for primary content. */
    content?: SemanticShorthandContent;
}

export const DropdownText: FCX<DropdownTextProps> = ({ as: ElementType = 'div', children, className, content, ...rest }) => {

    const classes = getClassName1('divider', className);

    return (
        <ElementType aria-atomic aria-live='polite' role='alert' {...rest} className={classes}>
            {Children.count(children) ? children : content}
        </ElementType>
    );
};

DropdownText.create = createShorthandFactory(DropdownText, (val) => ({ content: val }));
