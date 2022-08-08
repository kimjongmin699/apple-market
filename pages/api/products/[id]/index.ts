import withHandler, { ResponseType } from '@libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import client from '@libs/server/client'
import { withApiSession } from '@libs/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query
  const { user } = req.session
  //console.log(id) product id를 받아옴.
  //   const product = await client.product.findUnique({
  //     where: {},
  //   })
  const product = await client.product.findUnique({
    where: {
      id: Number(id), ///id를 Int로 만들어줌.
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  })
  const terms = product?.name.split(' ').map((word) => ({
    name: {
      contains: word,
    },
  }))
  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: Number(id),
        },
      },
    },
  })

  const isLiked = Boolean(
    await client.fav.findFirst({
      where: {
        productId: product?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  )
  res.json({ ok: true, product, isLiked, relatedProducts })
  //   console.log(product)
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
)
