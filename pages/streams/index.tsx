import { Stream } from '@prisma/client'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import FloatingButton from '../../components/floating-button'
import Layout from '../../components/layout'

interface StreamResponse {
  ok: boolean
  streams: Stream[]
}

const Stream: NextPage = () => {
  const { data } = useSWR<StreamResponse>(`/api/streams`)
  console.log(data)
  return (
    <Layout hasTabBar title="라이브">
      <div className="py-10 divide-y-[1px] space-y-4">
        {data?.streams?.map((stream) => (
          <Link key={stream.id} href={`/streams/${stream.id}`}>
            <a className="pt-4 block px-4 border-b shadow-lg">
              <div className="w-full relative overflow-hidden rounded-md shadow-lg bg-slate-100 aspect-video">
                <Image
                  alt="asdasdasd"
                  width={200}
                  height={300}
                  src={`https://customer-m033z5x00ks6nunl.cloudflarestream.com/${stream.cloudflareId}/thumbnails/thumbnail.jpg?time=1s&height=270`}
                />
              </div>
              <h1 className="text-2xl pb-5 mt-2 font-bold text-gray-900">
                {stream.name}
              </h1>
            </a>
          </Link>
        ))}
        <FloatingButton href="/streams/create">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            ></path>
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  )
}
export default Stream
