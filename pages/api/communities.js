import { SiteClient } from 'datocms-client'

export default async function reqReceptor(req, res) {
    if(req.method === 'POST') {
        const apiSecret = process.env.FULL_ACCESS_API_TOKEN
        const client = new SiteClient(apiSecret);
        
        const createdRecord = await client.items.create({
            itemType: "968817",
            ...req.body
        })
        
        res.json({
            dados: 'coisas',
            createdRecord: createdRecord
        })
        return;
    }
    res.status(404).json({
        message: "ainda não temos nada no GET, mas no POST tem!"
    })
}