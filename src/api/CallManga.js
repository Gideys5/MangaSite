export async function catchAnime(id) {
    const url = `https://myanimelist.p.rapidapi.com/manga/${id}`;
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'x-rapidapi-key': '451d784a9amsh6c4e6d49475f571p1b35cdjsn958a9a248ee4',
            'x-rapidapi-host': 'myanimelist.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Network error or request was blocked:', error);
    }
}