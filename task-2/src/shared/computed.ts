import { Observable } from "./observable";

export class Computed<T> extends Observable<T> {
	constructor(value: () => T, deps: Observable<any>[]) {
		super(value());

		const listener = () => {
			this._value = value();
			this.notify();
		}

		deps.forEach(dep => dep.subscribe(listener));
	}

	get value() {
		return this._value;
	}

	set value(_) {
		throw ReferenceError("Can't change computed value");
	}
}
