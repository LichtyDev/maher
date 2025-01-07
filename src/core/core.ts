export interface ICore {
  id?: string;
}

export abstract class Core {
  id: string;

  constructor(props: ICore) {
    this.id = props.id || "";
  }

  inheritId(id: string) {
    if (id.length === 0) return `${this.id}Undefined`;

    const capitalisedId = id[0].toUpperCase() + id.slice(1);

    return `${this.id}${capitalisedId}`;
  }
}
