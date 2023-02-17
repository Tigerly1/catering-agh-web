
export const buildResponse = (res: any, code: number, message:any )=>{
    return res.status(code).send(message)
}