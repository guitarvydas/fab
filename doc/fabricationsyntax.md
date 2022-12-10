A FAB specification consists of one or more Rules.

There must be exactly one Rule for each grammar Rule.

Each Rule is free-format (can cross line boundaries) and consists of 3 parts:
1. name
2. parameter list
3. string fabrication and rewriting

## Name
The *name* must correspond exactly (including capitalization) with a Rule in the grammar. 

## Parameter List

There must be exactly one parameter for each match item in the corresponding grammar Rule.

The name of the parameter is arbitrary and can be any valid identifier in JavaScript format.

Parameters in the parameter list, must be suffixed by Ohm-JS iteration operators `?`/`*`/`+` exactly as their corresponding sub-matches are suffixed in the corresponding grammar.  Note that these suffixes appear in the parameter list, not in the right-hand-side of the FAB Rules.

Conventions:
- most often, the parameter names used correspond to sub-match Rule names in the grammar
- if a literal match appears in the grammar, e.g. "abc", the parameter is named with the prefix "k", e.g. `kabc`
  - if a sub-match is an iteration - `*` or `+` - the parameter is often suffixed by the letter `s`.

Note that the above conventions are merely conventions and are not enforced.  Fabrication Rules can contain parameters with arbitrary names.

## String Fabrication
A fabrication string consists of
- the beginning character `‛`
- verbatim characters and/or parameter evaluations
- the ending character `’`

### Verbatim Characters
Strings are free-form and can cross line boundaries.

As a convenience, the escaped character `\n` can be used to denote a newline (newlines can, also, be inserted verbatim, cutting strings into several lines).

### Parameter Evaluation
Names - in JavaScript format - enclosed in the Unicode brackets `«` and `»` denote the values of parameters.

The FAB compiler/engine evaluates parameters in the following manner:
- If the parameter is not suffixed, the parameter contains exactly one match capture.  The compiler/engine simply tree-walks the capture and inserts the resulting string into the fabricated string.
- If the parameter is suffixed, the parameter is compound and contains several match captures.  Each capture is tree-walked, then all of the results of the tree-walk are glued together into a single result string (at this moment, this is done using the JavaScript `.join()` function) and this single string is inserted into the fabricated string.

# Examples
## Verbatim Only
This FAB Rule always return "xyz" regardless of what was matched by the grammar:
`Rule1 [a b c] = ‛xyz`’`

## Simple Parameter
This FAB Rule returns the string value of what has been captured in `b` prefixed by "x" and suffixed by "z":
`Rule2 [a b c] = ‛x«b»z`’`

## Compound Parameter
This FAB Rule returns the glued-together string values of all of the captures in `qs` prefixed by "x" and suffixed by "z":
`Rule3 [a qs+ c] = ‛x«qs»z`’`
