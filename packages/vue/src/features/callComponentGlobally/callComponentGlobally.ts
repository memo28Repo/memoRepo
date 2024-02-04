import { createVNode, render } from "vue";

type Component = Parameters<typeof createVNode>[0]

type Props = Parameters<typeof createVNode>[1]


type ComponentInternalInstance = ReturnType<typeof createVNode>["component"]

type callComponentGloballyReturns<T> = {
  render(): ComponentInternalInstance & {
    exposed: T
  }
  destruction(): void
}


export function callComponentGlobally<T = unknown>(com: Component, props: Props, el?: HTMLElement): callComponentGloballyReturns<T> {
  const vNode = createVNode(com, props);
  const container = document.createElement("div");

  return {
    // @ts-ignore
    render() {
      render(vNode, el || container);
      document.body.appendChild(container);
      return vNode.component;
    },
    destruction() {
      render(null, el || container);
    }
  };
}
