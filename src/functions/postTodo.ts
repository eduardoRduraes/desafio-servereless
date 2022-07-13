
import {v4 as uuidV4} from "uuid"
import { connectDB } from "../utils/dynamodbClient"
interface ICreateTodo { 
    userId: string,
    title: string,
    done: false,
    deadline: string,
}

export const handler = async (event) =>{
    const {userId, title, done, deadline} = JSON.parse(event.body) as ICreateTodo

    const params = {
        TableName:"todos",
        Item:{   
            id: uuidV4(),
            userId,
            title,
            done,
            deadline: String(new Date(deadline)),
            created_at: String(new Date()) 
        }     
    }

    await connectDB.put(params).promise()

    return {
        statusCode: 201,
        body: JSON.stringify({
            item: params
        })
    }
}