import withHandler, { ResponseType } from '@libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../../libs/server/client'
import { withApiSession } from '@libs/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { user } = req.session

  //   client.record.findMany({
  //     where:{
  //         userId:user?.id,
  //         kind:"Sale" //enum은 지정한 것만 들어갈수 있다.
  //     }
  //   })

  const sales = await client.sale.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: {
        include: {
          _count: {
            select: {
              favs: true,
            },
          },
        },
      },
    },
  })
  res.json({
    ok: true,
    sales,
  })
}
export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
)
