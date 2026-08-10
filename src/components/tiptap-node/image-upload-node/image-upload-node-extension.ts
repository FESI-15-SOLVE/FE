import { mergeAttributes, Node } from '@tiptap/react';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { ImageUploadNode as ImageUploadNodeComponent } from '@/components/tiptap-node/image-upload-node/image-upload-node';
import type { NodeType } from '@tiptap/pm/model';

export type UploadFunction = (
  file: File,
  onProgress?: (event: { progress: number }) => void,
  abortSignal?: AbortSignal,
) => Promise<string>;

export interface ImageUploadNodeOptions {
  /**
   * The type of the node.
   * @default 'image'
   */
  type?: string | NodeType | undefined;
  /**
   * Acceptable file types for upload.
   * @default 'image/*'
   */
  accept?: string;
  /**
   * Maximum number of files that can be uploaded.
   * @default 1
   */
  limit?: number;
  /**
   * Maximum file size in bytes (0 for unlimited).
   * @default 0
   */
  maxSize?: number;
  /**
   * Function to handle the upload process.
   */
  upload?: UploadFunction;
  /**
   * Callback for upload errors.
   */
  onError?: (error: Error) => void;
  /**
   * Callback for successful uploads.
   */
  onSuccess?: (url: string) => void;
  /**
   * HTML attributes to add to the image element.
   * @default {}
   * @example { class: 'foo' }
   */
  HTMLAttributes: Record<string, unknown>;
}

export interface ImageUploadStorage {
  pendingFiles: Map<string, File[]>;
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    imageUpload: {
      setImageUploadNode: (
        options?: Partial<ImageUploadNodeOptions> & { files?: File[] },
        pos?: number,
      ) => ReturnType;
    };
  }
}

/**
 * A Tiptap node extension that creates an image upload component.
 * @see registry/tiptap-node/image-upload-node/image-upload-node
 */
export const ImageUploadNode = Node.create<
  ImageUploadNodeOptions,
  ImageUploadStorage
>({
  name: 'imageUpload',

  group: 'block',

  draggable: true,

  selectable: true,

  atom: true,

  addOptions() {
    return {
      type: 'image',
      accept: 'image/*',
      limit: 1,
      maxSize: 0,
      upload: undefined,
      onError: undefined,
      onSuccess: undefined,
      HTMLAttributes: {},
    };
  },

  addStorage() {
    return {
      pendingFiles: new Map<string, File[]>(),
    };
  },

  addAttributes() {
    return {
      uploadId: {
        default: null,
      },
      accept: {
        default: this.options.accept,
      },
      limit: {
        default: this.options.limit,
      },
      maxSize: {
        default: this.options.maxSize,
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="image-upload"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes({ 'data-type': 'image-upload' }, HTMLAttributes),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageUploadNodeComponent);
  },

  addCommands() {
    return {
      setImageUploadNode:
        (options, pos) =>
        ({ commands }) => {
          const uploadId = crypto.randomUUID();

          if (options?.files?.length) {
            this.storage.pendingFiles.set(uploadId, options.files);
          }

          const { files: _files, ...rest } = options ?? {};
          const attrs = { ...rest, uploadId };

          return typeof pos === 'number'
            ? commands.insertContentAt(pos, { type: this.name, attrs })
            : commands.insertContent({ type: this.name, attrs });
        },
    };
  },
});

export default ImageUploadNode;
