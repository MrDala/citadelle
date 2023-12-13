import { EventEmitter } from 'events';
import Evenements from './Evenements';

class EventBus {
  private static instance: EventBus | null = null;
  private eventEmitter: EventEmitter;
  private registreEvents: Array<{eventType: Evenements['type'], data?: any}>;

  private constructor() {
    this.eventEmitter = new EventEmitter();
    this.registreEvents = new Array();
  }

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }

    return EventBus.instance;
  }

  public on(eventType: Evenements['type'], listener: (data: any) => void) {
    const emptyListener = () => {};
    this.eventEmitter.on(eventType, listener || emptyListener);
  }  
  
  public emit(eventType: Evenements['type'], data?: any) {
    this.eventEmitter.emit(eventType, data);
    this.registreEvents.push({eventType, data});
  }  

  public getRegistre(): Array<{eventType: Evenements['type'], data?: any}> {
    return this.registreEvents;
  }
}

export default EventBus;