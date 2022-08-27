import withHandler, { ResponseType } from '@libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'

import { withApiSession } from '@libs/server/withSession'
import client from '@libs/server/client'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { user } = req.session
  const { name, price, description } = req.body

  if (req.method === 'POST') {
    const {
      result: {
        uid,
        rtmps: { streamKey, url },
      },
    } = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/stream/live_inputs`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.STREAM_TOKEN}`,
          },
          body: `{"meta": {"name":"${name}"},"recording": { "mode": "automatic", "timeoutSeconds": 10}}`,
        }
      )
    ).json()

    const stream = await client.stream.create({
      data: {
        cloudflareId: uid,
        cloudflareKey: streamKey,
        cloudflareUrl: url,
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    })
    res.json({ ok: true, stream })
  } else if (req.method === 'GET') {
    const streams = await client.stream.findMany({})
    res.json({ ok: true, streams })
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  })
)
