declare global {
    interface Message {
        text: string;
        isUser: boolean;
        timestamp: number;
    }
}

export { }