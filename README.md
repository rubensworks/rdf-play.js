# RDF Play

[![Build status](https://github.com/rubensworks/rdf-play.js/workflows/CI/badge.svg)](https://github.com/rubensworks/rdf-play.js/actions?query=workflow%3ACI)

This is a Web-based tool for performing simple RDF operations,
such as parsing, serializing, dereferencing from URLs, and converting between content types.

**Live version: https://rdf-play.rubensworks.net/**

Internally, this library makes use of RDF parsers from the [Comunica framework](https://github.com/comunica/comunica),
which enable streaming processing of RDF.

The following RDF serializations are supported:

| **Name**                                                                                                                                                                                 | **Content type** | **Extensions** |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| ---------------- | ------------- |
| [TriG 1.2](https://www.w3.org/TR/rdf12-trig/)                                                                                                                                            | `application/trig` | `.trig` |
| [N-Quads 1.2](https://www.w3.org/TR/rdf12-n-quads/)                                                                                                                                            | `application/n-quads` | `.nq`, `.nquads` |
| [Turtle 1.2](https://www.w3.org/TR/rdf12-turtle/)                                                                                                                                              | `text/turtle` | `.ttl`, `.turtle` |
| [N-Triples 1.2](https://www.w3.org/TR/rdf12-n-triples/)                                                                                                                                        | `application/n-triples` | `.nt`, `.ntriples` |
| [Notation3](https://www.w3.org/TeamSubmission/n3/)                                                                                                                                       | `text/n3` | `.n3` |
| [JSON-LD 1.1](https://json-ld.org/)                                                                                                                                                      | `application/ld+json`, `application/json` | `.json`, `.jsonld` |
| [RDF/XML 1.2](https://www.w3.org/TR/rdf12-xml/)                                                                                                                                 | `application/rdf+xml` | `.rdf`, `.rdfxml`, `.owl` |
| [RDFa 1.1](https://www.w3.org/TR/rdfa-in-html/) and script RDF data tags [HTML](https://html.spec.whatwg.org/multipage/)/[XHTML](https://www.w3.org/TR/xhtml-rdfa/)                      | `text/html`, `application/xhtml+xml` | `.html`, `.htm`, `.xhtml`, `.xht` |
| [Microdata](https://w3c.github.io/microdata-rdf/)                                                                                                                                        | `text/html`, `application/xhtml+xml` | `.html`, `.htm`, `.xhtml`, `.xht` |
| [RDFa 1.1](https://www.w3.org/TR/2008/REC-SVGTiny12-20081222/metadata.html#MetadataAttributes) in [SVG](https://www.w3.org/TR/SVGTiny12/)/[XML](https://html.spec.whatwg.org/multipage/) | `image/svg+xml`,`application/xml` | `.xml`, `.svg`, `.svgz` |
| [SHACL Compact Syntax](https://w3c.github.io/shacl/shacl-compact-syntax/)                                                                                                                | `text/shaclc` | `.shaclc`, `.shc` |
| [Extended SHACL Compact Syntax](https://github.com/jeswr/shaclcjs#extended-shacl-compact-syntax)                                                                                         | `text/shaclc-ext` | `.shaclce`, `.shce` |

*When parsing HTML, script data blocks will also be detected. If they contain RDF, they will also be parsed with the appropriate parsers.*

## License
This software is written by [Ruben Taelman](http://rubensworks.net/).

This code is released under the [MIT license](http://opensource.org/licenses/MIT).
