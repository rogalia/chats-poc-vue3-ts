export function getRandomReply(): string {
    const wordsCount = Math.max(1, Math.min(10, Math.floor(Math.random() * 10) + 1)),
        chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        words: string[] = []

    for (let i = 0; i < wordsCount; i++) {
        const wordLength = Math.floor(Math.random() * 10) + 3

        let word = ''

        for (let j = 0; j < wordLength; j++) {
            word += chars.charAt(Math.floor(Math.random() * chars.length))
        }

        words.push(word)
    }

    return words.join(' ')
}