/* eslint-disable @typescript-eslint/naming-convention, no-var */

type TemporaryReferenceSet = WeakMap<Record<string, unknown>, string>

declare module 'react-server-dom-webpack/node-loader' {
	export type Source = string

	type TransformSourceContext = {
		format: string
		url: string
	}

	type TransformSourceFunction = (
		Source,
		TransformSourceContext,
		TransformSourceFunction,
	) => Promise<{ source: Source }>

	export async function transformSource(
		source: Source,
		context: TransformSourceContext,
		defaultTransformSource: TransformSourceFunction,
	): Promise<{ source: Source }>
}

declare module 'react-server-dom-webpack/server.edge' {
	type ImportManifestEntry = {
		id: string
		chunks: string[]
		name: string
	}

	type ClientReferenceManifestEntry = ImportManifestEntry

	export type ClientManifest = Record<string, ClientReferenceManifestEntry>

	type Options = {
		environmentName?: string
		identifierPrefix?: string
		signal?: any // AbortSignal
		temporaryReferences?: TemporaryReferenceSet
		onError?: (error: any) => void
		onPostpone?: (reason: string) => void
	}

	export function renderToReadableStream(
		model: any, // ReactClientValue
		webpackMap: ClientManifest,
		options?: Options,
	): ReadableStream
}

declare module 'react-server-dom-webpack/client.edge' {
	type SSRManifest = {
		moduleMap: any
		moduleLoading: any
	}

	export type Options = {
		ssrManifest: SSRManifest
		nonce?: string
		encodeFormAction?: any // EncodeFormActionCallback
		temporaryReferences?: any // TemporaryReferenceSet
	}

	export function createFromReadableStream(
		stream: ReadableStream,
		options: Options,
	): Promise<ReactNode>
}

declare module 'react-server-dom-webpack/client.browser' {
	// eslint-disable-next-line unicorn/prevent-abbreviations
	type CallServerCallback = <A, T>(string, args: A) => Promise<T>

	type TemporaryReferenceSet = Map<string, Record<string, unknown> | symbol>

	export type Options = {
		callServer?: CallServerCallback
		temporaryReferences?: TemporaryReferenceSet
	}

	export async function createFromReadableStream(
		stream: ReadableStream,
		options?: Options,
	): Promise<ReactNode>
}

declare module 'react-dom/server.edge' {
	type ReactDOMServerReadableStream = ReadableStream & {
		allReady: Promise<void>
	}

	export function renderToReadableStream(
		children: ReactNode,
		options?: any,
	): Promise<ReactDOMServerReadableStream>
}

declare var __webpack_module_loading__: Map<string, any>
declare var __webpack_module_cache__: Map<string, any>
declare var __webpack_chunk_load__: (id: string) => Promise<any>
declare var __webpack_require__: (id: string) => any

declare var __SEIA_RSC_PAYLOAD: string
declare var __SEIA_START_TIME: number
