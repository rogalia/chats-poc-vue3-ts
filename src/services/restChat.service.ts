import { Config } from '@/api/config'

import axios from 'axios'

export async function sendRestMessageAPI(text: string) {
    const response = await axios.post(
        Config.rest,
        {
            message: text
        }
    )
    
    return response.data
}

