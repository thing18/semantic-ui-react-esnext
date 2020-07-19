// import * as PropTypes from 'prop-types';

import { useEventListener } from './useEventListener';
import { EventListenerOptions, EventTypes } from './types';

// tslint:disable-next-line: function-name
function EventListener<T extends EventTypes>(props: EventListenerOptions<T>) {
  useEventListener(props);

  return null;
}

// EventListener.displayName = 'EventListener';
// // TODO: use Babel plugin for this
// EventListener.propTypes =
//   process.env.NODE_ENV !== 'production'
//     ? {
//       capture: PropTypes.bool,
//       listener: PropTypes.func.isRequired,
//       target: PropTypes.object as PropTypes.Validator<Target>,
//       targetRef: PropTypes.shape({
//         current: PropTypes.object,
//       }) as PropTypes.Validator<TargetRef>,
//       type: PropTypes.string.isRequired as PropTypes.Validator<EventTypes>,
//     }
//     : {};

EventListener.defaultProps = {
  capture: false,
};

export { EventListener };
