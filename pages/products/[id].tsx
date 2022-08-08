import useMutation from '@libs/client/useMutation'
import useUser from '@libs/client/useUser'
import { cls } from '@libs/client/utils'
import { Product, User } from '@prisma/client'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { userAgent } from 'next/server'
import useSWR, { useSWRConfig } from 'swr'
import Button from '../../components/button'
import Layout from '../../components/layout'

interface ProductWithUser extends Product {
  user: User
}

interface ItemDetailResponse {
  ok: boolean
  product: ProductWithUser
  relatedProducts: Product[]
  isLiked: boolean
}

const ItemDetail: NextPage = () => {
  const { user, isLoading } = useUser()
  const router = useRouter()
  // console.log(router.query) ///product id를 따냄.
  const { mutate } = useSWRConfig()
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  )

  const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`)

  const onFavClick = () => {
    if (!data) return
    boundMutate({ ...data, isLiked: !data.isLiked }, false)
    toggleFav({})
    //mutate('/api/users/me', { ok: false }, false)
    //mutate('/api/users/me', (prev:any)=>({ok:!prev.ok}), false)
  }
  return (
    <Layout canGoBack>
      <div className="px-4 py-10">
        <div>
          <div className="h-96 bg-slate-400" />
          <div className="flex cursor-pointer py-3 border-b items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-fuchsia-300" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {data?.product?.user?.name}
              </p>
              <Link href={`/users/profiles/${data?.product?.user?.id}`}>
                <a className="rext-xs font-medium">View profile &rarr;</a>
              </Link>
            </div>
          </div>
          <div className="mt-10 ">
            <h1 className="text-3xl font-bold text-gray-900 ">
              {data?.product?.name}
            </h1>
            <p className="text-3xl mt-3 pb-5 text-slate-400 font-black border-b-2">
              {data?.product?.price}원
            </p>
            <p className="text-base my-6 text-gray-800">
              {data?.product?.description}
            </p>
            <div className="flex items-center justify-between">
              <Button large text="Talk to seller" />
              <button
                onClick={onFavClick}
                className={cls(
                  'p-3 mx-3 rounde flex items-center justify-center',
                  data?.isLiked
                    ? 'text-red-500 hover:text-red-300'
                    : 'text-gray-400  hover:text-gray-200'
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-800">Similar items</h2>
          <div className="mt-5 grid grid-cols-3 gap-4">
            {data?.relatedProducts.map((product) => (
              <div key={product.id}>
                <div className="h-36 w-full bg-slate-400" />
                <h3>{product.name}</h3>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}원
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ItemDetail
