export class Hero {

  constructor(public id: number, public name: string, public state = 'inactive') {
    this.id = id;
    this.name = name;
    this.state = state;
  }

  public toggleState(): void {
    this.state = (this.state === 'active' ? 'inactive' : 'active');
  }
}
