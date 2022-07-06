const Node = (operator, value, left, right) => {
  const result = function () {
    if (value) return value;
    return operator.perform(left.result(), right.result());
  };

  const toString = function () {
    if (value) return value;
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
