import React, {useEffect, useState} from 'react';
import Title from './components/Title'
import QuestionsBlock from "./components/QuestionsBlock";
import {IContent, IQuizData} from "../interfaces";

const App = () => {
    const [quiz, setQuiz] = useState<IQuizData | null>()
    const [chosenAnswerItems, setChosenAnswerItems] = useState<string[]>([])
    const [unansweredQuestionIds, setUnansweredQuestionIds] = useState<number[] | undefined>([])

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

    return (
        <div>
            <Title title={quiz?.title} subtitle={quiz?.subtitle}/>
            {quiz?.content.map((content: IContent) =>
                <QuestionsBlock
                    key={content.id}
                    quizItem={content}
                    chosenAnswerItems={chosenAnswerItems}
                    setChosenAnswerItems={setChosenAnswerItems}
                    setUnansweredQuestionIds={setUnansweredQuestionIds}
                    unansweredQuestionIds={unansweredQuestionIds}
                />
            )}
        </div>
    );
}

export default App;
