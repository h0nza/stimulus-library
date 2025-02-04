import {BaseController} from '../utilities/base_controller';
import {isTypeOfButtonableElement} from "../utilities/elements";
import {useEventListener} from "../mixins/use_event_listener";
import {useTemporaryContent} from "../mixins/use_temporary_content";

export class DisableWithController extends BaseController {

  static values = {
    message: String,
    timeout: Number,
  };

  declare readonly messageValue: string;
  declare readonly hasMessageValue: boolean;
  declare readonly timeoutValue: number;
  declare readonly hasTimeoutValue: boolean;

  get _message(): string {
    return this.hasMessageValue ? this.messageValue : 'Submitting...';
  }

  get _timeout(): number {
    return this.hasTimeoutValue ? this.timeoutValue : 1000;
  }

  connect() {
    requestAnimationFrame(() => {
      useEventListener(this, this.el, ["click"], this.disable);
      useEventListener(this, window, ["turbo:load", "turbolinks:load"], this._enable);
    });
  }

  disable(event?: Event) {
    let element = this.el;

    if (this._isDisabled(element)) {
      event?.preventDefault();
      event?.stopImmediatePropagation();
    } else {
      this._disable();
      useTemporaryContent(this, element, this._message, this._timeout, this._enable);
    }
  }

  enable(event?: Event) {
    event?.preventDefault();
    let element = this.el;
    if (this._isDisabled(element)) {
      this._enable();
    }
  }

  _isDisabled(el: HTMLElement): boolean {
    if (isTypeOfButtonableElement(el)) {
      return el.disabled;
    } else {
      return el.dataset.disabled == "true";
    }
  }

  _disable() {
    let el = this.el;
    if (isTypeOfButtonableElement(el)) {
      el.disabled = true;
    } else {
      el.dataset.disabled = "true";
    }
  }

  _enable() {
    let el = this.el;
    if (isTypeOfButtonableElement(el)) {
      el.disabled = false;
    } else {
      el.dataset.disabled = undefined;
    }
  }

}
