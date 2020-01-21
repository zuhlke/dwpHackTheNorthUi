import React from 'react'
import { ReactElement } from 'react';

export interface BreadcrumbListItemProps extends BreadcrumbCurrentProps {
    href: string;
}

export interface BreadcrumbCurrentProps {
    visibleText: string;
}

export interface BreadcrumbListProps {
    parentItems: BreadcrumbListItemProps[];
    currentItem: BreadcrumbCurrentProps;
}

export const BreadcrumbListItem = (props: BreadcrumbListItemProps): ReactElement => {
    return (
        <li className="govuk-breadcrumbs__list-item" key={props.visibleText}>
            <a className="govuk-breadcrumbs__link" href={props.href}>{props.visibleText}</a>
        </li>
    );
};

export const BreadcrumbCurrentItem = (props: BreadcrumbCurrentProps): ReactElement => {
    return (
        <li className="govuk-breadcrumbs__list-item" aria-current="page" key={props.visibleText}>{props.visibleText}</li>
    );
};

export const BreadcrumbList = (props: BreadcrumbListProps): ReactElement => {
    const breadcrumbParents: ReactElement[] = [];
    
    props.parentItems.forEach((element) => {
        breadcrumbParents.push(BreadcrumbListItem(element));
    });
    breadcrumbParents.push(BreadcrumbCurrentItem(props.currentItem));

    return (
        <div className="govuk-breadcrumbs">
            <ol className="govuk-breadcrumbs__list">
                {breadcrumbParents}
            </ol>
        </div>
    );

};