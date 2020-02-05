import React, {FC, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {BreadcrumbCurrentProps, BreadcrumbListItemProps, BreadcrumbListProps} from '../common/Breadcrumb/Breadcrumb';
import {MainContent} from '../common/Content/MainContent';
import {Question} from './Question/Question';
import {UndefinedQuestion} from "./UndefinedQuestion";
import {DefinedQuestion} from "./DefinedQuestion";
import {useDispatch, useSelector} from "react-redux";
import {QuestionState, QuestionActions} from "../reducers/QuestionReducer";
import {ReducerState} from "../reducers/Reducer";
import {getQuestions} from "./QuestionnaireActions";
import {Dispatch} from "redux";
import Loader from "react-loader-spinner"

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

function getPageBreadcrumbProps(question: Question | undefined, busy: boolean): BreadcrumbListProps {
    const currentQuestion: string = busy ? "Retrieving questions" : question === undefined ? "Unknown Question" : "Question " + question.getId();
    const navCurrentProps: BreadcrumbCurrentProps = { visibleText: currentQuestion };
    const navParentProps: BreadcrumbListItemProps[] = [
        { href: "/", visibleText: "Home: Loan Calculator" },
        { href: "/Questionnaire/1", visibleText: "Questionnaire" },
    ];

    return {parentItems: navParentProps, currentItem: navCurrentProps};
}

export const Questionnaire: FC = () => {
    const {questionId} = useParams();
    const dispatch: Dispatch<QuestionActions> = useDispatch();
    const questionState: QuestionState = useSelector((state: ReducerState) => state.questions);
    const question: Question | undefined = getQuestionFromArray(questionId, questionState.questions);
    useEffect(() => getQuestions(dispatch), [dispatch]);

    return (
        <MainContent breadcrumbData={getPageBreadcrumbProps(question, questionState.busy)}
            reactiveContent = {questionState.busy ?
                                  <Loader type="ThreeDots"/>
                               : question === undefined ?
                                  <UndefinedQuestion/> :
                                  <DefinedQuestion question={question}/>
                              } />
    );
};
