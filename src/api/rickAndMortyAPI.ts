import axios from "axios"

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
    const response = await axiosInstance.get(
      `/character?page=${page}&name=${searchTerm}&gender=${gender}`
    )

    return response.data
  } catch (error) {
    const { response } = error
    const { request, ...errorObject } = response // take everything but 'request'
    console.log(errorObject)

    return []
  }
}
