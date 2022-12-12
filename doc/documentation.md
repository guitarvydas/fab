# FAB
![[fab.png]]

The FAB tool parses input text strings and produces output text strings based on grammar and fabrication specifications.

FAB works on the command-line as a node.js script.

FAB handles the use-case of producing single text string from single text input.  For more generality, see Ohm-JS.  

FAB uses Ohm-JS grammar specifications for pattern matching.

FAB uses its own syntax - an SCN (Solution Centric Notation) a nano-DSL - for specifying output strings.

# Grammar Specification
See Ohm-JS documentation.
# Fabrication Specification
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

Parameters in the parameter list, must be suffixed by Ohm-JS iteration operators `?`/`*`/`+` exactly as their corresponding sub-matches are suffixed in the corresponding grammar, or not suffixed at all.  Note that these suffixes appear in the parameter list, not in the right-hand-side of the FAB Rules.

Conventions:
- most often, the parameter names correspond to sub-match Rule names in the grammar
- if a literal match appears in the grammar, e.g. "abc", the parameter is named with the prefix "k", e.g. `kabc`, to make a valid identifier
  - if a sub-match is an iteration - `*` or `+` - the parameter is often suffixed by the letter `s`, e.g. `...[...cs+...]...`, meaning "plural, more than one c"

Note that the above conventions are merely conventions and are not enforced.  Fabrication Rules can contain parameters with arbitrary names.

## String Fabrication
A fabrication string consists of
- the beginning character `‛`
- verbatim characters and/or parameter evaluations
- the ending character `’`

### Verbatim Characters
Strings are free-form and can cross line boundaries.

As a convenience, the escaped character `\n` can be used to denote a newline.  Newlines can, also, be inserted verbatim, cutting strings into several lines, e.g. these are equivalent:
```
‛abc\ndef’
```

```
‛abc
def’
```

### Parameter Evaluation
Names - in JavaScript format - enclosed in the Unicode brackets `«` and `»` denote the values of parameters.

The FAB compiler/engine evaluates parameters in the following manner:
- If the parameter is not suffixed, the parameter contains exactly one match capture.  The compiler/engine simply tree-walks the capture and inserts the resulting string into the fabricated string.
- If the parameter is suffixed, the parameter is compound and contains several match captures.  Each capture is tree-walked, then all of the results of the tree-walks are glued together into a single result string (at this moment, this is done using the JavaScript `.join()` function) and this single string is inserted into the fabricated string.

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

# Warts
At this time, FAB fabrication syntax does not handle nested patterns `(...)?`, and, `(...)*`, and, `(...)+`, and, `(...)`.  FAB may fail in mysterious ways if nested patterns are given in the grammar.

A simple workaround is to break nested items out into separate rules.  For example ```
```
Nested = ("def")+
```
can to be rewritten as  
```
Nested = NestedDef+
NestedDef = "def"
```
TODO: fix this wart in the future.
# Errors
- The FAB transpiler runs a parse and transpilation twice (Using Ohm-JS)
	1. First, FAB parses the input source file using the supplied grammar using parsing engine (Ohm-JS) to produce a CST corresponding to the input source file
	2. Second, FAB transpiles the specified FAB specification and converts it into JavaScript code
	3. The generated CST is combined with step (2) to produce a single string result. 

Step 1 might produce 2 kinds of errors:
4. Grammar syntax errors - the grammar spec is rejected by Ohm-JS
5. Input syntax errors - the grammar is OK, but the input doesn't match with grammar

Step 2 might produce 2 kinds of errors:
6. Spec errors - the fabrication spec, supplied by the programmer, might contain syntax error that cause it to be rejected by Ohm-JS when converting the spec into JavaScript
7. Tree-walking errors - the fabrication spec is OK, but the ensuing tree-walk hits a snag (e.g.  misspelled JavaScript variable name)

Furthermore, otherwise benign bugs in the fabrication spec can result in output that is strange:
- commas
	- if the programmer forgets to provide compound operators in the FAB spec matching the grammar spec, the result will have commas separating sub-strings
- "not a function"
	- if the programmer provides compound operators in the FAB spec that do not conform with the grammar, JavaScript may complain that `???.join is not a function`. 

To debug type 4/5 errors, the programmer should use the Ohm-Editor with the grammar and the input file.

To debug 6/7/8 errors, the programmer should use `pe.html` - the parsing explorer.
# Contributors, Maintainers, Collaborators
Help maintaining this tool would be appreciated.

Experience considered a detriment.
# See Also
- `pe` - parsing explorer
- `fabx` - to see generated JS
- `Ohm-Editor` for developing the grammar