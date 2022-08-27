import withHandler, { ResponseType } from '@libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'

import { withApiSession } from '@libs/server/withSession'
import client from '@libs/server/client'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query
  const { message } = req.body
  const { user } = req.session

  const newMessage = await client.message.create({
    data: {
      message,
      stream: {
        connect: {
          id: Number(id),
        },
      },
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  })
  res.json({ ok: true, newMessage })
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  })
)
