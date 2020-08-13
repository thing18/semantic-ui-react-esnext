import React, { useState, useEffect, Children } from 'react';

import { HtmlIframeProps, SemanticShorthandContent, SemanticShorthandItem, createHTMLIframe, getClassName } from '../../lib';
import { IconProps, Icon } from '../Icon';

export interface EmbedProps extends StrictEmbedProps {
  [key: string]: any;
}

export interface StrictEmbedProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** An embed can be active. */
  active?: boolean;

  /** An embed can specify an alternative aspect ratio. */
  aspectRatio?: '4:3' | '16:9' | '21:9';

  /** Setting to true or false will force autoplay. */
  autoplay?: boolean;

  /** Whether to show networks branded UI like title cards, or after video calls to action. */
  brandedUI?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Specifies a default chrome color with Vimeo or YouTube. */
  color?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Initial value of active. */
  defaultActive?: boolean;

  /** Whether to prefer HD content. */
  hd?: boolean;

  /** Specifies an icon to use with placeholder content. */
  icon?: SemanticShorthandItem<IconProps>;

  /** Specifies an id for source. */
  id?: string;

  /** Shorthand for HTML iframe. */
  iframe?: SemanticShorthandItem<HtmlIframeProps>;

  /**
   * Сalled on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>, data: EmbedProps) => void;

  /** A placeholder image for embed. */
  placeholder?: string;

  /** Specifies a source to use. */
  source?: 'youtube' | 'vimeo';

  /** Specifies a url to use for embed. */
  url?: string;
}

/**
 * An embed displays content from other websites like YouTube videos or Google Maps.
 */
export const Embed: React.FC<EmbedProps> = props => {

  const {
    as: ElementType = 'div', id, active, defaultActive, onClick, children, content, iframe, autoplay, brandedUI, color,
    hd, source, url, aspectRatio, className, icon = 'video play', placeholder,
    ...rest } = props;

  const [__active, __setActive] = useState<boolean>();

  useEffect(
    () => { __setActive(active ?? defaultActive ?? false); },
    [active],
  );

  // static autoControlledProps = ['active'];
  const handleClick = (e: any) => {

    if (onClick) onClick(e, { ...props, active: true });
    if (!__active) __setActive(true);
  };

  const classes = getClassName('ui', aspectRatio, { active: __active }, 'embed', className);

  return (
    <ElementType {...rest} className={classes} onClick={handleClick}>
      {Icon.create(icon, { autoGenerateKey: false })}
      {placeholder && <img className='placeholder' src={placeholder} />}
      {renderEmbed(props, __active)}
    </ElementType>
  );
};

const getSrc = ({ autoplay = true, brandedUI = false, color = '#444444', hd = true, id, source, url }: EmbedProps) => {

  switch (source) {

    case 'youtube':
      return `//www.youtube.com/embed/${id}?autohide=true&amp;autoplay=${autoplay}&amp;color=${encodeURIComponent(color)}&amp;hq=${hd}&amp;jsapi=false&amp;modestbranding=${brandedUI}&amp;rel=${brandedUI ? 0 : 1}`;

    case 'vimeo':
      return `//player.vimeo.com/video/${id}?api=false&amp;autoplay=${autoplay}&amp;byline=false&amp;color=${encodeURIComponent(color)}&amp;portrait=false&amp;title=false`;

    default:
      return url;
  }
};

const renderEmbed = (props: EmbedProps, active?: boolean) => {

  if (!active) return null;

  const { children, content, iframe, source } = props;

  if (Children.count(children)) return <div className='embed'>{children}</div>;
  if (content != null) return <div className='embed'>{content}</div>;

  return (
    <div className='embed'>
      {createHTMLIframe(iframe == null ? getSrc(props) : iframe, {
        defaultProps: {
          allowFullScreen: false,
          frameBorder: 0,
          height: '100%',
          scrolling: 'no',
          src: getSrc(props),
          title: `Embedded content from ${source}.`,
          width: '100%',
        },
        autoGenerateKey: false,
      })}
    </div>
  );
};
