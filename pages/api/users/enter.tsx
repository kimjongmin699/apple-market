import withHandler, { ResponseType } from '@libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../libs/server/client'
import twilio from 'twilio'

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body
  const user = phone ? { phone } : email ? { email } : null
  if (!user) return res.status(400).json({ ok: false })
  const payload = Math.floor(100000 + Math.random() * 900000) + ''
  // const user = await client.user.upsert({
  //   where: {
  //     ...payload,
  //   },
  //   create: {
  //     name: 'kikiki',
  //     ...payload,
  //   },
  //   update: {},
  // })
  // console.log(user)
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: 'kikiki',
            ...user,
          },
        },
      },
    },
  })
  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.MY_PHONE!,
      body: `Your login token is ${payload}`,
    })
    console.log(message)
  }

  console.log(token)
  //   if (email) {
  //     user = await client.user.findUnique({
  //       where: {
  //         email,
  //       },
  //     })
  //     if (user) console.log('found it')
  //     if (!user) {
  //       console.log('Did not found. i Will create')
  //       await client.user.create({
  //         data: {
  //           name: 'AAAAAA',
  //           email,
  //         },
  //       })
  //     }
  //     console.log(user)
  //   }
  //   if (phone) {
  //     user = await client.user.findUnique({
  //       where: {
  //         phone: +phone,
  //       },
  //     })
  //     if (user) console.log('found it')
  //     if (!user) {
  //       console.log('Did not found. i Will create')
  //       await client.user.create({
  //         data: {
  //           name: 'AAAAAA',
  //           phone: +phone,
  //         },
  //       })
  //     }
  //     console.log(user)
  //   }

  return res.json({ ok: true, payload })
}

export default withHandler({ methods: ['POST'], handler, isPrivate: false })
