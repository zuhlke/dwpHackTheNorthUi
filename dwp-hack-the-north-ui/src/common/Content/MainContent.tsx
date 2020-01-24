import {BreadcrumbList, BreadcrumbListProps} from '../Breadcrumb/Breadcrumb';
import React, {FC, ReactElement} from 'react';

export interface MainContentData {
    breadcrumbData: BreadcrumbListProps;
    reactiveContent: ReactElement;
}

export const MainContent: FC<MainContentData> = (contentData: MainContentData) => {
    return (
        <div className="govuk-width-container">
            <BreadcrumbList parentItems={contentData.breadcrumbData.parentItems}
                            currentItem={contentData.breadcrumbData.currentItem} />
            <main className="govuk-main-wrapper " id="main-content" role="main">
                <div className="govuk-grid-row">
                    <div className="govuk-grid-column-two-thirds">
                        {contentData.reactiveContent}
                    </div>
                </div>
            </main>
        </div>
    );
};
