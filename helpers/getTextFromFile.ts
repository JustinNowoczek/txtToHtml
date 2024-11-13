export default async function getTextFromFile(location: string) {
    const name = location.split("/").at(-1);

    console.log("\nAttempting to read " + name);

    try {
        const data = await Deno.readTextFile(location);

        console.log("Read successful\n\n");

        return data;
    } catch (e) {
        console.error(
            "Failed to read local: " + name,
            e,
            "\n",
        );
    }
}
