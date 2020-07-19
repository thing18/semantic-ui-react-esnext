import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

export interface SidebarPusherProps extends StrictSidebarPusherProps {
  [key: string]: any;
}

export interface StrictSidebarPusherProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Controls whether or not the dim is displayed. */
  dimmed?: boolean;
}

/**
 * A pushable sub-component for Sidebar.
 */
export const SidebarPusher: React.FC<SidebarPusherProps> = ({ dimmed, ...props }) => ChildrenOrContent(props, 'pusher', { dimmed });
