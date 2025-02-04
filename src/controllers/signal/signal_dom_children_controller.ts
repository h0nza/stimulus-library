import {BaseController} from "../../utilities/base_controller";
import {SignalPayload} from "./signal_input_controller";
import {EventBus} from "../../utilities";
import {signalConnectEvent, signalValueEvent} from "./events";
import {useMutationObserver} from "../../mixins/use_mutation_observer";
import {useEventBus} from "../../mixins/use_event_bus";

export class SignalDomChildrenController extends BaseController {

  static values = {
    name: String,
    scopeSelector: String,
  };
  declare nameValue: string;
  declare hasNameValue: boolean;
  declare hasScopeSelectorValue: boolean;
  declare scopeSelectorValue: string;

  get _children(): Element[] {
    if (this.hasScopeSelectorValue) {
      return Array.from(this.el.querySelectorAll(this.scopeSelectorValue));
    } else {
      return Array.from(this.el.children);
    }
  }

  get _name() {
    if (this.hasNameValue) {
      return this.nameValue;
    } else {
      throw new Error("SignalEmptyDomController requires a nameValue to be provided");
    }
  }

  connect() {
    useEventBus(this, signalConnectEvent(this._name), this.emitChildCount);
    EventBus.emit(signalConnectEvent(this._name));
    useMutationObserver(this, this.el, this.mutate, {childList: true});
    this.emitChildCount();
  }

  mutate(entries: MutationRecord[]) {
    this.emitChildCount();
  }

  emitChildCount() {
    let childCount = this._children.length;
    EventBus.emit(signalValueEvent(this._name), {element: this.el, value: childCount.toString()} as SignalPayload);
  }

}