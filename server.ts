import express, {Request, Response} from "express";
import axios, {AxiosResponse} from "axios";

const PORT = process.env.PORT || 5000
const app = express()

app.use('/quiz-item', async (req: Request, res: Response) => {
    try {
        const response: AxiosResponse = await axios.get('https://b24f76b9-189d-4d0c-81a4-0eb58192403f-europe-west1.apps.astra.datastax.com/api/rest/v2/namespaces/quizes/collections/quirky_quizes', {
            headers: {
                'X-Cassandra-Token': 'AstraCS:HhNWSLTCquuAGYrFvlKkaXgk:f95f09f08af0ebd2f57f9cba7b8633c80a2ae29aaa6bfb0cb0240a9d1c95b7af',
                accept: 'application/json'
            }
        })
        if(response.status === 200) {
            const quizItem = await response.data.data['65def461-fdbf-44db-96e3-708717d59d0d']
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
            res.send(quizItem)
        }
    } catch(error) {
        console.error(error)
    }
})

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}...`))