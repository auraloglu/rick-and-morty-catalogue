import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { getCharacter } from "@/api/rickAndMortyAPI"

import "@/components/character-page.scss"
import CharacterDetailCard from "./CharacterDetailCard"

interface Character {
  id: number
  name: string
  status: string
  species: string
  gender: string
  type: string
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
    type: "",
    origin: {
      name: "Earth (C-137)",
      url: "https://rickandmortyapi.com/api/location/1",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  })

  const [prevDetails, setPrevDetails] = useState<Character>({
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    gender: "Male",
    type: "",
    origin: {
      name: "Earth (C-137)",
      url: "https://rickandmortyapi.com/api/location/1",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  })

  const [nextDetails, setNextDetails] = useState<Character>({
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    gender: "Male",
    type: "",
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

    if (id > 1) {
      const prevResp = await getCharacter(id - 1)

      setPrevDetails(prevResp)
    }

    //total number of characters
    //did not check dynamically because i dont want to add more complexity for now
    if (id < 826) {
      const nextResp = await getCharacter(id + 1)

      setNextDetails(nextResp)
    }
  }

  return (
    <div className="character-page">
      <div className="character-container">
        <div
          className="prev-character container"
          style={{ opacity: details.id === 1 ? 0 : 1 }}
        >
          <CharacterDetailCard
            isCurrent={false}
            name={prevDetails.name}
            image={prevDetails.image}
            id={prevDetails.id}
            status={prevDetails.status}
            species={prevDetails.species}
            type={prevDetails.type}
            gender={prevDetails.gender}
            origin={prevDetails.origin.name}
          />
        </div>
        <div className="current-character container">
          <CharacterDetailCard
            isCurrent
            name={details.name}
            image={details.image}
            id={details.id}
            status={details.status}
            species={details.species}
            type={details.type}
            gender={details.gender}
            origin={details.origin.name}
          />
        </div>
        <div
          className="next-character container"
          style={{ opacity: details.id === 826 ? 0 : 1 }}
        >
          <CharacterDetailCard
            isCurrent={false}
            name={nextDetails.name}
            image={nextDetails.image}
            id={nextDetails.id}
            status={nextDetails.status}
            species={nextDetails.species}
            type={nextDetails.type}
            gender={nextDetails.gender}
            origin={nextDetails.origin.name}
          />
        </div>
      </div>
    </div>
  )
}

export default CharacterPage
