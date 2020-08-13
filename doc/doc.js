import React from 'react';

export const Example=({ item: Component, header, lib, lib: { Divider } }) => (

    <>
        <Divider />
        <h3>{header}</h3>
        <Component lib={lib} />
    </>
);
