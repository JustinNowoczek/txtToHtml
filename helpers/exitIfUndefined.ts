export default function exitIfUndefined<T>(
    v: T | undefined,
    ...msgs: string[]
): asserts v is T {
    const allMsgs = [...msgs, "Exiting"];

    if (v === undefined) {
        allMsgs.forEach((msg) => {
            console.error(msg);
        });

        Deno.exit(1);
    }
}
