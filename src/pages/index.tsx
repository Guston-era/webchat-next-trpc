import {
  Card,
  CardContent,
  CardForm,
  CardHeader,
  List,
  ListItem,
} from '../components'
// import { .... } from "@prisma/client";
import type { NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useState, useEffect } from 'react'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const [itemName, setItemName] = useState<string>('')

  const { data: list, refetch, isLoading } = trpc.useQuery(['msg.list'])

  const insertMutation = trpc.useMutation(['msg.add'], {
    onSuccess: () => {
      refetch()
      window.scrollTo(0, document.body.scrollHeight)
    },
  })

  const sendMessage = useCallback(() => {
    if (itemName === '') return

    insertMutation.mutate({
      title: itemName,
    })

    setItemName('')
  }, [itemName, insertMutation])

  return (
    <>
      <Head>
        <title>Chat Room</title>
        <meta name="description" content="Chat app" />
      </Head>

      <main>
        <Card>
          <CardContent>
            <CardHeader title="Chat Room" listLength={list?.length ?? 0} />
            {isLoading ? (
              <span className="p-2">Hold on.. fetching chats...</span>
            ) : (
              <List>
                {list?.map((item) => (
                  <ListItem key={item._id.toString()} item={item} />
                ))}
              </List>
            )}
          </CardContent>
          <CardForm
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            submit={sendMessage}
          />
        </Card>
      </main>
    </>
  )
}

export default Home
