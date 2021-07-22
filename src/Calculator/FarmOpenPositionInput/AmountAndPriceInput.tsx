import {Col, Row} from "antd";
import React from "react";
import PriceInputRow from "./PriceInputRow";
import {useRecoilState} from "recoil";
import {farmInputState} from "../../Store";
import InputTitle from "./InputTitle";

const AmountAndPriceInput = (props: { assets: string[] }) => {
    const [farmInput, setFarmInput] = useRecoilState(farmInputState);
    return (
        <>
            <InputTitle content={"How much would you like to add for farming?"} size={"l"}/>
            {
                [0, 1].map(index => (
                    <PriceInputRow asset={props.assets[index]}
                                   amount={farmInput.assetDetails[index].amount}
                                   key={`price-input-${index}`}
                                   setAmount={amount => setFarmInput(old => {
                                       const details = [...old.assetDetails];
                                       details[index] = {...details[index], amount}
                                       return ({...old, assetDetails: details})
                                   })}
                                   price={farmInput.assetDetails[index].price}
                                   setPrice={price => setFarmInput(old => {
                                       const details = [...old.assetDetails];
                                       details[index] = {...details[index], price}
                                       return ({...old, assetDetails: details});
                                   })}
                    />
                ))
            }
        </>
    )
}
export default AmountAndPriceInput;