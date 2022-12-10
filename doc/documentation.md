# FAB

The FAB tool parses input text strings and produces output text strings based on grammar and fabrication specifications.

FAB handles the use-case of producing single text string from single text input.  For more generality, see Ohm-JS.  

FAB uses Ohm-JS grammar specifications for pattern matching.

FAB uses its own syntax - an SCN (Solution Centric Notation) a nano-DSL - for specifying output strings.

# Grammar Specification
See Ohm-JS documentation.
# Fabrication Specification
[[fabricationsyntax]]
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
We expect to fix this wart in the future.
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
- pe - parsing explorer
- fmt-js - to see produced JS
- Ohm-Editor for developing the grammar
- 