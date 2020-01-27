import React, {FC} from 'react'

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

const BreadcrumbListItem: FC<BreadcrumbListItemProps> = (props: BreadcrumbListItemProps) => {
    return (
        <li className="govuk-breadcrumbs__list-item" key={props.visibleText}>
            <a className="govuk-breadcrumbs__link" href={props.href}>{props.visibleText}</a>
        </li>
    );
};

const BreadcrumbCurrentItem: FC<BreadcrumbCurrentProps> = (props: BreadcrumbCurrentProps) => {
    return (
        <li className="govuk-breadcrumbs__list-item" aria-current="page" key={props.visibleText}>{props.visibleText}</li>
    );
};

export const BreadcrumbList: FC<BreadcrumbListProps> = (props: BreadcrumbListProps) => {
    return (
        <div className="govuk-breadcrumbs">
            <ol className="govuk-breadcrumbs__list">
                {props.parentItems.map((item, index) =>
                    <BreadcrumbListItem key={index} {...item}/>
                )}
                <BreadcrumbCurrentItem {...props.currentItem}/>
            </ol>
        </div>
    );
};
