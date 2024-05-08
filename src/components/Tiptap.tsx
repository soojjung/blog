"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Toolbar from "./Toolbar";

const Tiptap = ({
  onChange = () => {},
  content = "",
  editable = true,
}: any) => {
  const editStyle = {
    attributes: {
      class:
        "flex flex-col px-5 py-5 justify-start text-[17px] font-light text-gray-900 items-start w-full pt-4 rounded-bl-md rounded-br-md outline-none min-h-[250px] border-b border-r border-l border-gray-300 ",
    },
  };
  const viewStyle = {
    attributes: {
      class:
        "text-[17px] font-light text-gray-900 items-start w-full pt-4 outline-none ",
    },
  };

  const handleChange = (newContent: string) => {
    onChange(newContent);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
    editable: editable,
    editorProps: editable ? editStyle : viewStyle,
    autofocus: true,
  });

  return (
    <div className="">
      {editable === true ? <Toolbar editor={editor} content={content} /> : null}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
