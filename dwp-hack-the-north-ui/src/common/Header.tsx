import React, { FC } from 'react'
import logo from "govuk-frontend/govuk/assets/images/govuk-logotype-crown.png";

export const Header: FC = () => {
    return (
        <header className="govuk-header" role="banner" data-module="govuk-header">
            <div className="govuk-header__container govuk-width-container">
                <div className="govuk-header__logo">
                    <a href="/" className="govuk-header__link govuk-header__link--homepage">
                        <img alt="logo" src={logo} className="govuk-header__logotype-crown-fallback-image" width="36"
                             height="32"></img>
                        <span className="govuk-header__logotype-text"> GOV.UK </span>
                    </a>
                </div>
                <div className="govuk-header__content">
                    <a href="/" className="govuk-header__link govuk-header__link--service-name">
                        DWP Hack the North 4.0
                    </a>
                </div>
            </div>
        </header>
    )
};
