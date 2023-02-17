
interface RequestParams  {
    data?:any,
    method:string,
    body?:any,
    token?:string,
    url:string
}


export async function requestComponent (RequestParams:RequestParams) {
    return await
        fetch("http://localhost:3000/api" + RequestParams.url, {
            method: RequestParams.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: RequestParams.data?JSON.stringify(
                // your expected POST request payload goes here
                RequestParams.data
            ):null
        })

}