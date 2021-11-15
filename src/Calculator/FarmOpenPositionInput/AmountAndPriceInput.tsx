import React from 'react';
import PriceInputRow from './PriceInputRow';
import { SetterOrUpdater } from 'recoil';
import InputTitle from './InputTitle';
import { FarmInput } from 'Calculator/type';

const AmountAndPriceInput = (props: {
  assets: string[];
  setFarmInput: SetterOrUpdater<FarmInput | undefined>;
  farmInput?: FarmInput;
  title?: string;
}) => {
  const { farmInput, setFarmInput } = props;
  return (
    <>
      <InputTitle content={props.title ?? 'How much would you like to add for farming?'} size={'l'} />
      {farmInput &&
        [0, 1].map((index) => (
          <PriceInputRow
            asset={props.assets[index]}
            amount={farmInput.assetDetails[index].amount}
            key={`price-input-${index}`}
            setAmount={(amount) =>
              setFarmInput((old) => {
                const details = [...old!.assetDetails];
                details[index] = { ...details[index], amount };
                return { ...old!, assetDetails: details };
              })
            }
            price={farmInput.assetDetails[index].price}
            setPrice={(price) =>
              setFarmInput((old) => {
                const details = [...old!.assetDetails];
                details[index] = { ...details[index], price };
                return { ...old!, assetDetails: details };
              })
            }
          />
        ))}
    </>
  );
};
export default AmountAndPriceInput;
