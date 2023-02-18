import React from 'react';
import {IContent, IQuestion} from "../../interfaces";
import QuestionBlock from "./QuestionBlock";

type QuestionsBlockProps = {
    quizItem: IContent
    chosenAnswerItems: string[]
    unansweredQuestionIds: number[] | undefined
    setChosenAnswerItems: Function
    setUnansweredQuestionIds: Function
}

const QuestionsBlock: React.FC<QuestionsBlockProps> = ({
                                                           quizItem,
                                                           setChosenAnswerItems,
                                                           setUnansweredQuestionIds,
                                                           unansweredQuestionIds,
                                                           chosenAnswerItems
                                                       }) => {
    return (
        <>
            <h2 className={"title-block"} id={String(quizItem.id)}>{quizItem.text}</h2>
            <div className={"questions-container"}>
                {quizItem?.questions.map((question: IQuestion, index) =>
                    <QuestionBlock
                        key={index}
                        quizItemId={quizItem.id}
                        question={question}
                        chosenAnswerItems={chosenAnswerItems}
                        unansweredQuestionIds={unansweredQuestionIds}
                        setChosenAnswerItems={setChosenAnswerItems}
                        setUnansweredQuestionIds={setUnansweredQuestionIds}
                    />
                )}
            </div>
        </>
    );
};

export default QuestionsBlock;