import {Controller} from "stimulus";
import {useMixin} from "./create_mixin";

export function useFullscreen(controller: Controller, el?: Element) {
  let element = el || document.documentElement;
  let fullscreenOpen = document.fullscreenElement !== null;

  const updateFullscreenState = () => fullscreenOpen = document.fullscreenElement !== null;
  const isFullscreen = (): boolean => fullscreenOpen;
  const toggle = async () => fullscreenOpen ? await exit() : await enter();
  let setup = () => document.addEventListener('fullscreenchange', updateFullscreenState);
  let teardown = () => document.removeEventListener('fullscreenchange', updateFullscreenState);

  const exit = async () => {
    if (document.exitFullscreen) {
      fullscreenOpen = false;
      await document.exitFullscreen();
    }
  };

  const enter = async () => {
    if (fullscreenOpen) {
      await exit();
    }
    if (element.requestFullscreen) {
      await element.requestFullscreen();
      fullscreenOpen = true;
    }
  };

  useMixin(controller, setup, teardown);
  return {
    isFullscreen,
    enter,
    exit,
    toggle,
    teardown,
  };
}