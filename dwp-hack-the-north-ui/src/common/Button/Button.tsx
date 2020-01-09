import * as React from 'react';

interface IButtonProps {
    text: string,
    onClick: (event: any) => void
}

const Button = (props:IButtonProps) => (
    <button onClick={props.onClick}>
        <span>
            {props.text}
        </span>
    </button>
);

export default Button;
