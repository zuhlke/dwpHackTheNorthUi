import React, {Dispatch, FC} from 'react';
import {useParams} from 'react-router-dom';
import {BreadcrumbCurrentProps, BreadcrumbListItemProps, BreadcrumbListProps} from '../common/Breadcrumb/Breadcrumb';
import {MainContent} from '../common/Content/MainContent';
import {Question} from './Question/Question';
import {InMemoryQuestionRepository, QuestionRepository} from './Question/QuestionRepo';
import {UndefinedQuestion} from "./UndefinedQuestion";
import {DefinedQuestion} from "./DefinedQuestion";
import {QuestionState, ReducerState, StoreActions, storeQuestions} from "../reducers/Reducer";
import {useDispatch, useSelector} from "react-redux";

function getQuestionFromArray(questionId: string | undefined, listOfQuestions: Question[]): Question| undefined {
    let result: Question | undefined = undefined;
    if (questionId !== undefined) {
        const potentialNumber: number = parseInt(questionId);

        if (!isNaN(potentialNumber)) {
            for (const question of listOfQuestions) {
                if (question.getId() === potentialNumber) {
                    result = question;
                    break;
                }
            }
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
    const dispatch: Dispatch<StoreActions> = useDispatch();
    const questionState: QuestionState = useSelector((state: ReducerState) => state.questions);
    const question: Question | undefined = getQuestionFromArray(questionId, questionState.questions);
    if (questionState.questions.length === 0) {
        const questionRepo: QuestionRepository = InMemoryQuestionRepository.createDefaultInstance();
        dispatch(storeQuestions(questionRepo.getAll()));
    }

    return (
        <MainContent breadcrumbData={getPageBreadcrumbProps(question)}
            reactiveContent = {question === undefined ?
                                  <UndefinedQuestion/> :
                                  <DefinedQuestion question={question}/>
                              } />
    );
};
