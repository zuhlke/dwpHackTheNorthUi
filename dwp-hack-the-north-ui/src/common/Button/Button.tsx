import {ReactElement} from "react";
import * as React from 'react';

interface ButtonProps {
    text: string;
    onClick: () => void;
    arrow: boolean;
}

const Button = (props: ButtonProps): ReactElement => (
    <button className="govuk-button" data-module="govuk-button" onClick={props.onClick}>
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

export default Button;
