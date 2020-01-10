import rdfDereferencer from "rdf-dereference";
import * as RDF from "rdf-js";
import {quadToStringQuad} from "rdf-string";

self.onmessage = (m: any) => {
  invoke(m.data.url,
    (quad: RDF.Quad) => postMessage({ type: 'quad', quad: quadToStringQuad(quad) }, null, null),
    (error: Error) => postMessage({ type: 'error', error}, null, null),
    (counter: number, done: boolean) => postMessage({ type: 'counter', counter, done }, null, null));
};

async function invoke(url: string, onQuad: (quad: RDF.Quad) => void, onError: (error: Error) => void,
                      onCounterUpdate: (counter: number, done: boolean) => void) {
  try {
    const { quads } = await rdfDereferencer.dereference(url);
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
