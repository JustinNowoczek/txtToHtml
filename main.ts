import { OpenAI } from "https://deno.land/x/openai@v4.68.1/mod.ts";
import createAndFormatHtml from "./createAndFormatHtml.ts";
import getArticle from "./getArticle.ts";
import getTextFromApi from "./getTextFromApi.ts";
import getTextFromFile from "./getTextFromFile.ts";

function exitIfUndefined<T>(
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

async function main(
	previewName: string,
	contentUrl: string,
	backupContentPath: string,
) {
	const key = Deno.env.get("OPENAI__KEY");

	exitIfUndefined(
		key,
		"No api key detected, add one under the name OPENAI__KEY to a .env file",
	);

	console.log("\n\nValidating Api key");
	const openaiClient = new OpenAI({
		apiKey: key,
	});
	console.log("Api key valid\n");

	let content = await getTextFromApi(
		contentUrl,
	);

	if (content === undefined) {
		content = await getTextFromFile(backupContentPath);

		exitIfUndefined(
			content,
		);
	}

	let article = await getArticle(openaiClient, content);

	exitIfUndefined(
		article,
	);

	if (article.startsWith("```html") && article.endsWith("```")) {
		article = article.slice(7, article.length - 3);
	}

	article = article.trim();

	if (!(article.startsWith("<article>") && article.endsWith("</article>"))) {
		throw new Error("Article format is wrong");
	}

	console.log("\nArticle validated\n");

	const template = await getTextFromFile("./template.html");

	exitIfUndefined(template);

	const [templateFirst, templateSecond] = template.split("</body>");

	const preview = templateFirst + article + "</body>" + templateSecond;

	await createAndFormatHtml(preview, previewName);

	console.log("Task complete, exiting");

	Deno.exit(0);
}

const DEF_PREVIEW_NAME = "preview";
const DEF_CONTENT_URL =
	"https://cdn.oxido.pl/hr/Zadanie%20dla%20JJunior%20AI%20Developera%20-%20tresc%20artykulu.txt";
const DEF_BACKUP_CONTENT_PATH = "./backup.txt";

const [
	previewName = DEF_PREVIEW_NAME,
	contentUrl = DEF_CONTENT_URL,
	backupContentPath = DEF_BACKUP_CONTENT_PATH,
] = Deno.args;

main(previewName, contentUrl, backupContentPath);
