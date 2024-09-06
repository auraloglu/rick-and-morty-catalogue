import { useState, useEffect } from "react"
import debounce from "debounce"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import CharacterCard from "@/components/CharacterCard"
import CharacterPagination from "@/components/CharacterPagination"
import Spinner from "@/components/Spinner"

import { getCharacterList } from "@/api/rickAndMortyAPI"

function CharacterList() {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [characterList, setCharacterList] = useState([])

  const [searchTerm, setSearchTerm] = useState("")
  const [gender, setGender] = useState("")

  const [isLoading, setIsLoading] = useState(true)
  const [noResult, setNoResult] = useState(false)

  useEffect(() => {
    fetchList()
  }, [page])

  useEffect(() => {
    // shadcn does not allow option value to be empty.
    // this lines for reseting gender filter
    if (gender === "all") {
      setGender("")
    }

    setIsLoading(true)

    fetchDebouncedSearchResults()
    setPage(1)

    return () => fetchDebouncedSearchResults.clear()
  }, [searchTerm, gender])

  const fetchList = async () => {
    const data = await getCharacterList({ page, searchTerm, gender })

    setIsLoading(false)

    if (data.results) {
      setTotalPages(data.info.pages)
      setCharacterList(data.results)
      setNoResult(false)
    } else {
      setNoResult(true)
    }
  }

  const fetchDebouncedSearchResults = debounce(fetchList, 500)

  return (
    <>
      <div className="flex row items-center gap-4">
        <div className="grid w-full max-w-sm items-center gap-1.5 ml-4 mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            type="name"
            id="name"
            placeholder="E.g Morty"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 ml-4 mb-4">
          <Label htmlFor="name">Gender</Label>

          <Select onValueChange={(value) => setGender(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="genderless ">Genderless</SelectItem>
                <SelectItem value="unknown">unknown</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {isLoading && <Spinner />}
        {noResult ? (
          <div> No Result</div>
        ) : (
          characterList.map((character: any) => {
            return (
              <CharacterCard
                name={character.name}
                key={character.id}
                image={character.image}
              />
            )
          })
        )}
        {}
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
