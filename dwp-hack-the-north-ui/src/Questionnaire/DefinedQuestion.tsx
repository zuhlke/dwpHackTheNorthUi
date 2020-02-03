import React, {Dispatch, FC, useState} from "react";
import {Button} from "../common/Button/Button";
import {Question} from './Question/Question';
import {History} from "history";
import {useHistory} from "react-router-dom";
import {InMemoryQuestionRepository, QuestionRepository} from "./Question/QuestionRepo";
import {useDispatch} from "react-redux";
import {loanAmount, loanInterest, LoanSegmentActions, loanTime} from "../reducers/UserInputReducer";

const questionRepo: QuestionRepository = InMemoryQuestionRepository.createDefaultInstance();
const questionCount = questionRepo.getQuestionCount();

interface QuestionProps {
    question: Question;
}

const handleTextChange = (userInput: string,
                          setValue: (value: string) => void): void => {
    setValue(userInput);
};

function generateLoanSegment(questionId: number, userInput: string): LoanSegmentActions | undefined {
    let result: LoanSegmentActions | undefined = undefined;

    switch (questionId) {
        case 1:
            result = loanAmount(userInput);
            break;
        case 2:
            result = loanInterest(userInput);
            break;
        case 3:
            result = loanTime(userInput);
            break;
        default:
            break;
    }

    return result;
}

const handleQuestionResponse = (question: Question,
                                value: string,
                                setValue: (value: string) => void,
                                dispatch: Dispatch<LoanSegmentActions>,
                                history: History): void => {
    const loanSegment: LoanSegmentActions | undefined = generateLoanSegment(question.getId(), value);
    if (loanSegment !== undefined) {
        setValue("");
        dispatch(loanSegment);
    }
    if (question.getId() === questionCount) {
        history.push("/Result");
    } else {
        const nextPage: string = '/Questionnaire/' + (question.getId() + 1).toString();
        history.push(nextPage);
    }
};

export const DefinedQuestion: FC<QuestionProps> = (props: QuestionProps) => {
    const dispatch: Dispatch<LoanSegmentActions> = useDispatch();
    const history: History = useHistory();
    const [value, setValue] = useState("");
    return (
        <div>
            <span className="govuk-caption-xl">Question {props.question.getId()} of {questionCount}</span>
            <h1 className="govuk-heading-x1">{props.question.getQuestionString()}</h1>
            <br />
            <form>
                <input className="govuk-input govuk-input--width-10"
                       type="text"
                       value={value}
                       onChange={(text): void => handleTextChange(text.target.value, setValue)}/>
                <br /><br /><br />
                <Button text="Continue" onClick={(): void => handleQuestionResponse(props.question, value, setValue, dispatch, history)} arrow={false}/>
            </form>
        </div>
    );
};
