import mitt, { Emitter } from 'mitt';

// @ignore
class EventsEmitter<Events extends string, Payloads = unknown> {
  #emitter: Emitter<Record<Events, Payloads>> = mitt();

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
