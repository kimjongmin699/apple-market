import { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../../components/layout'

const Chats: NextPage = () => {
  return (
    <Layout hasTabBar title="채팅">
      <div className="py-10 divide-y-2 ">
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          <Link href={`/chats/${i}`} key={i}>
            <a className="flex px-4 cursor-pointer py-3 items-center space-x-3 shadow-md">
              <div className="w-12 h-12 rounded-full bg-slate-400" />
              <div>
                <p className="text-gray-700">Steve Jobs</p>
                <p className="text-sm text-gray-500">
                  See you tomorrow, You can do it!!
                </p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default Chats
