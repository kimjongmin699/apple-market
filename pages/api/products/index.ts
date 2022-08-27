import withHandler, { ResponseType } from '@libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../libs/server/client'
import { withApiSession } from '@libs/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    const {
      query: { page, limit },
    } = req
    const products = await client.product.findMany({
      include: {
        _count: {
          select: {
            favs: true,
          },
        },
      },
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
      orderBy: { createdAt: 'asc' },
    })
    res.json({
      ok: true,
      products,
    })
  }
  if (req.method === 'POST') {
    const { name, price, description, photoId } = req.body
    const { user } = req.session
    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: photoId,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    })
    res.json({ ok: true, product })
  }
}
export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  })
)
