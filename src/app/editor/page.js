import { StoreProvider } from "@/store";
import { Editor } from "../../components/Editor";

function EditorPage() {
  return (
    <StoreProvider>
      <Editor></Editor>
    </StoreProvider>
  );
}

EditorPage.displayName = "EditorPage"; // Updated the displayName property

export default EditorPage;
