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

import Logo from "@/assets/Rick_and_Morty.png"

import "@/components/character-list.scss"

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
    setPage(1)

    setIsLoading(true)

    if (searchTerm) {
      fetchDebouncedSearchResults()
    } else {
      fetchList()
    }

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

  const handleSelectValue = (value: string) => {
    if (value === "all") {
      setGender("")
    } else {
      setGender(value)
    }
  }

  return (
    <>
      <div className="flex md:flex-row flex-col items-center gap-4">
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

          <Select onValueChange={handleSelectValue} value={gender}>
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

        <div>
          <img src={Logo} style={{ maxWidth: "300px" }} />
        </div>
      </div>

      <div className="relative mb-32 grid text-center sm:justify-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {isLoading && <Spinner />}
        {noResult ? (
          <div className="text-center"> No Result</div>
        ) : (
          characterList.map((character: any) => {
            return (
              <CharacterCard
                name={character.name}
                key={character.id}
                image={character.image}
                id={character.id}
                status={character.status}
              />
            )
          })
        )}
        {}
      </div>
      {!noResult && (
        <CharacterPagination
          totalPages={totalPages}
          currentPage={page}
          setCurrentPage={setPage}
        />
      )}
    </>
  )
}

export default CharacterList
