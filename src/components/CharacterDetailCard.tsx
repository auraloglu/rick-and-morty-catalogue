import { useNavigate } from "react-router-dom"

import "@/components/character-detail-card.scss"

interface CharacterCardProps {
  isCurrent: boolean
  name: string
  image: string
  id: number
  status: string
  species: string
  type: string
  gender: string
  origin: string
}

function CharacterDetailCard({
  isCurrent,
  name,
  image,
  id,
  status,
  species,
  type,
  gender,
  origin,
}: CharacterCardProps) {
  const navigate = useNavigate()

  return (
    <div
      className="character-detail-card"
      onClick={() => navigate(`/character/${id}`)}
    >
      <div className="character-name"> {name}</div>
      <div className="character-card-image-container">
        <img className="character-image" src={image} />
      </div>
      {isCurrent && (
        <>
          <div className="detail status">Status: {status}</div>
          <div className="detail species">Species: {species}</div>
          <div className="detail type">Type: {type}</div>
          <div className="detail gender">Gender: {gender}</div>
          <div className="detail origin">Origin: {origin}</div>
        </>
      )}
    </div>
  )
}

export default CharacterDetailCard
