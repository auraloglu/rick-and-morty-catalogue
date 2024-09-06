import { useState } from "react"

import CharacterCard from "@/components/CharacterCard"
import CharacterPagination from "@/components/CharacterPagination"

import { getCharacterList } from "@/api/rickAndMortyAPI"

function CharacterList() {
  const [page, setPage] = useState<number>(1)

  getCharacterList({ page })

  return (
    <>
      <CharacterCard />
      <div>Character List</div>
      <CharacterPagination />
    </>
  )
}

export default CharacterList
