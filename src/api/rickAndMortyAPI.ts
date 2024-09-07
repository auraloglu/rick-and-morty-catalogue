import axios from "axios"
import qs from "qs"

const RICK_AND_MORTY_API = "https://rickandmortyapi.com/api"

const axiosInstance = axios.create({
  baseURL: RICK_AND_MORTY_API,
  timeout: 5000,
})

export async function getCharacterList({
  page,
  searchTerm,
  gender,
}: {
  page: number
  searchTerm: string
  gender: string
}) {
  try {
    const queryString = qs.stringify(
      {
        page,
        name: searchTerm,
        gender,
      },
      { filter: (prefix, value) => value || undefined }
    )

    const response = await axiosInstance.get(`/character?${queryString}`)

    return response.data
  } catch (error) {
    const { response } = error
    const { request, ...errorObject } = response // take everything but 'request'
    console.log(errorObject)

    return []
  }
}
