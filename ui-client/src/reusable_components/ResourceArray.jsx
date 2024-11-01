import { Match, Switch } from "solid-js";

function ResourceArray({
  resources,
  RenderItem,
  LoadingIndicator,
  ErrorDisplay,
}) {
  return (
    <Switch>
      <Match when={resources.loading}>
        <p>Loading...</p>
      </Match>
      <Match when={resources.error}>
        <p>Error: {resources.error + ""}</p>
      </Match>
      <Match when={resources()}>
        {!!resources().length ? (
          <For each={resources()}>{(resource) => RenderItem(resource)}</For>
        ) : (
          <p>No resource found</p>
        )}
      </Match>
    </Switch>
  );
}

export default ResourceArray;
