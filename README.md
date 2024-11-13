# Text to HTML Converter

Takes the content of a remote/local text file and transforms it into an HTML web page.

## Getting Started

To try out the project:

1. Have Deno installed on your machine.
2. Clone the repository.
3. Rename `example.env` to `.env` and add your OpenAI API key in the `.env` file.
4. Run the following command to install dependencies:
   ```
   deno i
   ```
5. Run the project with the following command:
   ```
   deno task run
   ```

The `deno task run` command has 3 optional arguments:

1. The name of the generated HTML file.
2. The URL from which to request the text file.
3. The file path of the local text file.

Example:

```
deno task run test
```

This will generate a `test.html` file instead of the default name.

You can also skip over an argument by using the `!` character:

```
deno task run test ! ./contentFile.txt
```

This will generate `test.html`, use the default URL, and read the local `contentFile.txt` file.

## Deno Permissions Used

The project uses the following Deno permissions:

- `--allow-env`: To obtain the API key from the environment.
- `--allow-net`: To access the remote text file and communicate with OpenAI.
- `--allow-read`: To read the local text file and the `template.html` file.
- `--allow-write`: To create the HTML file.
- `--allow-run`: To launch the Deno format command.




