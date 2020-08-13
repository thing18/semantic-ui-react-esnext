import { TRANSITION_STATUSES } from '../Transition';
/**
 * @param {Object} [options]
 * @param {String} [options.status]
 * @param {Boolean} [options.mountOnShow]
 * @param {Boolean} [options.transitionOnMount]
 * @param {Boolean} [options.visible]
 * @param {Boolean} [options.unmountOnHide]
 */
interface Options {
    status: TRANSITION_STATUSES;
    [key: string]: any;
}

interface R {
    animating: boolean;
    status: TRANSITION_STATUSES;
    nextStatus: TRANSITION_STATUSES | undefined;
}

export const computeStatuses = ({ mountOnShow, status, transitionOnMount, visible, unmountOnHide }: Options): R => {

    // tslint:disable: object-shorthand-properties-first
    if (visible) {

        switch (status) {

            case 'INITIAL':
                return { animating: !!transitionOnMount, status: transitionOnMount ? 'ENTERING' : 'ENTERED', nextStatus: transitionOnMount ? 'ENTERED' : undefined };

            case 'ENTERED':
                return { animating: false, status, nextStatus: undefined };

            case 'ENTERING':
                return {} as any;

            case 'EXITING':
            case 'EXITED':
            case 'UNMOUNTED':
                return { animating: true, status: 'ENTERING', nextStatus: 'ENTERED' };
        }
    }

    switch (status) {

        case 'INITIAL':
            return { animating: false, status: mountOnShow || unmountOnHide ? 'UNMOUNTED' : 'EXITED', nextStatus: undefined };

        case 'ENTERED':
        case 'ENTERING':
            return { animating: true, status: 'EXITING', nextStatus: unmountOnHide ? 'UNMOUNTED' : 'EXITED' };

        case 'EXITING':
            return {} as any;

        case 'EXITED':
            return { animating: false, status, nextStatus: undefined };

        case 'UNMOUNTED':
            // tslint:disable-next-line: object-shorthand-properties-first
            return { animating: false, status, nextStatus: undefined };
    }
    // tslint:enable: object-shorthand-properties-first
};
