import React, {forwardRef} from 'react';
import {IContent, IQuestion} from "../../interfaces";
import QuestionBlock from "./QuestionBlock";

const QuestionsBlock = ({
                            quizItem,
                            setChosenAnswerItems,
                            setUnansweredQuestionIds,
                            unansweredQuestionIds,
                            chosenAnswerItems
                        }: {
                            quizItem: IContent
                            chosenAnswerItems: string[]
                            unansweredQuestionIds: number[] | undefined
                            setChosenAnswerItems: Function
                            setUnansweredQuestionIds: Function
                        },
                        ref: React.LegacyRef<HTMLHeadingElement> | undefined) => {
    return (
        <>
            <h2 className={"title-block"} ref={ref}>{quizItem.text}</h2>
            <div className={"questions-container"}>
                {quizItem?.questions.map((question: IQuestion, index: number) =>
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

export default forwardRef(QuestionsBlock);