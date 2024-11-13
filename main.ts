async function getSampleText() {
	let text = "Placeholder string";

	try {
		const res = await fetch(
			"https://cdn.oxido.pl/hr/Zadanie%20dla%20JJunior%20AI%20Developera%20-%20tresc%20artykulu.txt",
		);

		if (!res.ok) {
			throw new Error("Response not ok");
		}

		if (res.headers.get("content-type") !== "text/plain") {
			throw new Error("Response not text");
		}

		const data = await res.text();

		text = data;
	} catch (e) {
		console.error(
			"Failed to fetch from remote: ",
			e,
		);
	}

	return text;
}

getSampleText().then(console.log);
