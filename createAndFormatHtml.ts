export default async function createAndFormatHtml(
    content: string,
    fileName: string,
) {
    const file = fileName + ".html";

    try {
        console.log("Creating " + file);

        await Deno.writeTextFile(
            file,
            content,
        );

        console.log("Formatting " + file);

        const formattingCommand = new Deno.Command("deno", {
            args: ["fmt", "./" + file],
        });

        await formattingCommand.output();

        console.log(file + " created and formatted\n\n");
    } catch (e) {
        console.error(
            "Failed to create or format from: " + file,
            e,
            "\n",
        );
    }
}
