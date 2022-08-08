import withHandler, { ResponseType } from '@libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import client from '@libs/server/client'
import { withApiSession } from '@libs/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { question } = req.body
  const { user } = req.session
  const { id } = req.query

  const post = await client.post.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      answers: {
        select: {
          answer: true,
          createdAt: true,
          id: true,
          user: {
            select: {
              id: true,
              avatar: true,
              name: true,
            },
          },
        },
      },
      _count: {
        select: {
          answers: true,
          wondering: true,
        },
      },
    },
  })
  const isWondering = Boolean(
    await client.wondering.findFirst({
      where: {
        postId: Number(id),
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  )
  res.json({ ok: true, post, isWondering })
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
)
