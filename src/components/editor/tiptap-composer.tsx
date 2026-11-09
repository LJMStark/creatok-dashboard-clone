"use client";

import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { cn } from "@/lib/utils";

export interface TiptapComposerProps {
  readonly value: string;
  readonly onChange: (text: string) => void;
  readonly onSubmit?: () => void;
  readonly placeholder: string;
  readonly className?: string;
  readonly minHeightClass?: string;
}

export function TiptapComposer({
  value,
  onChange,
  onSubmit,
  placeholder,
  className,
  minHeightClass = "min-h-[84px]",
}: TiptapComposerProps) {
  const editor = useEditor(
    {
      immediatelyRender: false,
      extensions: [
        StarterKit.configure({
          heading: false,
          bulletList: false,
          orderedList: false,
          blockquote: false,
          codeBlock: false,
          horizontalRule: false,
        }),
        Placeholder.configure({
          placeholder,
          emptyEditorClass: "is-editor-empty",
        }),
      ],
      content: value ? `<p>${value}</p>` : "",
      editorProps: {
        attributes: {
          class: cn(
            "tiptap ProseMirror w-full max-h-[200px] overflow-y-auto bg-transparent px-4 py-3 text-sm text-foreground focus:outline-none focus-visible:outline-none",
            minHeightClass,
            className
          ),
        },
        handleKeyDown: (_view, event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onSubmit?.();
            return true;
          }
          return false;
        },
      },
      onUpdate: ({ editor: instance }) => {
        onChange(instance.getText());
      },
    },
    [placeholder]
  );

  useEffect(() => {
    if (!editor) return;
    const currentText = editor.getText();
    if (value !== currentText) {
      editor.commands.setContent(value ? `<p>${value}</p>` : "", false);
    }
  }, [value, editor]);

  return (
    <div data-tiptap-style="" className="relative w-full">
      <EditorContent editor={editor} />
    </div>
  );
}
