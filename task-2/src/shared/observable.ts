type Listener<T> = (newValue: T) => void;

export interface IObservable<T> {
	notify: () => void
	subscribe: (listener: Listener<T>) => void

	get value(): T
	set value(value: T)
}

export class Observable<T> implements IObservable<T> {
	private listeners: Listener<T>[] = [];

	constructor(
		protected _value: T
	) {}

	notify() {
		this.listeners.forEach(listener => listener(this._value));
	}

	subscribe(listener: Listener<T>) {
		this.listeners.push(listener);
	}

	get value(): T {
		return this._value;
	}

	set value(value: T) {
		if (value === this._value) {
			return;
		}

		this._value = value;
		this.notify();
	}
}
