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
        <img
          className="character-image"
          src={image}
          style={{ cursor: !isCurrent ? "pointer" : "default" }}
        />
      </div>
      {isCurrent && (
        <div className="detail-container">
          <div className="detail status">
            <label className="label">Status:</label> {status}
          </div>
          <div className="detail species">
            <label className="label">Species:</label> {species}
          </div>
          <div className="detail type">
            <label className="label">Type:</label> {type}
          </div>
          <div className="detail gender">
            <label className="label">Gender:</label> {gender}
          </div>
          <div className="detail origin">
            <label className="label">Origin:</label> {origin}
          </div>
        </div>
      )}
    </div>
  )
}

export default CharacterDetailCard
