import DoubleLeftArrowIcon from 'components/icons/double-left-arrow-icon'
import DoubleRightArrowIcon from 'components/icons/double-right-arrow-icon'
import LeftArrowIcon from 'components/icons/left-arrow-icon'
import RightArrowIcon from 'components/icons/right-arrow-icon'
import { navigate } from 'gatsby'
import { PaginationContext } from 'model/utils'

type PaginationBarProps = PaginationContext & {
  baseUrl: string
}

export default function ({
  totalPages,
  currentPage,
  baseUrl,
}: PaginationBarProps) {
  const PAGE_ITEM_COUNT = 5 // [6] [7] [8] [9] [10] 과 같이 PaginationBar가 보여줄 page item의 수
  const startPage =
    PAGE_ITEM_COUNT * Math.floor(currentPage / (PAGE_ITEM_COUNT + 1)) + 1
  const endPage = Math.min(startPage + PAGE_ITEM_COUNT - 1, totalPages)

  function handleClickDoubleLeftArrowButton(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    if (event.currentTarget.disabled) {
      return
    }
    navigate(baseUrl)
  }
  function handleClickLeftArrowButton(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    if (event.currentTarget.disabled) {
      return
    }
    navigate(`${baseUrl}/${startPage - 1}`)
  }
  function handleClickPageNumberButton(
    event: React.MouseEvent<HTMLButtonElement>,
    pageNumber: number
  ) {
    if (event.currentTarget.disabled) {
      return
    }
    navigate(`${baseUrl}/${pageNumber === 1 ? '' : pageNumber}`)
  }
  function handleClickRightArrowButton(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    if (event.currentTarget.disabled) {
      return
    }
    navigate(`${baseUrl}/${startPage + PAGE_ITEM_COUNT}`)
  }
  function handleClickDoubleRightArrowButton(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    if (event.currentTarget.disabled) {
      return
    }
    navigate(`${baseUrl}/${totalPages}`)
  }

  const moveButtonClassName =
    'flex justify-center items-center w-10 aspect-square rounded-lg border-2 border-solid border-neutral-200 hover:bg-neutral-200 disabled:bg-neutral-200'
  const moveButtonIconClassName = 'fill-neutral-400'

  return (
    <div className='flex gap-2 w-fit mx-auto mt-14'>
      <button
        onClick={handleClickDoubleLeftArrowButton}
        className={moveButtonClassName}
        disabled={currentPage === 1}
      >
        <DoubleLeftArrowIcon className={moveButtonIconClassName} />
      </button>
      <button
        onClick={handleClickLeftArrowButton}
        className={moveButtonClassName}
        disabled={startPage === 1}
      >
        <LeftArrowIcon className={moveButtonIconClassName} />
      </button>

      {[...Array(endPage - startPage + 1)].map((_, i) => (
        <button
          key={startPage + i}
          onClick={(event) => handleClickPageNumberButton(event, startPage + i)}
          className='flex justify-center items-center w-10 aspect-square rounded-lg border-2 border-solid border-neutral-200 text-neutral-700 enabled:hover:bg-neutral-200 disabled:border-indigo-400 disabled:text-indigo-700'
          disabled={startPage + i === currentPage}
        >
          <span className='text-lg font-bold'>{startPage + i}</span>
        </button>
      ))}

      <button
        onClick={handleClickRightArrowButton}
        className={moveButtonClassName}
        disabled={startPage + PAGE_ITEM_COUNT > totalPages}
      >
        <RightArrowIcon className={moveButtonIconClassName} />
      </button>
      <button
        onClick={handleClickDoubleRightArrowButton}
        className={moveButtonClassName}
        disabled={currentPage === totalPages}
      >
        <DoubleRightArrowIcon className={moveButtonIconClassName} />
      </button>
    </div>
  )
}
