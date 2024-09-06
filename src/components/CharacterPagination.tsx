import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface CharacterPaginationProps {
  totalPages: number
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

function CharacterPagination({
  totalPages,
  currentPage,
  setCurrentPage,
}: CharacterPaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="cursor-pointer select-none">
          <PaginationPrevious
            onClick={() => setCurrentPage(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>

        <PaginationItem className="mx-4">
          <div>
            {currentPage} / {totalPages}
          </div>
        </PaginationItem>
        <PaginationItem className="cursor-pointer select-none">
          <PaginationNext
            onClick={() => setCurrentPage(currentPage + 1)}
            aria-disabled={currentPage >= totalPages}
            tabIndex={currentPage >= totalPages ? -1 : undefined}
            className={
              currentPage >= totalPages
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default CharacterPagination
