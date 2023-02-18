import React, {forwardRef, useEffect, useState} from 'react';
import {IAnswer} from "../../interfaces";

const AnswerBlock = ({
                         answerOptions,
                         chosenAnswerItems
                    }: {
                        answerOptions: IAnswer[] | undefined
                        chosenAnswerItems: string[]
                    },
                     ref: React.LegacyRef<HTMLHeadingElement> | undefined) => {
    const [result, setResult] = useState<IAnswer | null>()

    useEffect(() => {
        answerOptions?.forEach((answer: IAnswer) => {
            if (chosenAnswerItems.includes(answer.combination[0]) &&
                chosenAnswerItems.includes(answer.combination[1]) &&
                chosenAnswerItems.includes(answer.combination[2])) {
                setResult(answer)
            }
        })
    }, [chosenAnswerItems])

    return (
        <div ref={ref} className={"answer-block"}>
            <h2>{result?.text}</h2>
            <img src={result?.image} alt={result?.text}/>
        </div>
    );
};

export default forwardRef(AnswerBlock);