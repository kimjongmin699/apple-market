import { cls } from '@libs/client/utils'

interface PaginationButton {
  children: React.ReactNode
  rOpt?: number
  direction: 'left' | 'right'
  page: number
  itemLength?: any
  [key: string]: any
}

export default function PaginationButton({
  children,
  direction,
  page,
  itemLength,
  onClick,
  rest,
}: PaginationButton) {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={cls(
        direction === 'left' || (direction === 'right' && page <= 1)
          ? 'bottom-5'
          : 'bottom-16',
        direction === 'right' && itemLength < 5 ? 'hidden' : '',
        direction === 'left' && page <= 1 ? 'hidden' : '',
        `fixed right-5 flex aspect-square w-14 cursor-pointer items-center justify-center rounded-full border-0 border-transparent bg-orange-400 text-white shadow-xl transition-all hover:bg-orange-500 sm:sticky sm-translate-x-[32rem]`
      )}
    >
      {children}
    </button>
  )
}
