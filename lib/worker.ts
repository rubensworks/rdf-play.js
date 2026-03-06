import * as ActorHttpProxy from '@comunica/actor-http-proxy';
import type * as RDF from '@rdfjs/types';
import { rdfDereferencer } from 'rdf-dereference';
import type { IDereferenceOptions } from 'rdf-dereference/lib/RdfDereferencerBase';
import { quadToStringQuad } from 'rdf-string';

globalThis.onmessage = async(m: any) => {
  // Verify validity of iri - required for consistent erroring when using proxy or not.
  // If you would not verify this before,
  // a uri like `https://exa  mple.com` would be iri encoded using proxy and error without
  let url: string;
  try {
    url = new URL(<string> m.data.url).href;
  } catch (e) {
    postMessage({ type: 'err', error: (<Error>e).message });
    return;
  }

  const config: IDereferenceOptions = {};
  if (m.data.proxy) {
    (<any>config)['@comunica/actor-http-proxy:httpProxyHandler'] =
      new (<any>ActorHttpProxy).ProxyHandlerStatic(m.data.proxy);
  }
  await invoke(
    url,
    config,
    (quad: RDF.Quad | undefined) => postMessage({ type: 'quad', quad: quad ? quadToStringQuad(quad) : undefined }),
    (error: Error) => postMessage({ type: 'err', error: error.message }),
    (counter: number, done: boolean) => postMessage({ type: 'counter', counter, done }),
  );
};

async function invoke(
  url: string,
  config: IDereferenceOptions,
  onQuad: (quad: RDF.Quad | undefined) => void,
  onError: (error: Error) => void,
  onCounterUpdate: (counter: number, done: boolean) => void,
): Promise<void> {
  try {
    const { data } = await rdfDereferencer.dereference(url, config);
    let counter = 0;
    onCounterUpdate(counter, false);
    data.on('data', (quad: RDF.Quad) => {
      onCounterUpdate(++counter, false);
      onQuad(quad);
    })
      .on('error', onError)
      .on('prefix', (prefix: string, iri: RDF.NamedNode) => {
        postMessage({ type: 'prefix', prefix, iri: iri.value });
      })
      .on('end', () => {
        onCounterUpdate(counter, true);
        // eslint-disable-next-line unicorn/no-useless-undefined
        onQuad(undefined);
      });
  } catch (e) {
    onError(<Error>e);
  }
}
