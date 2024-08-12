import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./filme-info.css"
import api from "../../services/api"
import { toast } from "react-toastify"


function Filmes() {

    const {id} = useParams()
    const navigate = useNavigate()
    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect( () => {

        async function loadFilme() {

            await api.get(`/movie/${id}`, {

                params: {

                    api_key: "477e017319df178f03808f2b41bd1191",
                    language: "pt-BR"
                

                }

            }).then( (response) => {

                setFilme(response.data)
                setLoading(false)


            }).catch( () => {

                console.log("Filme nao Encontrado")
                navigate("/", {replace: true})

            })

        }

        loadFilme()


        return () => {

            console.log("Componente foi desmontado")

        }

    }, [navigate,id])

    function salvarFilme() {

        const minhaLista = localStorage.getItem("@primeflix")

        let filmesSalvos = JSON.parse(minhaLista) || []

        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id == filme.id)

        if(hasFilme) {

            toast.warn("Esse filme ja esta na sua lista!")
            return

        }

        filmesSalvos.push(filme)
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com Sucesso!")

    }


    if(loading) {

        return (

            <div className="filme-info">

                <h1>Carregando detalhes ...</h1>

            </div>

        )

    }


    return (

        <div className="filme-info">

            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average}</strong>

            <div className="area-buttons">

                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>

            </div>

        </div>

    )

}

export default Filmes