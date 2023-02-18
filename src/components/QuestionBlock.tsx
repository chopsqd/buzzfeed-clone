import React from 'react';
import {IQuestion} from "../../interfaces";

type QuestionBlockProps = {
    question: IQuestion
    quizItemId: number
    chosenAnswerItems: string[]
    unansweredQuestionIds: number[] | undefined
    setChosenAnswerItems: Function
    setUnansweredQuestionIds: Function
}

const QuestionBlock: React.FC<QuestionBlockProps> = ({
                                                         question,
                                                         setChosenAnswerItems,
                                                         setUnansweredQuestionIds,
                                                         quizItemId,
                                                         unansweredQuestionIds,
                                                         chosenAnswerItems
                                                     }) => {
    const handleClick = () => {
        setChosenAnswerItems((prevState: string[]) => [...prevState, question.text])
        setUnansweredQuestionIds(unansweredQuestionIds?.filter((id: number) => id !== quizItemId))
    }

    const validPick = !chosenAnswerItems?.includes(question.text) && !unansweredQuestionIds?.includes(quizItemId)

    return (
        <button
            className={"question-block"}
            onClick={handleClick}
            disabled={validPick}
        >
            <img src={question.image} alt={question.alt}/>
            <h3>{question.text}</h3>
            <p>
                <a href={question.image}>{question.credit}  </a>
                <a href="https://www.unsplash.com"> Unsplash</a>
            </p>
        </button>
    );
};

export default QuestionBlock;