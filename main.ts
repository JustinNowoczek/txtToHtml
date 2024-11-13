async function getSampleText() {
	try {
		console.log("Attempting remote file read");

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

		return data;
	} catch (e) {
		console.error(
			"Failed to fetch from remote: ",
			e,
			"\n",
		);
	}

	try {
		console.log("Attempting local file read");

		const data = await Deno.readTextFile("backup.txt");

		return data;
	} catch (e) {
		console.error(
			"Failed to fetch from local: ",
			e,
			"\n",
		);
	}

	return "Placeholder string";
}

getSampleText().then((d) => console.log(d.slice(0, 20)));
