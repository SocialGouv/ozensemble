import { View, Text, TouchableOpacity } from 'react-native';
import { strategyCatalogObject, getDisplayName } from '../../reference/strategyCatalog';

const StrategyButton = ({ name, strategyElements, setStrategyElement, multipleChoice }) => {
  return (
    <TouchableOpacity
      className={[
        'bg-[#FFFFFF]  rounded-3xl px-3.5 py-3 m-1.5',
        strategyElements.includes(name) ? 'bg-[#4030A5] border border-[#4030A5]' : 'border border-[#4030A5] bg-white',
      ].join(' ')}
      onPress={() => {
        if (!multipleChoice) {
          setStrategyElement((prevStrategyElements) => {
            if (prevStrategyElements.includes(name)) {
              return [];
            }
            return [name];
          });
        } else {
          setStrategyElement((prevStrategyElements) => {
            const newStrategyElements = [...prevStrategyElements];
            const index = newStrategyElements.indexOf(name);
            if (index !== -1) {
              newStrategyElements.splice(index, 1);
            } else {
              newStrategyElements.push(name);
            }
            return newStrategyElements;
          });
        }
      }}>
      <Text
        className={['font-extrabold', strategyElements.includes(name) ? 'color-white' : 'text-[#4030A5]'].join(' ')}>
        {getDisplayName(name, strategyCatalogObject)}
      </Text>
    </TouchableOpacity>
  );
};

export default StrategyButton;
