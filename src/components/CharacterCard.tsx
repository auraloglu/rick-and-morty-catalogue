import "@/components/character-card.scss"

interface CharacterCardProps {
  name: string
  image: string
}

function CharacterCard({ name, image }: CharacterCardProps) {
  return (
    <div className="character-card">
      <div className="character-card-image-container">
        <img className="character-image" src={image} />
      </div>
      <span className="character-name">{name}</span>
    </div>
  )
}

export default CharacterCard
