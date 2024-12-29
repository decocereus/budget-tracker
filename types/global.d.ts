interface Document {
  startViewTransition(callback: () => void): ViewTransition;
}

interface ViewTransition {
  ready: Promise<void>;
}
