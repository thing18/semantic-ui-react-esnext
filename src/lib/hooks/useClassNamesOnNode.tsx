import React, { useRef } from 'react';
import { isRefObject } from '../../components/Ref';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

const CLASS_NAME_DELIMITER = /\s+/;

/**
 * Accepts a set of ref objects that contain classnames as a string and returns an array of unique
 * classNames.
 *
 * @param {Set<React.RefObject>|undefined} classNameRefs
 * @returns String[]
 */
export function computeClassNames(classNameRefs: any) {

    const classNames: string[] = [];

    if (classNameRefs) {
        classNameRefs.forEach((classNameRef: any) => {
            if (typeof classNameRef.current === 'string') {
                const classNamesForRef = classNameRef.current.split(CLASS_NAME_DELIMITER);

                classNamesForRef.forEach((className: any) => classNames.push(className));
            }
        });

        return classNames.filter(
            (className, i, array) => className.length > 0 && array.indexOf(className) === i,
        );
    }

    return [];
}

/**
 * Computes classnames that should be removed and added to a node based on input differences.
 *
 * @param {String[]} prevClassNames
 * @param {String[]} currentClassNames
 */
export function computeClassNamesDifference(prevClassNames: string[], currentClassNames: string[]) {
    return [
        currentClassNames.filter((className) => prevClassNames.indexOf(className) === -1),
        prevClassNames.filter((className) => currentClassNames.indexOf(className) === -1),
    ];
}

const prevClassNames = new Map();

/**
 * @param {HTMLElement} node
 * @param {Set<React.RefObject>|undefined} classNameRefs
 */
export const handleClassNamesChange = (node: HTMLElement, classNameRefs: Set<any>) => {
    const currentClassNames = computeClassNames(classNameRefs);
    const [forAdd, forRemoval] = computeClassNamesDifference(
        prevClassNames.get(node) || [],
        currentClassNames,
    );

    if (node) {
        forAdd.forEach((className) => node.classList.add(className));
        forRemoval.forEach((className) => node.classList.remove(className));
    }

    prevClassNames.set(node, currentClassNames);
};

export class NodeRegistry {

    nodes: Map<HTMLElement, Set<any>>;

    constructor() {
        this.nodes = new Map();
    }

    add = (node: HTMLElement, classNameRef: any) => {
        if (this.nodes.has(node)) {
            const set = this.nodes.get(node);

            set!.add(classNameRef);
            return;
        }

        // IE11 does not support constructor params
        const set = new Set();
        set.add(classNameRef);

        this.nodes.set(node, set);
    }

    del = (node: HTMLElement, classNameRef: any) => {
        if (!this.nodes.has(node)) {
            return;
        }

        const set = this.nodes.get(node);

        if (set!.size === 1) {
            this.nodes.delete(node);
            return;
        }

        set!.delete(classNameRef);
    }

    emit = (node: HTMLElement, callback: any) => {
        callback(node, this.nodes.get(node));
    }
}

const nodeRegistry = new NodeRegistry();

/**
 * A React hooks that allows to manage classNames on a DOM node in declarative manner. Accepts
 * a HTML element or React ref objects with it.
 *
 * @param {HTMLElement|React.RefObject} node
 * @param {String} className
 */
export function useClassNamesOnNode(node: HTMLElement | React.RefObject<HTMLElement>, className: string) {
    const classNameRef = useRef<string>();
    const isMounted = useRef(false);

    useIsomorphicLayoutEffect(() => {
        classNameRef.current = className;

        if (isMounted.current) {
            const element = isRefObject(node) ? node.current : node;
            nodeRegistry.emit(element!, handleClassNamesChange);
        }

        isMounted.current = true;
    }, [className]);

    useIsomorphicLayoutEffect(() => {
        const element = isRefObject(node) ? node.current : node;

        nodeRegistry.add(element!, classNameRef);
        nodeRegistry.emit(element!, handleClassNamesChange);

        return () => {
            nodeRegistry.del(element!, classNameRef);
            nodeRegistry.emit(element!, handleClassNamesChange);
        };
    }, [node]);
}
