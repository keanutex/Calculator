const node = (
  operator: Operation | null,
  value: number | null,
  left: INode | null,
  right: INode | null
): INode => {
  const result = (): number => {
    if (value || !operator || !left || !right) return value ?? 0;
    return operator.perform(left.result() ?? 0, right.result() ?? 0);
  };

  const toString = (): string => {
    if (value || !operator || !left || !right) return value?.toString() ?? "";
    return operator.toString(left.toString() ?? "", right.toString() ?? "");
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

interface INode {
  operator: Operation | null;
  value: number | null;
  left: INode | null;
  right: INode | null;
  result: () => number;
  toString: () => string;
}

interface Operation {
  toString(left: string, right: string): string;
  perform(left: number, right: number): number;
}

const add = new (class implements Operation {
  perform(left: number, right: number) {
    return left + right;
  }
  toString(left: string, right: string) {
    return `(${left} + ${right})`;
  }
})();

const subtract = new (class implements Operation {
  perform(left: number, right: number) {
    return left - right;
  }
  toString(left: string, right: string) {
    return `(${left} - ${right})`;
  }
})();

const divide = new (class implements Operation {
  perform(left: number, right: number) {
    return left / right;
  }
  toString(left: string, right: string) {
    return `(${left} ÷ ${right})`;
  }
})();

const multiply = new (class implements Operation {
  perform(left: number, right: number) {
    return left * right;
  }
  toString(left: string, right: string) {
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
