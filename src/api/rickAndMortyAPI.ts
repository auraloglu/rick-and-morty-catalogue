import axios from "axios"

const RICK_AND_MORTY_API = "https://rickandmortyapi.com/api"

const axiosInstance = axios.create({
  baseURL: RICK_AND_MORTY_API,
  timeout: 5000,
})

export async function getCharacterList({ page }: { page: number }) {
  const response = await axiosInstance.get(`/character?page=${page}`)

  console.log(response)

  return response.data
}
