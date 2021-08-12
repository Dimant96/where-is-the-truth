export function playAudio(src: string): Promise<void> {
    const audio = new Audio(src);

    audio.load();

    return audio.play();
}
