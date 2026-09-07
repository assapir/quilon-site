// Quilon TextMate grammar, copied from `editors/vscode/syntaxes/quilon.tmLanguage.json`
// in https://github.com/assapir/quilon (minus `$schema` and descriptive `comment` fields).
// Upstream revision: 552e8b34b346980e752b0d87aae3050abe5f281d. Re-copy when it changes.

export const QUILON_GRAMMAR = {
  name: "Quilon",
  scopeName: "source.quilon",
  patterns: [
    { include: "#comments" },
    { include: "#strings" },
    { include: "#numbers" },
    { include: "#constants" },
    { include: "#module-lines" },
    { include: "#entry-point" },
    { include: "#unit" },
    { include: "#builtin-types" },
    { include: "#type-names" },
    { include: "#function-calls" },
    { include: "#collection-fences" },
    { include: "#operators" },
    { include: "#punctuation" },
  ],
  repository: {
    comments: {
      patterns: [
        {
          name: "comment.line.tilde.quilon",
          begin: "~",
          end: "$",
          beginCaptures: {
            0: { name: "punctuation.definition.comment.quilon" },
          },
        },
      ],
    },
    strings: {
      name: "string.quoted.double.quilon",
      begin: '"',
      end: '"',
      beginCaptures: {
        0: { name: "punctuation.definition.string.begin.quilon" },
      },
      endCaptures: {
        0: { name: "punctuation.definition.string.end.quilon" },
      },
      patterns: [
        {
          name: "constant.character.escape.quilon",
          match: "\\\\.",
        },
      ],
    },
    numbers: {
      name: "constant.numeric.quilon",
      match: "\\b[0-9]+(\\.[0-9]+)?\\b",
    },
    constants: {
      patterns: [
        {
          name: "constant.language.boolean.quilon",
          match: "\\b(true|false)\\b",
        },
        {
          name: "constant.language.wildcard.quilon",
          match: "(?<![\\p{L}\\p{N}_])_(?![\\p{L}\\p{N}_])",
        },
      ],
    },
    "module-lines": {
      patterns: [
        {
          name: "meta.import.quilon",
          match: '(<<)\\s*([A-Za-z0-9_.\\/\\\\"-]+)?',
          captures: {
            1: { name: "keyword.control.import.quilon" },
            2: { name: "entity.name.namespace.quilon" },
          },
        },
        {
          name: "keyword.control.export.quilon",
          match: ">>",
        },
      ],
    },
    "entry-point": {
      name: "keyword.control.entrypoint.quilon",
      match: "\\^",
    },
    unit: {
      name: "support.type.builtin.unit.quilon",
      match: "\\$",
    },
    "builtin-types": {
      name: "support.type.builtin.quilon",
      match: "\\b(Num|Text|Bool)\\b",
    },
    "type-names": {
      name: "entity.name.type.quilon",
      match: "\\b[\\p{Lu}\\p{Lt}][\\p{L}\\p{N}_]*\\b",
    },
    "function-calls": {
      match: "\\b((?!\\p{Lu})(?!\\p{Lt})[\\p{L}_][\\p{L}\\p{N}_]*)\\s*(?=\\()",
      captures: {
        1: { name: "entity.name.function.quilon" },
      },
    },
    "collection-fences": {
      patterns: [
        { name: "punctuation.definition.collection.begin.quilon", match: "\\[\\|" },
        { name: "punctuation.definition.collection.end.quilon", match: "\\|\\]" },
      ],
    },
    operators: {
      // Order matters: multi-char operators must precede any single-char rule
      // that is a prefix of them.
      patterns: [
        { name: "keyword.operator.assignment.mutable.quilon", match: ":=" },
        { name: "keyword.operator.type-annotation.quilon", match: "::" },
        { name: "keyword.operator.arrow.body.quilon", match: "=>" },
        { name: "keyword.operator.arrow.return.quilon", match: "->" },
        { name: "keyword.operator.arrow.range.quilon", match: "<-" },
        { name: "keyword.operator.comparison.quilon", match: "==|!=|<=|>=" },
        { name: "keyword.operator.logical.quilon", match: "&&|\\|\\|" },
        { name: "keyword.operator.logical.quilon", match: "!" },
        { name: "keyword.operator.match.quilon", match: "\\?|\\|" },
        { name: "keyword.operator.assignment.quilon", match: "=" },
        { name: "keyword.operator.arithmetic.quilon", match: "[+\\-*/%]" },
        { name: "punctuation.definition.block.begin.quilon", match: "<(?=[ \\t]*$)" },
        {
          name: "punctuation.definition.block.end.quilon",
          match: ">(?![ \\t]*(?:[\\p{L}\\p{N}_\"$@(\\[{]|-(?![>+])|!(?!=)))",
        },
        { name: "keyword.operator.comparison.quilon", match: "[<>]" },
      ],
    },
    punctuation: {
      patterns: [
        { name: "punctuation.separator.colon.quilon", match: ":" },
        { name: "punctuation.separator.comma.quilon", match: "," },
        { name: "punctuation.accessor.quilon", match: "\\." },
      ],
    },
  },
};
