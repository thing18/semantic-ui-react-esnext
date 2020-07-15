export class NodeRegistry {

  nodes: Map<any, Set<any>>;

  constructor() {
    this.nodes = new Map();
  }

  add = (nodeRef: any, component: any) => {
    if (this.nodes.has(nodeRef)) {
      const set = this.nodes.get(nodeRef);

      set!.add(component);
      return;
    }

    this.nodes.set(nodeRef, new Set([component]));
  }

  del = (nodeRef: any, component: any) => {
    if (!this.nodes.has(nodeRef)) return;

    const set = this.nodes.get(nodeRef);

    // tslint:disable-next-line: triple-equals
    if (set!.size == 1) {
      this.nodes.delete(nodeRef);
      return;
    }

    set!.delete(component);
  }

  emit = (nodeRef: any, callback: any) => callback(nodeRef, this.nodes.get(nodeRef));
}
