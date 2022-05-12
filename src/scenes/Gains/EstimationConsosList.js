import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import DrinksCategory from '../../components/DrinksCategory';
import { Container, MarginBottom, ModalContent } from '../AddDrink/styles';
import { drinksCatalog } from '../ConsoFollowUp/drinksCatalog';
import { estimationDrinksPerWeekState } from './recoil';

const EstimationConsosList = () => {
  const [estimationDrinksPerWeek, setEstimationDrinksPerWeek] = useRecoilState(estimationDrinksPerWeekState);

  const scrollRef = useRef(null);

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
