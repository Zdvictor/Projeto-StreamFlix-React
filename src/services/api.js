import axios from "axios"

//Base da url https://api.themoviedb.org/3/
//URL DA API https://api.themoviedb.org/3/movie/now_playing?api_key=477e017319df178f03808f2b41bd1191&language=pt-BR



const api = axios.create({


    baseURL:  "https://api.themoviedb.org/3/"

})

export default api