import React from 'react';

import { createShorthandFactory, FCX } from '../../lib';
import { Image, StrictImageProps } from '..';

interface ItemImageProps extends StrictItemImageProps { }

interface StrictItemImageProps extends StrictImageProps { }

/**
 * An item can contain an image.
 */
const ItemImage: FCX<ItemImageProps> = ({ size, ...rest }) => <Image {...rest} size={size} ui={!!size} wrapped />;

ItemImage.create = createShorthandFactory(ItemImage, (src) => ({ src } as any));

export { ItemImage, ItemImageProps, StrictItemImageProps };
