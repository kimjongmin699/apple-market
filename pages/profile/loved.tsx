import type { NextPage } from 'next'
import Item from '../../components/item'
import Layout from '../../components/layout'

const Loved: NextPage = () => {
  return (
    <Layout title="관심목록" canGoBack>
      <div className="flex flex-col space-y-5 py-10 ">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item
            key={i}
            id={i}
            title="iPhone 12"
            price={99}
            comments={3}
            hearts={3}
          ></Item>
        ))}
      </div>
    </Layout>
  )
}

export default Loved
