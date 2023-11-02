/*jshint esversion: 6 */
/*jshint esversion: 8 */

const postData = async (url, data) => {
    const request = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });       
    return await request.json();      
};

async function getResource(url) {
    const res = await fetch(url);
    
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    } 

    return await res.json();
}

export {getResource};
export {postData};