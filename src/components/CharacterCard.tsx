import "@/components/character-card.scss"

interface CharacterCardProps {
  name: string
  image: string
}

function CharacterCard({ name, image }: CharacterCardProps) {
  return <div className="character-card">{name}</div>
}

export default CharacterCard
