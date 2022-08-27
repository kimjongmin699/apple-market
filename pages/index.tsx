import PaginationButton from '@components/pagination-button'
import useUser from '@libs/client/useUser'
import { Product } from '@prisma/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import FloatingButton from '../components/floating-button'
import Item from '../components/item'
import Layout from '../components/layout'

export interface ProductWithCount extends Product {
  _count: {
    favs: number
  }
}

interface ProductsResponse {
  ok: boolean
  products: ProductWithCount[]
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const { data } = useSWR<ProductsResponse>(
    `/api/products?page=${page}&limit=${limit}`
  )

  const onPrevBtn = () => {
    router.push(`${router.pathname}?page=${page - 1}&limit=${limit}`)
    setPage((prev) => prev - 1)
  }
  const onNextBtn = () => {
    router.push(`${router.pathname}?page=${page + 1}&limit=${limit}`)
    setPage((prev) => prev + 1)
  }
  console.log(data)
  return (
    <>
      {/* <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap"
          rel="stylesheet"
        />
      </Head> */}
      <Layout title="Home" hasTabBar>
        <div className="flex flex-col space-y-5 py-10 mb-10">
          {data?.products?.map((product) => (
            <Item
              key={product.id}
              id={product.id}
              title={product.name}
              price={product.price}
              hearts={product._count.favs}
              comments={3}
              image={`https://imagedelivery.net/9VhLr461mPKMhcmTPOPfGg/${product?.image}/appleavatar`}
            ></Item>
          ))}
          <PaginationButton onClick={onPrevBtn} direction="left" page={page}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>
          </PaginationButton>
          <PaginationButton
            onClick={onNextBtn}
            direction="right"
            page={page}
            itemLength={data?.products.length}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </PaginationButton>
          <FloatingButton href="/products/upload">
            <svg
              className="h-12 w-15"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </FloatingButton>
        </div>
      </Layout>
    </>
  )
}


export default Home
