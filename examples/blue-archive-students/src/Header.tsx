// This is server component.
// It reads(!) `package.json` with native `node:fs` module.
import { readFile } from 'node:fs/promises'

export const Header = async () => {
	const { version } = JSON.parse(
		(await readFile('./package.json')).toString(),
	) as { version: string }

	return (
		<header className="flex flex-col justify-center items-center pt-28 pb-12 px-8">
			<h1 className="text-5xl font-extrabold font-blue-archive italic mb-4 text-center">
				<span className="text-primary">Blue Archive</span> Students
			</h1>
			<p className="font-blue-archive text-2xl">v{version}</p>
		</header>
	)
}
