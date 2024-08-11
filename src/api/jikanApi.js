import axios from 'axios';

export async function prendi() {
    const getManga = {
        method: 'GET',
        url: 'https://myanimelist.p.rapidapi.com/manga/1',
        headers: {
            'x-rapidapi-key': 'b988c5c6b4msh4bb42f26f293dbfp1764e8jsnb702cbc62581',
            'x-rapidapi-host': 'myanimelist.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(getManga);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}
