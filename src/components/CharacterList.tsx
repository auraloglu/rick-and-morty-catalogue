import { useState, useEffect } from "react"

import CharacterCard from "@/components/CharacterCard"
import CharacterPagination from "@/components/CharacterPagination"

import { getCharacterList } from "@/api/rickAndMortyAPI"

function CharacterList() {
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [characterList, setCharacterList] = useState([])

  useEffect(() => {
    fetchList()
  }, [page])

  const fetchList = async () => {
    const data = await getCharacterList({ page })

    setTotalPages(data.info.pages)
    setCharacterList(data.results)
  }

  return (
    <>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        {characterList.map((character: any) => {
          return (
            <CharacterCard
              name={character.name}
              key={character.id}
              image={character.image}
            />
          )
        })}
      </div>
      <CharacterPagination
        totalPages={totalPages}
        currentPage={page}
        setCurrentPage={setPage}
      />
    </>
  )
}

export default CharacterList
