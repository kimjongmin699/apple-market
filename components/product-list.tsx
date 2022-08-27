import { ProductWithCount } from 'pages'
import useSWR from 'swr'
import Item from './item'

interface ProductListProps {
  kind: 'favs' | 'sales' | 'purchases'
}

interface Record {
  id: number
  product: ProductWithCount
}

interface ProductListResponse {
  [key: string]: Record[]
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`)
  return data ? (
    <>
      {data?.[kind]?.map((record) => (
        <Item
          key={record.id}
          id={record.product.id}
          title={record.product.name}
          price={record.product.price}
          comments={7}
          hearts={record.product._count.favs}
          image={`https://imagedelivery.net/9VhLr461mPKMhcmTPOPfGg/${record.product?.image}/appleavatar`}
        />
      ))}
    </>
  ) : null
}
