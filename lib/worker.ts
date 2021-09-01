import * as ActorHttpProxy from "@comunica/actor-http-proxy";
import rdfDereferencer from "rdf-dereference";
import * as RDF from "@rdfjs/types";
import {quadToStringQuad} from "rdf-string";

self.onmessage = (m: any) => {
  const config: any = {};
  if (m.data.proxy) {
    config['@comunica/actor-http-proxy:httpProxyHandler'] = new (<any> ActorHttpProxy).ProxyHandlerStatic(m.data.proxy);
  }
  invoke(m.data.url, config,
    (quad: RDF.Quad) => postMessage({ type: 'quad', quad: quadToStringQuad(quad) }, undefined),
    (error: Error) => postMessage({ type: 'err', error: error.message }, undefined),
    (counter: number, done: boolean) => postMessage({ type: 'counter', counter, done }, undefined),
  );
};

async function invoke(url: string, config: any, onQuad: (quad: RDF.Quad) => void, onError: (error: Error) => void,
                      onCounterUpdate: (counter: number, done: boolean) => void) {
  try {
    const { quads } = await rdfDereferencer.dereference(url, config);
    let counter = 0;
    onCounterUpdate(counter, false);
    quads.on('data', (quad: RDF.Quad) => {
      onCounterUpdate(++counter, false);
      onQuad(quad);
    })
      .on('error', onError)
      .on('end', () => {
        onCounterUpdate(counter, true);
      });
  } catch (e) {
    onError(e);
  }
}
