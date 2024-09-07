import { useNavigate } from "react-router-dom"

import "@/components/character-card.scss"

interface CharacterCardProps {
  name: string
  image: string
  id: number
}

function CharacterCard({ name, image, id }: CharacterCardProps) {
  const navigate = useNavigate()

  return (
    <div
      className="character-card"
      onClick={() => navigate(`/character/${id}`)}
    >
      <div className="character-card-image-container">
        <img className="character-image" src={image} />
      </div>
      <span className="character-name">{name}</span>
    </div>
  )
}

export default CharacterCard
