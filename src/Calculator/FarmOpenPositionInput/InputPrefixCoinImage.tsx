import {getCoinUrl} from "../utils";
import React from "react";

const InputPrefixCoinImage = (props: {coin: string}) => (
    <div>
        <img src={getCoinUrl(props.coin)}
             className={"c-input__prefix c-input__prefix--d hidden lg:flex"}/>
        <img src={getCoinUrl(props.coin)}
             className={"c-input__prefix c-input__prefix--m bg-white lg:hidden"}/>
    </div>
)

export default InputPrefixCoinImage;