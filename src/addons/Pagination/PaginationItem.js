import keyboardKey from 'keyboard-key'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Component } from 'react'

import { createShorthandFactory } from '../../lib'
import MenuItem from '../../collections/Menu/MenuItem'

/**
 * An item of a pagination.
 */
class PaginationItem extends Component {
  static propTypes={
    /** A pagination item can be active. */
    active: PropTypes.bool,

    /** A pagination item can be disabled. */
    disabled: PropTypes.bool,

    /**
     * Called on click.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /**
     * Called on key down.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onKeyDown: PropTypes.func,

    /** A pagination should have a type. */
    type: PropTypes.oneOf([
      'ellipsisItem',
      'firstItem',
      'prevItem',
      'pageItem',
      'nextItem',
      'lastItem',
    ]),
  }

  handleClick=(e) => {
    this.props.onClick?.call(null, e, this.props)
  }

  handleKeyDown=(e) => {
    this.props.onKeyDown?.call(null, e, this.props)
    if (keyboardKey.getCode(e)===keyboardKey.Enter) this.props.onClick?.call(null, e, this.props)
  }

  handleOverrides=() => ({
    onClick: this.handleClick,
    onKeyDown: this.handleKeyDown,
  })

  render() {
    const { active, type }=this.props
    const disabled=this.props.disabled||type==='ellipsisItem'

    return MenuItem.create(this.props, {
      defaultProps: {
        active,
        'aria-current': active,
        'aria-disabled': disabled,
        disabled,
        onClick: this.handleClick,
        onKeyDown: this.handleKeyDown,
        tabIndex: disabled? -1:0,
      },
      overrideProps: this.handleOverrides,
    })
  }
}

PaginationItem.create=createShorthandFactory(PaginationItem, (content) => ({ content }))

export default PaginationItem
