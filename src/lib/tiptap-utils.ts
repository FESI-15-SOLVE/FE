import type { Editor } from '@tiptap/react';
import { Selection, TextSelection } from '@tiptap/pm/state';

/**
 * Checks if a value is a valid number (not null, undefined, or NaN)
 */
export function isValidPosition(pos: number | null | undefined): pos is number {
  return typeof pos === 'number' && pos >= 0;
}

/**
 * Moves the focus to the next node in the editor
 */
export function focusNextNode(editor: Editor): boolean {
  const { state, view } = editor;
  const { doc, selection } = state;

  const nextSel = Selection.findFrom(selection.$to, 1, true);
  if (nextSel) {
    view.dispatch(state.tr.setSelection(nextSel).scrollIntoView());
    return true;
  }

  const paragraphType = state.schema.nodes.paragraph;
  if (!paragraphType) {
    console.warn('No paragraph node type found in schema.');
    return false;
  }

  const end = doc.content.size;
  const para = paragraphType.create();
  let tr = state.tr.insert(end, para);

  const $inside = tr.doc.resolve(end + 1);
  tr = tr.setSelection(TextSelection.near($inside)).scrollIntoView();
  view.dispatch(tr);
  return true;
}

/**
 * TipTap 마크다운 텍스트에서 마크다운 및 확장 문법(++, == 등)을 제거하고 순수 텍스트만 추출
 */
export function stripTiptapMarkdown(markdown?: string): string {
  if (!markdown) return '';
  return (
    markdown
      .replace(/!\[.*?\]\(.*?\)/g, '')
      // 코드부터 먼저 처리 (내용 보호)
      .replace(/`{3}[\s\S]*?`{3}/g, '')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/\+\+(.*?)\+\+/g, '$1')
      .replace(/==(.*?)==/g, '$1')
      .replace(/~~(.*?)~~/g, '$1')
      // bold 먼저 (**, __), 그다음 italic (*, _) — underscore는 단어 경계 체크
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      .replace(/(?<![\w*])\*([^*\n]+?)\*(?!\w)/g, '$1')
      .replace(/(?<![\w_])_([^_\n]+?)_(?!\w)/g, '$1')
      .replace(/^[\s\t]*([\*\-\+]|\d+\.)\s+/gm, '')
      .replace(/^#+\s+/gm, '')
      .replace(/^>\s+/gm, '')
      .replace(/^[-*_]{3,}\s*$/gm, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  );
}
