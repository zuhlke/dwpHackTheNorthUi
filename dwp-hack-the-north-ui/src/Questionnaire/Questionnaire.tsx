import React, {FC} from 'react';
import {useParams} from 'react-router-dom';
import {BreadcrumbCurrentProps, BreadcrumbListItemProps, BreadcrumbListProps} from '../common/Breadcrumb/Breadcrumb';
import {MainContent} from '../common/Content/MainContent';
import {Question} from './Question/Question';
import {InMemoryQuestionRepository, QuestionRepository} from './Question/QuestionRepo';
import {UndefinedQuestion} from "./UndefinedQuestion";
import {DefinedQuestion} from "./DefinedQuestion";

const questionRepo: QuestionRepository = InMemoryQuestionRepository.createDefaultInstance();

function getQuestionFromArray(questionId: string | undefined): Question | undefined {
    let result: Question | undefined = undefined;
    if (questionId !== undefined) {
        const potentialNumber: number = parseInt(questionId);

        if (!isNaN(potentialNumber)) {
            result = questionRepo.get(potentialNumber);
        }
    }
    return result;
}

function getPageBreadcrumbProps(question: Question | undefined): BreadcrumbListProps {
    const currentQuestion: string = (question === undefined) ? "Unknown Question" : "Question " + question.getId();
    const navCurrentProps: BreadcrumbCurrentProps = { visibleText: currentQuestion };
    const navParentProps: BreadcrumbListItemProps[] = [
        { href: "/", visibleText: "Home: Loan Calculator" },
        { href: "/Questionnaire/1", visibleText: "Questionnaire" },
    ];

    return {parentItems: navParentProps, currentItem: navCurrentProps};
}

export const Questionnaire: FC = () => {
    const {questionId} = useParams();
    const question: Question | undefined = getQuestionFromArray(questionId);

    return (
        <MainContent breadcrumbData={getPageBreadcrumbProps(question)}
            reactiveContent = {question === undefined ?
                                  <UndefinedQuestion/> :
                                  <DefinedQuestion question={question}/>
                              } />
    );
};
