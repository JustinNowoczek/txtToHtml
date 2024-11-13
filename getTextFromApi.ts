export default async function getTextFromApi(location: string) {
    console.log("\nAttempting to read " + location);

    try {
        const res = await fetch(
            location,
        );

        if (!res.ok) {
            throw new Error("Response not ok");
        }

        if (res.headers.get("content-type") !== "text/plain") {
            throw new Error("Response not text");
        }

        const data = await res.text();

        console.log("Read succeeded\n\n");

        return data;
    } catch (e) {
        console.error(
            "Failed to read from: " + location,
            e,
            "\n",
        );
    }
}
