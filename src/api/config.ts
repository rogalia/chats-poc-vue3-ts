export const Config = {
    rest: import.meta.env.VITE_REST_API_URL,
    websocket: import.meta.env.VITE_WS_API_URL
} as const;