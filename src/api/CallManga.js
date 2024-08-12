export async function catchAnime(id) {
    const url = `https://api.jikan.moe/v4/anime?q=naruto`;
    const options = {
        method: 'GET',
        mode: 'cors',
        // headers: {
        //     'x-rapidapi-key': 'b988c5c6b4msh4bb42f26f293dbfp1764e8jsnb702cbc62581',
        //     'x-rapidapi-host': 'myanimelist.p.rapidapi.com'
        // }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Network error or request was blocked:', error);
    }
}