import React from 'react';

import { FCX, createShorthandFactory, isBrowser } from '../../lib';
import { Portal } from '..';
import { DimmerDimmable } from './DimmerDimmable';
import { DimmerInner } from './DimmerInner';

export interface DimmerProps extends StrictDimmerProps {
  [key: string]: any;
}

export interface StrictDimmerProps {
  /** An active dimmer will dim its parent container. */
  active?: boolean;

  /** A dimmer can be formatted to be fixed to the page. */
  page?: boolean;
}

interface CDimmer extends FCX<DimmerProps> {
  Dimmable: typeof DimmerDimmable;
  Inner: typeof DimmerInner;
}

/**
 * A dimmer hides distractions to focus attention on particular content.
 */
const Dimmer: CDimmer = props => {

  const { active, page, ...rest } = props;

  if (!page) return <DimmerInner {...rest} active={active} page={page} />;

  const handlePortalMount = () => isBrowser() && document.body.classList.add('dimmed', 'dimmable');

  const handlePortalUnmount = () => isBrowser() && document.body.classList.remove('dimmed', 'dimmable');

  return (
    <Portal closeOnEscape={false} closeOnDocumentClick={false} onMount={handlePortalMount} onUnmount={handlePortalUnmount} open={active} openOnTriggerClick={false}>
      <DimmerInner {...rest} active={active} page={page} />
    </Portal>
  );
};

Dimmer.create = createShorthandFactory(Dimmer, (value) => ({ content: value }));
Dimmer.Dimmable = DimmerDimmable;
Dimmer.Inner = DimmerInner;

export { Dimmer };
