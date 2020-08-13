import PropTypes from 'prop-types';
import _without from 'lodash/without';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { MessageList } from './MessageList';
import { MessageItem } from './MessageItem';
import { MessageHeader } from './MessageHeader';
import { MessageContent } from './MessageContent';
import { Message } from './Message';

MessageList.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand Message.Items. */
    items: customPropTypes.collectionShorthand,
};

MessageItem.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

MessageHeader.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

MessageContent.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

Message.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

    /** A message can be formatted to attach itself to other content. */
    attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['bottom', 'top'])]) as any,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** A message can be formatted to be different colors. */
    color: PropTypes.oneOf(SUI.COLORS as any),

    /** A message can only take up the width of its content. */
    compact: PropTypes.bool,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A message may be formatted to display a negative message. Same as `negative`. */
    error: PropTypes.bool,

    /** A message can float above content that it is related to. */
    floating: PropTypes.bool,

    /** Shorthand for MessageHeader. */
    header: customPropTypes.itemShorthand,

    /** A message can be hidden. */
    hidden: PropTypes.bool,

    /** A message can contain an icon. */
    icon: PropTypes.oneOfType([customPropTypes.itemShorthand, PropTypes.bool]),

    /** A message may be formatted to display information. */
    info: PropTypes.bool,

    /** Array shorthand items for the MessageList. Mutually exclusive with children. */
    list: customPropTypes.collectionShorthand,

    /** A message may be formatted to display a negative message. Same as `error`. */
    negative: PropTypes.bool,

    /**
     * A message that the user can choose to hide.
     * Called when the user clicks the "x" icon. This also adds the "x" icon.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onDismiss: PropTypes.func,

    /** A message may be formatted to display a positive message.  Same as `success`. */
    positive: PropTypes.bool,

    /** A message can have different sizes. */
    size: PropTypes.oneOf(_without(SUI.SIZES, 'medium')) as any,

    /** A message may be formatted to display a positive message.  Same as `positive`. */
    success: PropTypes.bool,

    /** A message can be set to visible to force itself to be shown. */
    visible: PropTypes.bool,

    /** A message may be formatted to display warning messages. */
    warning: PropTypes.bool,
};

export { };
