import axios from 'axios'

//const API = axios.create({ baseURL: 'http://172.16.0.99:5000', withCredentials: true })
axios.defaults.withCredentials = true
const url = 'http://localhost:5000'
/* All req with / */
export const signIn = (formData) => axios.post(url + '/signIn', formData)
export const signInWithGoogle = (resGoogle) => axios.post(url + '/signInWithGoogle', resGoogle)
export const signUp = (formData) => axios.post(url + '/signUp', formData)
export const logOut = () => axios.get(url + '/logOut')
export const login = () => axios.get(url + '/logIn')

/* All req with /pet */
export const getPets = (query = '') => axios.get(url + `/pet${query}`)
export const addPet = (pet) => axios.post(url + '/pet/', pet)
export const getPet = (pokedexId) => axios.get(url + `/pet/${pokedexId}`)
export const editPet = (petId, pet) => axios.put(url + `/pet/${petId}`, pet)

export const adoptPet = (petId, newAdoptionStatus) => axios.post(url + `/pet/${petId}/adopt`, newAdoptionStatus)
export const returnPet = (petId) => axios.post(url + `/pet/${petId}/return`)
export const savePet = (petId) => axios.post(url + `/pet/${petId}/save`)
export const deletePet = (petId) => axios.post(url + `/pet/${petId}/delete`,)
export const getPetsByUserId = (userId) => axios.get(url + `/pet/user/${userId}`,)

/* All req with /user */
export const getUsers = () => axios.get(url + '/user/')
export const getUserById = (userId) => axios.get(url + `/user/${userId}`)
export const updateUserById = (userId, user) => axios.put(url + `/user/${userId}`, user)
export const updateUserByIdAdmin = (userId, user) => axios.put(url + `/user/admin/${userId}`, user)
export const getUserFullById = (userId) => axios.get(url + `/user/${userId}/full`)

/* Req for image upload and download */
export const uploadImageToCloudinary = (img) => axios.post("https://api.cloudinary.com/v1_1/dho5vrjbc/image/upload",)


/* Get Statistics */
export const getStatistics = () => axios.get(url + '/stats')