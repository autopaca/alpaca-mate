import React from "react";

const InputSuffixText = (props: {coin: string}) => (
    <span className={"c-input__suffix"}>{props.coin.toUpperCase()}</span>
)

export default InputSuffixText;