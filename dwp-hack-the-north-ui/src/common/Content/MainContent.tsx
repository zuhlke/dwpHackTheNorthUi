import { BreadcrumbList, BreadcrumbListProps } from '../Breadcrumb/Breadcrumb';
import { ReactElement } from 'react';
import React from 'react';

export interface MainContentData {
    breadcrumbData: BreadcrumbListProps;
    reactiveContent: ReactElement;
}

export const MainContent = (contentData: MainContentData): ReactElement => {
    return (
        <div className="govuk-width-container">
            <BreadcrumbList parentItems={contentData.breadcrumbData.parentItems} currentItem={contentData.breadcrumbData.currentItem} />
            <main className="govuk-main-wrapper " id="main-content" role="main">
                <div className="govuk-grid-row">
                    <div className="govuk-grid-column-two-thirds">
                        {contentData.reactiveContent}
                    </div>
                </div>
            </main>
        </div>
    );
}