import withHandler, { ResponseType } from '@libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import client from '@libs/server/client'
import { withApiSession } from '@libs/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { answer } = req.body
  const { user } = req.session
  const { id } = req.query

//   const post = await client.post.findUnique({
//     where: {
//       id: Number(id),
//     },
//     select: {
//       id: true,
//     },
//   })
//   if (!post) return false

  const newAnswer = await client.answer.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: Number(id),
        },
      },
      answer,
    },
  })
  console.log(newAnswer)
  res.json({ ok: true, answer: newAnswer })
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  })
)
