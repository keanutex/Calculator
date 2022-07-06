const node = (
  operator: Operation | null,
  value: number | null,
  left: any,
  right: any
) => {
  const result = function () {
    if (value || !operator) return value;
    return operator.perform(left.result(), right.result());
  };

  const toString = function () {
    if (value || !operator) return value;
    return operator.toString(left.toString(), right.toString());
  };

  return {
    operator,
    value,
    left,
    right,
    result,
    toString,
  };
};

interface Operation {
  toString(left: number, right: number): string;
  perform(left: number, right: number): number;
}

const add = new (class implements Operation {
  perform(left: number, right: number) {
    return left + right;
  }
  toString(left: number, right: number) {
    return `(${left} + ${right})`;
  }
})();

const subtract = new (class implements Operation {
  perform(left: number, right: number) {
    return left - right;
  }
  toString(left: number, right: number) {
    return `(${left} - ${right})`;
  }
})();

const divide = new (class implements Operation {
  perform(left: number, right: number) {
    return left / right;
  }
  toString(left: number, right: number) {
    return `(${left} ÷ ${right})`;
  }
})();

const multiply = new (class implements Operation {
  perform(left: number, right: number) {
    return left * right;
  }
  toString(left: number, right: number) {
    return `(${left} x ${right})`;
  }
})();

//Testing

const assert = require("assert");

const expression = node(
  subtract,
  null,
  node(
    multiply,
    null,
    node(
      add,
      null,
      node(null, 50, null, null),
      node(divide, null, node(null, 2, null, null), node(null, 5, null, null))
    ),
    node(null, 6, null, null)
  ),
  node(null, 10, null, null)
);

assert.strictEqual(expression.toString(), "(((50 + (2 ÷ 5)) x 6) - 10)");
assert.strictEqual(expression.result(), 292.4);
