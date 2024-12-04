import { createSignal } from "solid-js";

function Togglable({ useSameButton, showLabel, hideLabel, children }) {
  showLabel = showLabel || "show";
  hideLabel = hideLabel || "hide";
  const [visible, setVisible] = createSignal(false);

  const toggleVisibility = () => {
    setVisible(!visible());
  };

  if (useSameButton)
    return (
      <>
        <button onClick={toggleVisibility}>
          {!visible() ? showLabel : hideLabel}
        </button>
        {visible() && children}
      </>
    );

  return (
    <>
      {visible() ? (
        <div>
          {children}
          <button style={{ display: "inline" }} onClick={toggleVisibility}>
            cancel
          </button>
        </div>
      ) : (
        <>
          <button onClick={toggleVisibility}>{showLabel}</button>
        </>
      )}
    </>
  );
}

export default Togglable;
