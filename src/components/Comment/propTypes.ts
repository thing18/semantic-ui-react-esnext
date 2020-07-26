import PropTypes from 'prop-types';
import _without from 'lodash/without';
// import _uniq from 'lodash/uniq';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Comment } from './Comment';
import { CommentAction } from './CommentAction';
import { CommentActions } from './CommentActions';
import { CommentAuthor } from './CommentAuthor';
import { CommentAvatar } from './CommentAvatar';
import { CommentContent } from './CommentContent';
import { CommentGroup } from './CommentGroup';
import { CommentMetadata } from './CommentMetadata';
import { CommentText } from './CommentText';

CommentText.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

CommentMetadata.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

CommentGroup.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Comments can be collapsed, or hidden from view. */
    collapsed: PropTypes.bool,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Comments can hide extra information unless a user shows intent to interact with a comment. */
    minimal: PropTypes.bool,

    /** Comments can have different sizes. */
    size: PropTypes.oneOf(_without(SUI.SIZES, 'medium')) as any,

    /** A comment list can be threaded to showing the relationship between conversations. */
    threaded: PropTypes.bool,
};

CommentContent.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

CommentAvatar.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Additional classes. */
    className: PropTypes.string,

    /** Specifies the URL of the image. */
    src: PropTypes.string,
};

CommentAuthor.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

CommentActions.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

CommentAction.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Style as the currently active action. */
    active: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

Comment.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Comment can be collapsed, or hidden from view. */
    collapsed: PropTypes.bool,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

export { };
