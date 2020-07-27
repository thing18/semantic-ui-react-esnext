import PropTypes from 'prop-types';
import _without from 'lodash/without';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Form } from './Form';
import { FormButton } from './FormButton';
import { FormCheckbox } from './FormCheckbox';
import { FormDropdown } from './FormDropdown';
import { FormField } from './FormField';
import { FormGroup } from './FormGroup';
import { FormInput } from './FormInput';
import { FormRadio } from './FormRadio';
import { FormSelect } from './FormSelect';
import { FormTextArea } from './FormTextArea';
import { DropdownItem } from '../Dropdown';

FormField.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /**
     * A form control component (i.e. Dropdown) or HTML tagName (i.e. 'input').
     * Extra FormField props are passed to the control component.
     * Mutually exclusive with children.
     */
    control: customPropTypes.some([
        PropTypes.func,
        PropTypes.oneOf(['button', 'input', 'select', 'textarea']),
    ]) as any,

    /** Individual fields may be disabled. */
    disabled: PropTypes.bool,

    /** Individual fields may display an error state along with a message. */
    error: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]) as any,

    /** The id of the control */
    id: PropTypes.string,

    /** A field can have its label next to instead of above it. */
    inline: PropTypes.bool,

    // Heads Up!
    // Do not disallow children with `label` shorthand
    // The `control` might accept a `label` prop and `children`
    /** Mutually exclusive with children. */
    label: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),

    /** A field can show that input is mandatory. */
    required: PropTypes.bool,

    /** Passed to the control component (i.e. <input type='password' />) */
    type: customPropTypes.every([
        customPropTypes.demand(['control']),
        // don't strictly validate HTML types
        // a control might be passed that uses a `type` prop with unknown values
        // let the control validate if for us
    ]),

    /** A field can specify its width in grid columns */
    width: PropTypes.oneOf(SUI.WIDTHS as any),
};

FormTextArea.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** A FormField control prop. */
    control: FormField.propTypes!.control,
};

FormSelect.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** A FormField control prop. */
    control: FormField.propTypes!.control,

    /** Array of Dropdown.Item props e.g. `{ text: '', value: '' }` */
    options: PropTypes.arrayOf(PropTypes.shape(DropdownItem!.propTypes!)).isRequired as any,
};

FormRadio.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** A FormField control prop. */
    control: FormField.propTypes!.control,
};

FormInput.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** A FormField control prop. */
    control: FormField.propTypes!.control,
};

FormGroup.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Fields can show related choices. */
    grouped: customPropTypes.every([customPropTypes.disallow(['inline']), PropTypes.bool]),

    /** Multiple fields may be inline in a row. */
    inline: customPropTypes.every([customPropTypes.disallow(['grouped']), PropTypes.bool]),

    /** A form group can prevent itself from stacking on mobile. */
    unstackable: PropTypes.bool,

    /** Fields Groups can specify their width in grid columns or automatically divide fields to be equal width. */
    widths: PropTypes.oneOf([...SUI.WIDTHS as any, 'equal']),
};

FormDropdown.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** A FormField control prop. */
    control: FormField.propTypes!.control,
};

FormCheckbox.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** A FormField control prop. */
    control: FormField.propTypes!.control,
};

FormButton.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** A FormField control prop. */
    control: FormField.propTypes!.control,
};

Form.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** The HTML form action */
    action: PropTypes.string,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Automatically show any error Message children. */
    error: PropTypes.bool,

    /** A form can have its color inverted for contrast. */
    inverted: PropTypes.bool,

    /** Automatically show a loading indicator. */
    loading: PropTypes.bool,

    /** The HTML form submit handler. */
    onSubmit: PropTypes.func,

    /** A comment can contain a form to reply to a comment. This may have arbitrary content. */
    reply: PropTypes.bool,

    /** A form can vary in size. */
    size: PropTypes.oneOf(_without(SUI.SIZES, 'medium')),

    /** Automatically show any success Message children. */
    success: PropTypes.bool,

    /** A form can prevent itself from stacking on mobile. */
    unstackable: PropTypes.bool,

    /** Automatically show any warning Message children. */
    warning: PropTypes.bool,

    /** Forms can automatically divide fields to be equal width. */
    widths: PropTypes.oneOf(['equal']),
};

export { };
