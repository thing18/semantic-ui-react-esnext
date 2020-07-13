import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

export interface SidebarPushableProps extends StrictSidebarPushableProps {
  [key: string]: any;
}

export interface StrictSidebarPushableProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;
}

/**
 * A pushable sub-component for Sidebar.
 */
export const SidebarPushable: React.FC<SidebarPushableProps> = props => ChildrenOrContent(props, 'pushable');
