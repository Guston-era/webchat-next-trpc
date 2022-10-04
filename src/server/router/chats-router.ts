import { createRouter } from './context'
import { z } from 'zod'
import connectMongo from '../db/connectMongo'
import { ChatsModel } from '../db/models/chatsModel'

export const chatsRouter = createRouter()
  .query('list', {
    async resolve({ ctx }) {
      try {
        await connectMongo() //connect to the database
        return await ChatsModel.find()
      } catch (error) {
        console.log(error)
      }
    },
  })
  .mutation('add', {
    input: z.object({
      title: z.string(),
    }),
    async resolve({ input, ctx }) {
      const { title } = input

      try {
        await connectMongo() //connect to the database
        return await ChatsModel.create({ title: title })
      } catch (error) {
        console.log(error)
      }
    },
  })

export type ServerRouter = typeof chatsRouter
