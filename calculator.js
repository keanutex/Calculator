const Node = (operator, value, left, right) => {
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

class Operation {
  perform(left, right) {}
  toString(left, right) {}
}

const add = new (class extends Operation {
  perform(left, right) {
    return left + right;
  }
  toString(left, right) {
    return `(${left} + ${right})`;
  }
})();

const subtract = new (class extends Operation {
  perform(left, right) {
    return left - right;
  }
  toString(left, right) {
    return `(${left} - ${right})`;
  }
})();

const divide = new (class extends Operation {
  perform(left, right) {
    return left / right;
  }
  toString(left, right) {
    return `(${left} ÷ ${right})`;
  }
})();

const multiply = new (class extends Operation {
  perform(left, right) {
    return left * right;
  }
  toString(left, right) {
    return `(${left} x ${right})`;
  }
})();

//Testing

const assert = require("assert");

const expression = Node(
  subtract,
  null,
  Node(
    multiply,
    null,
    Node(
      add,
      null,
      Node(null, 50, null, null),
      Node(divide, null, Node(null, 2, null, null), Node(null, 5, null, null))
    ),
    Node(null, 6, null, null)
  ),
  Node(null, 10, null, null)
);

assert.strictEqual(expression.toString(), "(((50 + (2 ÷ 5)) x 6) - 10)");
assert.strictEqual(expression.result(), 292.4);

//Testing Required

const tree = Node(
  divide,
  null,
  Node(
    add,
    null,
    Node(null, 7, null, null),
    Node(
      multiply,
      null,
      Node(
        subtract,
        null,
        Node(null, 3, null, null),
        Node(null, 2, null, null)
      ),
      Node(null, 5, null, null)
    )
  ),
  Node(null, 6, null, null)
);

assert.strictEqual(tree.toString(), "((7 + ((3 - 2) x 5)) ÷ 6)");
assert.strictEqual(tree.result(), 2);
