import * as ActorHttpProxy from '@comunica/actor-http-proxy';
import type * as RDF from '@rdfjs/types';
import { rdfDereferencer } from 'rdf-dereference';
import type { IDereferenceOptions } from 'rdf-dereference/lib/RdfDereferencerBase';
import { quadToStringQuad } from 'rdf-string';

globalThis.onmessage = async(m: any) => {
  const config: IDereferenceOptions = {};
  if (m.data.proxy) {
    (<any> config)['@comunica/actor-http-proxy:httpProxyHandler'] =
        new (<any> ActorHttpProxy).ProxyHandlerStatic(m.data.proxy);
  }
  await invoke(
    <string> m.data.url,
    config,
    (quad: RDF.Quad) => postMessage({ type: 'quad', quad: quadToStringQuad(quad) }),
    (error: Error) => postMessage({ type: 'err', error: error.message }),
    (counter: number, done: boolean) => postMessage({ type: 'counter', counter, done }),
  );
};

async function invoke(
  url: string,
  config: IDereferenceOptions,
  onQuad: (quad: RDF.Quad) => void,
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
      .on('end', () => {
        onCounterUpdate(counter, true);
      });
  } catch (e) {
    onError(<Error> e);
  }
}
