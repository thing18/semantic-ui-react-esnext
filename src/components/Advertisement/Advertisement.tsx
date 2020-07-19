import React, { Children } from 'react';

import { SemanticShorthandContent, getClassName } from '../../lib';

export interface AdvertisementProps extends StrictAdvertisementProps {
  [key: string]: any;
}

export type AdvertisementUnit = 'medium rectangle' | 'large rectangle' | 'vertical rectangle' | 'small rectangle' | 'mobile banner' | 'banner' | 'vertical banner' | 'top banner' | 'half banner' | 'button' | 'square button' | 'small button' | 'skyscraper' | 'wide skyscraper' | 'leaderboard' | 'large leaderboard' | 'mobile leaderboard' | 'billboard' | 'panorama' | 'netboard' | 'half page' | 'square' | 'small square';

export interface StrictAdvertisementProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Center the advertisement. */
  centered?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Text to be displayed on the advertisement. */
  test?: boolean | string | number;

  /** Varies the size of the advertisement. */
  unit: AdvertisementUnit;
}

/**
 * An ad displays third-party promotional content.
 */
export const Advertisement: React.FC<AdvertisementProps> = ({ as: ElementType = 'div', centered, children, className, content, test, unit, ...rest }) => (
  <ElementType {...rest} className={getClassName('ui', unit, { centered, test } as any, 'ad', className)} data-text={test}>
    {Children.count(children) ? children : content}
  </ElementType>
);
