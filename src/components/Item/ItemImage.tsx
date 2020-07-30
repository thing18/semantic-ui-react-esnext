import React from 'react';

import { createShorthandFactory, FCX } from '../../lib';
import { Image, StrictImageProps } from '../Image';

export interface ItemImageProps extends StrictItemImageProps { }

export interface StrictItemImageProps extends StrictImageProps { }

/**
 * An item can contain an image.
 */
export const ItemImage: FCX<ItemImageProps> = ({ size, ...rest }) => <Image {...rest} size={size} ui={!!size} wrapped />;

ItemImage.create = createShorthandFactory(ItemImage, (src) => ({ src } as any));
