import React, {useEffect, useState, createRef} from 'react';
import Title from './components/Title'
import QuestionsBlock from "./components/QuestionsBlock";
import {IContent, IQuizData} from "../interfaces";
import AnswerBlock from "./components/AnswerBlock";

const App = () => {
    const [quiz, setQuiz] = useState<IQuizData | null>()
    const [chosenAnswerItems, setChosenAnswerItems] = useState<string[]>([])
    const [unansweredQuestionIds, setUnansweredQuestionIds] = useState<number[] | undefined>([])
    const [showAnswer, setShowAnswer] = useState<boolean>(false)

    const refs = unansweredQuestionIds?.reduce<any>((acc, id) => {
        acc[id] = createRef<HTMLDivElement | null>()
        return acc
    }, {})

    const answerRef = createRef<HTMLDivElement | null>()

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/quiz-item')
            const json = await response.json()
            setQuiz(json)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        const unansweredIds = quiz?.content?.map(({id}: IContent) => id)
        setUnansweredQuestionIds(unansweredIds)
    }, [quiz])

    useEffect(() => {
        if(chosenAnswerItems.length > 0 && unansweredQuestionIds) {
            if(showAnswer && answerRef.current) {
                answerRef.current.scrollIntoView({behavior: 'smooth'})
            }

            if(unansweredQuestionIds.length <= 0 && chosenAnswerItems.length >= 1) {
                setShowAnswer(true)
            } else {
                const highestId = Math.min(...unansweredQuestionIds)
                refs[highestId].current.scrollIntoView({behavior: 'smooth'})
            }
        }
    }, [unansweredQuestionIds, chosenAnswerItems.length, showAnswer, answerRef.current, refs])

    return (
        <div>
            <Title title={quiz?.title} subtitle={quiz?.subtitle}/>
            {refs && quiz?.content.map((content: IContent) =>
                <QuestionsBlock
                    key={content.id}
                    quizItem={content}
                    chosenAnswerItems={chosenAnswerItems}
                    setChosenAnswerItems={setChosenAnswerItems}
                    setUnansweredQuestionIds={setUnansweredQuestionIds}
                    unansweredQuestionIds={unansweredQuestionIds}
                    ref={refs[content.id]}
                />
            )}
            {showAnswer &&
                <AnswerBlock
                    answerOptions={quiz?.answers}
                    chosenAnswerItems={chosenAnswerItems}
                    ref={answerRef}
                />}
        </div>
    );
}

export default App;
