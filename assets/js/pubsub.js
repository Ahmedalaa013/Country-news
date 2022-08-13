export class Pubsub {
  static events = {};
  static subscribe(evName, fn) {
    this.events[evName] = this.events[evName] || [];
    this.events[evName].push(fn);
  }
  static publish(evName, data) {
    if (this.events[evName]) {
      this.events[evName].forEach((f) => {
        f(data);
      });
    }
  }
}
