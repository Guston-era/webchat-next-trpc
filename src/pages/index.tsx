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
import { useCallback, useState, useRef, useLayoutEffect } from 'react'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const [itemName, setItemName] = useState<string>('')
  const scrollRef = useRef<HTMLElement>(null)

  const { data: list, refetch, isLoading } = trpc.useQuery(['msg.list'])

  const insertMutation = trpc.useMutation(['msg.add'], {
    onSuccess: () => {
      refetch()
    },
  })
  useLayoutEffect(() => {
    // console.log('i am user.', user.user_type)
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView()
    }
  }, [list])

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
                <span ref={scrollRef} />
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
