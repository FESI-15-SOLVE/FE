import Image from '@tiptap/extension-image';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { CustomImageNodeView } from './custom-image-node-view';

export interface CustomImageOptions {
  onRetry?: (file: File, pos: number) => void;
}

export const CustomImage = Image.extend<CustomImageOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      onRetry: undefined,
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      isUploading: {
        default: false,
        parseHTML: (element) => element.getAttribute('data-uploading') === 'true',
        renderHTML: (attributes) =>
          attributes.isUploading ? { 'data-uploading': 'true' } : {},
      },
      uploadError: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-upload-error'),
        renderHTML: (attributes) =>
          attributes.uploadError
            ? { 'data-upload-error': String(attributes.uploadError) }
            : {},
      },
      rawFile: {
        default: null,
        parseHTML: () => null,
        renderHTML: () => ({}),
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(CustomImageNodeView);
  },
});
