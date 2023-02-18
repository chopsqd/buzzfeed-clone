import express, {Request, Response} from "express";
import axios, {AxiosResponse} from "axios";
import {IQuizData} from './interfaces'
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

app.use('/quiz-item', async (req: Request, res: Response) => {
    try {
        const response: AxiosResponse = await axios.get(process.env.URL!, {
            headers: {
                'X-Cassandra-Token': process.env.TOKEN,
                accept: 'application/json'
            }
        })
        if(response.status === 200) {
            const quizItem: IQuizData = await response.data.data['65def461-fdbf-44db-96e3-708717d59d0d']
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.send(quizItem)
        }
    } catch(error) {
        console.error(error)
    }
})

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}...`))