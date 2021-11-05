import "./App.css";
import PostModal from "./components/PostModal";
import Posts from "./components/Posts";
import Sidebar from "./components/Sidebar";
import ModalProvider from "./context/ModalContext";
import ViewProvider from "./context/ViewContext";

function App() {
  return (
    <ModalProvider>
      <ViewProvider>
        <Sidebar />
        <Posts />
        <PostModal />
      </ViewProvider>
    </ModalProvider>
  );
}

export default App;
