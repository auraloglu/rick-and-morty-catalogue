import axios from "axios"

const RICK_AND_MORTY_API = "https://rickandmortyapi.com/api"

const axiosInstance = axios.create({
  baseURL: RICK_AND_MORTY_API,
  timeout: 5000,
})

export async function getCharacterList({
  page,
  searchTerm,
}: {
  page: number
  searchTerm: string
}) {
  // const response = await axiosInstance.get(
  //   `/character?page=${page}&name=${searchTerm}`
  // )

  // console.log(response)

  // return response.data

  try {
    const response = await axiosInstance.get(
      `/character?page=${page}&name=${searchTerm}`
    )

    return response.data
  } catch (error) {
    const { response } = error
    const { request, ...errorObject } = response // take everything but 'request'
    console.log(errorObject)

    return []
  }
}
