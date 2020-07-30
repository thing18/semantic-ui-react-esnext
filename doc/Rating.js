import React, { useState } from 'react';

export const RatingExampleClearable=({ lib: { Rating } }) => <Rating maxRating={5} clearable />;

export const RatingExampleStar=({ lib: { Rating } }) => (
    <Rating icon='star' defaultRating={3} maxRating={4} />
);

export const RatingExampleHeart=({ lib: { Rating } }) => (
    <Rating icon='heart' defaultRating={1} maxRating={3} />
)

export const RatingExampleOnRate=({ lib: { Rating } }) => {

    const [state, setState]=useState({});

    const handleRate=(e, { rating, maxRating }) => setState({ rating, maxRating });

    return (
        <div>
            <Rating maxRating={5} onRate={handleRate} />
            <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
    )
};

export const RatingExampleSize=({ lib: { Rating } }) => (
    <div>
        <Rating maxRating={5} defaultRating={3} icon='star' size='mini' />
        <br />
        <br />

        <Rating maxRating={5} defaultRating={3} icon='star' size='tiny' />
        <br />
        <br />

        <Rating maxRating={5} defaultRating={3} icon='star' size='small' />
        <br />
        <br />

        <Rating maxRating={5} defaultRating={3} icon='star' />
        <br />
        <br />

        <Rating maxRating={5} defaultRating={3} icon='star' size='large' />
        <br />
        <br />

        <Rating maxRating={5} defaultRating={3} icon='star' size='huge' />
        <br />
        <br />

        <Rating maxRating={5} defaultRating={3} icon='star' size='massive' />
        <br />
        <br />
    </div>
);

export const RatingExampleControlled=({ lib: { Rating } }) => {

    const [state, setState]=useState(0);

    const handleChange=(e) => setState(e.target.value);

    return (
        <div>
            <div>Rating: {state}</div>
            <input
                type='range'
                min={0}
                max={5}
                value={state}
                onChange={handleChange}
            />
            <br />
            <Rating rating={state} maxRating={5} />
        </div>
    )
};
