export interface CustomMdastNode {
  type: string;
  value?: string;
  children?: CustomMdastNode[];
  data?: {
    hName?: string;
    [key: string]: unknown;
  };
}

/**
 * TipTap 전용 마크다운 문법(++, ==)을 AST 레벨에서 ins/mark 노드로 파싱하는
 * 타입 안전 커스텀 remark 플러그인
 *
 * ++text++ -> <ins>text</ins>  (밑줄)
 * ==text== -> <mark>text</mark> (하이라이트)
 *
 * 주의:
 * - 짝이 맞지 않는 delimiter(닫는 ++/== 없이 여는 것만 있는 경우)는
 *   변환하지 않고 원본 텍스트 그대로 둔다.
 * - delimiter 문자(+, =)가 안쪽 텍스트에 포함된 경우는 매칭하지 않는다.
 *   (예: "c++ 언어" 같은 일반 텍스트 오탐 방지)
 */
export function remarkTiptapMarks() {
  // 안쪽에 delimiter 문자가 없는 경우만 매칭 -> 짝 안맞는 delimiter가
  // 다음 delimiter까지 통째로 삼키는 사고 방지
  const MARK_REGEX = /(\+\+|==)([^+=]+?)\1/g;

  return (tree: CustomMdastNode) => {
    visit(tree);
  };

  function visit(node: CustomMdastNode): void {
    if (!node.children || !Array.isArray(node.children)) return;

    let hasTextWithMatch = false;
    for (const child of node.children) {
      if (
        child.type === 'text' &&
        typeof child.value === 'string' &&
        containsDelimiter(child.value)
      ) {
        hasTextWithMatch = true;
        break;
      }
    }

    // 이 레벨에 변환 대상이 전혀 없으면 재귀만 타고 배열 재생성은 스킵 (성능)
    if (!hasTextWithMatch) {
      for (const child of node.children) {
        visit(child);
      }
      return;
    }

    const newChildren: CustomMdastNode[] = [];

    for (const child of node.children) {
      if (child.type === 'text' && typeof child.value === 'string') {
        newChildren.push(...splitTextNode(child.value));
      } else {
        visit(child);
        newChildren.push(child);
      }
    }

    node.children = newChildren;
  }

  function containsDelimiter(value: string): boolean {
    MARK_REGEX.lastIndex = 0;
    const matched = MARK_REGEX.test(value);
    MARK_REGEX.lastIndex = 0;
    return matched;
  }

  function splitTextNode(value: string): CustomMdastNode[] {
    const result: CustomMdastNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    MARK_REGEX.lastIndex = 0;
    while ((match = MARK_REGEX.exec(value)) !== null) {
      const [fullMatch, delimiter, innerText] = match;
      const matchIndex = match.index;

      if (matchIndex > lastIndex) {
        result.push({
          type: 'text',
          value: value.slice(lastIndex, matchIndex),
        });
      }

      const tagName = delimiter === '++' ? 'ins' : 'mark';
      result.push({
        type: tagName,
        data: { hName: tagName },
        children: [{ type: 'text', value: innerText }],
      });

      lastIndex = matchIndex + fullMatch.length;
    }

    // 매칭이 하나도 없었으면(이론상 containsDelimiter 통과했으니 항상 있음) 원본 그대로
    if (lastIndex < value.length) {
      result.push({ type: 'text', value: value.slice(lastIndex) });
    }

    return result;
  }
}
