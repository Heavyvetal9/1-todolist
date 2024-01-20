import React from 'react';

type TopCarsType = {
    cars: Array<CarsType>
}

type CarsType = {
    id: number,
    manufacturer: string,
    model: string
}

export const TopCars = (props: TopCarsType) => {

    return (
        <ul>
            {props.cars.map((objectCarsArray, index)=> {
                return (
                    <li key={objectCarsArray.id}>
                      <span>{objectCarsArray.manufacturer}</span>
                      <span> model {objectCarsArray.model}</span>
                    </li>
                )

            })}
        </ul>
    );
};