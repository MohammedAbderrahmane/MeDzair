import { Match, Switch } from "solid-js";
import ErrorDiv from "./ErrorDiv";
import LoadingDiv from "./LoadingDiv";

function ResourceArray({
  resources,
  RenderItem,
  LoadingIndicator,
  ErrorDisplay,
}) {
  return (
    <Switch>
      <Match when={resources.loading}>
        <LoadingDiv />
      </Match>
      <Match when={resources.error}>
        <ErrorDiv
          errorType={resources.error.status}
          errorMessage={resources.error.message}
        />
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
