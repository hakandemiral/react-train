import axios from "axios";

const api = () => (
    axios.create({
        baseURL: "https://react-yazi-yorum.herokuapp.com"
    })
)

export default api;