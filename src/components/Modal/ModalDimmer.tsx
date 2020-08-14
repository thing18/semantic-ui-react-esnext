import React, { useRef, Children } from 'react';
import { SemanticShorthandContent, getClassName, createShorthandFactory, useClassNamesOnNode } from '../../lib';
import { Ref } from '../Ref';

export interface ModalDimmerProps extends StrictModalDimmerProps {
    [key: string]: any;
}

export interface StrictModalDimmerProps {
    /** An element type to render as (string or function). */
    as?: React.ElementType;

    /** A dimmer can be blurred. */
    blurring?: boolean;

    /** Primary content. */
    children?: React.ReactNode;

    /** Additional classes. */
    className?: string;

    /** A dimmer can center its contents in the viewport. */
    centered?: boolean;

    /** Shorthand for primary content. */
    content?: SemanticShorthandContent;

    /** A dimmer can be inverted. */
    inverted?: boolean;

    /** The node where the modal should mount. Defaults to document.body. */
    mountNode?: any;

    /** A dimmer can make body scrollable. */
    scrolling?: boolean;
}

function ModalDimmer(props: ModalDimmerProps) {

    const { as: ElementType = 'div', blurring, children, className, centered, content, inverted, mountNode, scrolling, ...rest } = props;
    const ref = useRef<HTMLElement>();

    const classes = getClassName('ui', { inverted, 'top aligned': !centered }, 'page modals dimmer transition visible active', className);
    const bodyClasses = getClassName('dimmable dimmed', { blurring, scrolling });

    React.useEffect(
        () => {
            if (ref.current && ref.current.style) {
                ref.current.style.setProperty('display', 'flex', 'important');
            }
        },
        [],
    );

    useClassNamesOnNode(mountNode, bodyClasses);
    return (
        <Ref innerRef={ref as any}>
            <ElementType {...rest} className={classes}>
                {Children.count(children) ? children : content}
            </ElementType>
        </Ref>
    );
}

ModalDimmer.create = createShorthandFactory(ModalDimmer, (content) => ({ content }));

export { ModalDimmer };
