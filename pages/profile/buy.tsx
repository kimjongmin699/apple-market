import ProductList from '@components/product-list'
import type { NextPage } from 'next'
import Item from '../../components/item'
import Layout from '../../components/layout'

const Buy: NextPage = () => {
  return (
    <Layout title="구매내역" canGoBack>
      <div className="flex flex-col space-y-5 py-10 ">
        <ProductList kind="purchases" />
      </div>
    </Layout>
  )
}

export default Buy
