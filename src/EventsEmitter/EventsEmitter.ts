import mitt from 'mitt';

class EventsEmitter<Events extends string, Payloads = unknown> {
  #emitter = mitt();

  on(event: Events, handler: (event: Payloads) => void) {
    this.#emitter.on(event, handler);
  }

  off(event: Events, handler: (event: Payloads) => void) {
    this.#emitter.off(event, handler);
  }

  emit(event: Events, payload: Payloads) {
    this.#emitter.emit(event, payload);
  }
}

export default EventsEmitter;
