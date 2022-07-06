const assert = require("assert");

const Node = (operator, value, left, right) => {
  const result = function () {
    switch (operator) {
      case "+":
        return left.result() + right.result();
      case "-":
        return left.result() - right.result();
      case "x":
        return left.result() * right.result();
      case "÷":
        return left.result() / right.result();
      default:
        return value;
    }
  };

  const toString = function () {
    switch (operator) {
      case "+":
        return `(${left.toString()} + ${right.toString()})`;
      case "-":
        return `(${left.toString()} - ${right.toString()})`;
      case "x":
        return `(${left.toString()} x ${right.toString()})`;
      case "÷":
        return `(${left.toString()} ÷ ${right.toString()})`;
      default:
        return value.toString();
    }
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

class add extends Operation {
  perform(left, right) {
    return left + right;
  }
  toString(left, right) {
    return `(${left} + ${right})`;
  }
}
class subtract extends Operation {
  perform(left, right) {
    return left - right;
  }
  toString(left, right) {
    return `(${left} - ${right})`;
  }
}
class divide extends Operation {
  perform(left, right) {
    return left / right;
  }
  toString(left, right) {
    return `(${left} ÷ ${right})`;
  }
}
class multiply extends Operation {
  perform(left, right) {
    return left * right;
  }
  toString(left, right) {
    return `(${left} x ${right})`;
  }
}

const tree = Node(
  "÷",
  null,
  Node(
    "+",
    null,
    Node("", 7, null, null),
    Node(
      "x",
      null,
      Node("-", null, Node("", 3, null, null), Node("", 2, null, null)),
      Node("", 5, null, null)
    )
  ),
  Node("", 6, null, null)
);

assert.strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
assert.strictEqual(2, tree.result());
