import React, {Dispatch, FC, useState} from "react";
import {Button} from "../common/Button/Button";
import {Question} from './Question/Question';
import {History} from "history";
import {useHistory} from "react-router-dom";
import {InMemoryQuestionRepository, QuestionRepository} from "./Question/QuestionRepo";
import {useDispatch} from "react-redux";
import {recordLoanAmount, recordLoanInterest, RecordLoanActions, recordLoanTime} from "../reducers/AnswerReducer";

const questionRepo: QuestionRepository = InMemoryQuestionRepository.createDefaultInstance();
const questionCount = questionRepo.getQuestionCount();

interface QuestionProps {
    question: Question;
}

const handleTextChange = (userInput: string,
                          setValue: (value: string) => void): void => {
    setValue(userInput);
};

function generateLoanSegment(questionId: number, userInput: string): RecordLoanActions | undefined {
    let result: RecordLoanActions | undefined = undefined;

    switch (questionId) {
        case 1:
            result = recordLoanAmount(userInput);
            break;
        case 2:
            result = recordLoanInterest(userInput);
            break;
        case 3:
            result = recordLoanTime(userInput);
            break;
        default:
            break;
    }

    return result;
}

const handleQuestionResponse = (question: Question,
                                value: string,
                                setValue: (value: string) => void,
                                dispatch: Dispatch<RecordLoanActions>,
                                history: History): void => {
    const loanSegment: RecordLoanActions | undefined = generateLoanSegment(question.getId(), value);
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
    const dispatch: Dispatch<RecordLoanActions> = useDispatch();
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
