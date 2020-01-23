import { FC, MouseEvent } from 'react';
import React from 'react';

interface ButtonProps {
    text: string;
    onClick: () => void;
    arrow: boolean;
}

const handleClick = (event: MouseEvent<HTMLButtonElement>, props: ButtonProps): void => {
    event.preventDefault();
    props.onClick();
};

export const Button: FC<ButtonProps> = (props: ButtonProps) => {
    return (
        <button className="govuk-button" data-module="govuk-button" onClick={event => handleClick(event, props)}>
            <span>
                {props.text}
                {props.arrow &&
                <svg className="govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="19"
                     viewBox="0 0 33 40" role="presentation" focusable="false">
                    <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z"/>
                </svg>
                }
            </span>
        </button>
    );
};
