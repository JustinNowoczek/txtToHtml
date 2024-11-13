import { OpenAI } from "https://deno.land/x/openai@v4.68.1/mod.ts";
import createAndFormatHtml from "./helpers/createAndFormatHtml.ts";
import exitIfUndefined from "./helpers/exitIfUndefined.ts";
import getArticle from "./helpers/getArticle.ts";
import getTextFromApi from "./helpers/getTextFromApi.ts";
import getTextFromFile from "./helpers/getTextFromFile.ts";

const userArgs = Deno.args;

const DEFAULTS = [
	"podglad",
	"https://cdn.oxido.pl/hr/Zadanie%20dla%20JJunior%20AI%20Developera%20-%20tresc%20artykulu.txt",
	"./data/backupContent.txt",
];

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

	const template = await getTextFromFile("./data/szablon.html");

	exitIfUndefined(template);

	const [templateFirst, templateSecond] = template.split("</body>");

	const preview = templateFirst + article + "</body>" + templateSecond;

	await createAndFormatHtml(preview, previewName);

	console.log("Task complete, exiting");

	Deno.exit(0);
}

const replaceEOrU = (v: string, d: string) =>
	v === "!" || v === undefined ? d : v;

const userOrDefaultArgs: [string, string, string] = [
	replaceEOrU(userArgs[0], DEFAULTS[0]),
	replaceEOrU(userArgs[1], DEFAULTS[1]),
	replaceEOrU(userArgs[2], DEFAULTS[2]),
];

main(...userOrDefaultArgs);
