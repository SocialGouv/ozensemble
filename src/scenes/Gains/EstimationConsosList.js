import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DrinksCategory from '../../components/DrinksCategory';
import {
    drinksCatalog,
} from '../ConsoFollowUp/drinksCatalog';
import {
    Container,
    ModalContent,
    MarginBottom,
} from '../AddDrink/styles';
import useStateWithAsyncStorage from '../../hooks/useStateWithAsyncStorage';

const EstimationConsosList = ({ }) => {
    const [estimationDrinksPerWeek, setEstimationDrinksPerWeek] = useStateWithAsyncStorage("@GainEstimationDrinksPerWeek", []);
    const scrollRef = React.useRef(null);

    const setDrinkQuantityRequest = (drinkKey, quantity) => {
        const oldDrink = estimationDrinksPerWeek.find((drink) => drink.drinkKey === drinkKey);

        if (oldDrink) {
            setEstimationDrinksPerWeek([
                ...estimationDrinksPerWeek.filter((drink) => drink.drinkKey !== drinkKey),
                {
                    ...estimationDrinksPerWeek.find((drink) => drink.drinkKey === drinkKey),
                    quantity,
                },
            ]);
        } else {
            setEstimationDrinksPerWeek([
                ...estimationDrinksPerWeek,
                {
                    drinkKey,
                    quantity,
                    id: uuidv4(),
                },
            ]);
        }
    };

    return (
        <Container>
            <ModalContent ref={scrollRef} disableHorizontal>
                {drinksCatalog
                    .map(({ categoryKey }) => categoryKey)
                    .filter((categoryKey, index, categories) => categories.indexOf(categoryKey) === index)
                    .map((category, index) => (
                        <DrinksCategory
                            key={category}
                            drinksCatalog={drinksCatalog}
                            category={category}
                            index={index}
                            drinks={estimationDrinksPerWeek}
                            setDrinkQuantity={setDrinkQuantityRequest}
                        />
                    ))}
                <MarginBottom />
            </ModalContent>
        </Container>
    );
};


export default EstimationConsosList;
