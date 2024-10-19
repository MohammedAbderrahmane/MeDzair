import { createStore } from "solid-js/store";

const DELAY = 3000;

function useNotification() {
  const [notification, setStatus] = createStore();

  const setLoading = () => setStatus({ loading: true });
  
  const setSuccess = (message) => {
    setStatus({ message: message, success: true });
    clear();
  };

  const setFailure = (message) => {
    setStatus({ message: message, success: false });
    clear();
  };

  const clear = () => setTimeout(() => setStatus({}), DELAY);

  return {
    notification,
    setSuccess,
    setFailure,
    setLoading,
  };
}

export default useNotification;
