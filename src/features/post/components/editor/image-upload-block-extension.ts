import { Node } from '@tiptap/react';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { ImageUploadBlockNodeView } from './image-upload-block-node-view';

export const ImageUploadBlock = Node.create({
  name: 'imageUploadBlock',
  group: 'block',
  inline: false,
  selectable: true,
  draggable: false,
  atom: true,

  addAttributes() {
    return {
      uploadId: {
        default: null,
      },
      fileName: {
        default: '이미지 파일',
      },
      fileSize: {
        default: 0,
      },
      progress: {
        default: 0,
      },
      error: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="image-upload-block"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, unknown> }) {
    return ['div', { 'data-type': 'image-upload-block', ...HTMLAttributes }];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageUploadBlockNodeView);
  },
});
