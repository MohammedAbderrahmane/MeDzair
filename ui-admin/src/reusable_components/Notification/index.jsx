function Notification({ status }) {
  if (status.loading) return <div class="notification">loading ...</div>;
  return (
    <div class={`notification ${status.success ? "success" : "failure"}`}>
      {status.message}
    </div>
  );
}

export default Notification;
