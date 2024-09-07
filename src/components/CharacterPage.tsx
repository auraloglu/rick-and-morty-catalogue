import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { getCharacter } from "@/api/rickAndMortyAPI"

import { Button } from "@/components/ui/button"
import { PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

import "@/components/character-page.scss"

interface Character {
  id: number
  name: string
  status: string
  species: string
  gender: string
  origin: {
    name: string
    url: string
  }
  image: string
}

function CharacterPage() {
  const params = useParams()
  const navigate = useNavigate()

  const [details, setDetails] = useState<Character>({
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    gender: "Male",
    origin: {
      name: "Earth (C-137)",
      url: "https://rickandmortyapi.com/api/location/1",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  })

  useEffect(() => {
    if (params.id) {
      fetchDetails(parseInt(params.id))
    }
  }, [params.id])

  const fetchDetails = async (id: number) => {
    const resp = await getCharacter(id)

    setDetails(resp)
  }

  return (
    <div className="character-page">
      <div className="top-container">
        <Button onClick={() => navigate("/")}>Back</Button>
      </div>
      <div className="navigation">
        {params.id && parseInt(params.id) > 1 && (
          <PaginationPrevious
            onClick={() => navigate(`/character/${parseInt(params.id) - 1}`)}
            className="nav-button prev-button cursor-pointer select-none"
          />
        )}

        <PaginationNext
          onClick={() => navigate(`/character/${parseInt(params.id) + 1}`)}
          className="nav-button next-button cursor-pointer select-none"
        />
      </div>
      <div className="character-details flex flex-col">
        <div className="image">
          <img src={details.image} />
        </div>
        <div className="details flex flex-col">
          <div className="name">Name: {details.name}</div>
          <div className="status">Status: {details.status}</div>
          <div className="gender">Gender: {details.gender}</div>
          <div className="origin">Origin: {details.origin.name}</div>{" "}
          <div>Species: {details.species}</div>
        </div>
      </div>
    </div>
  )
}

export default CharacterPage
