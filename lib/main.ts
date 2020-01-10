import rdfDereferencer from "rdf-dereference";
import * as RDF from "rdf-js";

async function invoke() {
  const { quads } = await rdfDereferencer.dereference('http://dbpedia.org/page/12_Monkeys');
  quads.on('data', (quad: RDF.Quad) => console.log(quad))
    .on('error', (error: Error) => console.error(error))
    .on('end', () => console.log('All done!'));
}

//invoke();