import withHandler, { ResponseType } from '@libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'

import { withApiSession } from '@libs/server/withSession'
import client from '@libs/server/client'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query
  const { user } = req.session
  const stream = await client.stream.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      name: true,
      description: true,
      price: true,
      userId: true,
      cloudflareId: true,
      messages: {
        select: {
          id: true,
          message: true,
          user: {
            select: {
              avatar: true,
              id: true,
            },
          },
        },
      },
    },
  })
  const isOwner = stream?.userId === user?.id
  const ownedStream = await client.stream.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      messages: {
        select: {
          id: true,
          message: true,
          user: {
            select: {
              avatar: true,
              id: true,
            },
          },
        },
      },
    },
  })
  res.json({ ok: true, stream: isOwner ? ownedStream : stream })
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
)
