import { connectDB } from "../utils/dynamodbClient"

interface IFindTodo { 
    user_id: string,
    title: string,
    done: false,
    deadline: string,
}

export const handler = async (event) => {
    const { userId } = event.pathParameters
    
    const response = await connectDB.scan({
        TableName: "todos"
    }).promise()

    const todo = response.Items.filter(t => t.userId === userId)

    console.log(response.Items)

    return {
        statusCode: 201,
        body: JSON.stringify(todo)
    }
}