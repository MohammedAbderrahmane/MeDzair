import { Match, Switch } from "solid-js";

function ResourceArray({
  resources,
  RenderItem,
  LoadingIndicator,
  ErrorDisplay,
  EmptyDisplay = <p>empty resource</p>,
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
          EmptyDisplay
        )}
      </Match>
    </Switch>
  );
}

export default ResourceArray;
