interface IQuizData {
    title: string
    subtitle: string
    quizId: string
    content: IContent[]
    answers: IAnswer[]
}

interface IAnswer {
    text: string
    image: string
    alt: string
    combination: string[]
}

interface IContent {
    id: number
    text: string
    questions: IQuestion[]
}

interface IQuestion {
    text: string
    image: string
    alt: string
    credit: string
}

export type {IQuizData, IContent, IQuestion, IAnswer}