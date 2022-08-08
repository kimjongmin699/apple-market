import { NextPage } from 'next'
import Layout from '../../components/layout'
import Message from '../../components/message'

const ChatDetail: NextPage = () => {
  return (
    <Layout canGoBack title="steve">
      <div className="py-10 ob-16 px-4 space-y-4">
        <Message message="hi how much are you selling this item?" />
        <Message message="I want to $300" reversed />
        <Message message="are you crazy?" />
        <Message message="hi how much are you selling this item?" />
        <Message message="I want to $300" reversed />
        <Message message="are you crazy?" />
        <Message message="hi how much are you selling this item?" />
        <Message message="I want to $300" reversed />
        <Message message="are you crazy?" />
        <Message message="hi how much are you selling this item?" />
        <Message message="I want to $300" reversed />
        <Message message="are you crazy?" />
        <form className="fixed py-2 bg-white bottom-0 inset-x-0">
          <div className="flex relative max-w-md items-center w-full mx-auto">
            <input
              type="text"
              className="shadow-lg bg-slate-100 opacity-70 rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
            />
            <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
              <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-400 rounded-full px-3 hover:bg-orange-600 text-xl text-white">
                &rarr;
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default ChatDetail
