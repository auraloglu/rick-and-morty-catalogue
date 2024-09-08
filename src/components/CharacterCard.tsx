import { useNavigate } from "react-router-dom"

import "@/components/character-card.scss"

interface CharacterCardProps {
  name: string
  image: string
  id: number
  status: string
}

function CharacterCard({ name, image, id, status }: CharacterCardProps) {
  const navigate = useNavigate()

  const renderStatus = () => {
    if (status === "Alive") {
      return <div className="status-badge alive">Alive</div>
    } else if (status === "Dead") {
      return <div className="status-badge dead">Dead</div>
    } else {
      return <div className="status-badge unknown">Unknown</div>
    }
  }

  return (
    <div
      className="character-card"
      onClick={() => navigate(`/character/${id}`)}
    >
      <div className="character-card-image-container">
        <img
          className={`character-image ${status.toLowerCase()}`}
          src={image}
        />
      </div>
      {renderStatus()}
      <span className="character-name">{name}</span>
    </div>
  )
}

export default CharacterCard
