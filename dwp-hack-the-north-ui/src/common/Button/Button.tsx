import {ReactElement} from "react";
import * as React from 'react';

interface ButtonProps {
    text: string;
    onClick: () => void;
}

const Button = (props: ButtonProps): ReactElement => (
    <button onClick={props.onClick}>
        <span>
            {props.text}
        </span>
    </button>
);

export default Button;
