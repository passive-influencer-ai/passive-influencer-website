import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Builds one scene's timeline. It must contain a 'rest' label where the scene
// is fully shown: reduced motion jumps straight there.
export type SceneBuilder = (scene: HTMLElement) => gsap.core.Timeline;

// How long each tab stays up before the next one takes over.
const CYCLE_SECONDS = 7;

/**
 * Runs the scenes in a feature panel. Scenes play only while the panel is on
 * screen. A single scene loops; several scenes cycle through their tabs, and
 * the cycling waits while the panel is hovered or a tab has focus.
 */
export function initFeatureScreen(panel: HTMLElement, builders: SceneBuilder[]) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scenes = [...panel.querySelectorAll<HTMLElement>('[data-scene]')];
  const tabs = [...panel.querySelectorAll<HTMLButtonElement>('[data-tab]')];
  const timelines = scenes.map((scene, index) => builders[index](scene).pause(0));
  const device = panel.querySelector<HTMLElement>('[data-device]');

  if (timelines.length === 1 && !reduceMotion) timelines[0].repeat(-1).repeatDelay(1);

  let active = 0;
  let timer: gsap.core.Tween | undefined;
  let onScreen = false;
  let held = false;

  const sync = () => {
    onScreen ? timelines[active].resume() : timelines[active].pause();
    if (timer) onScreen && !held ? timer.resume() : timer.pause();
  };

  const show = (index: number) => {
    const previous = active;
    active = index;

    tabs.forEach((tab, i) => tab.setAttribute('aria-pressed', String(i === index)));
    if (previous !== index) {
      gsap.to(scenes[previous], { autoAlpha: 0, duration: reduceMotion ? 0 : 0.3 });
      timelines[previous].pause(0);
    }
    gsap.to(scenes[index], { autoAlpha: 1, duration: reduceMotion ? 0 : 0.3 });

    if (reduceMotion) {
      timelines[index].seek('rest').pause();
      return;
    }

    timelines[index].restart();
    timer?.kill();
    if (tabs.length) {
      const progress = tabs[index].querySelector('[data-tab-progress]');
      gsap.set(panel.querySelectorAll('[data-tab-progress]'), { scaleX: 0 });
      timer = gsap.fromTo(
        progress,
        { scaleX: 0 },
        { scaleX: 1, duration: CYCLE_SECONDS, ease: 'none', onComplete: () => show((index + 1) % scenes.length) },
      );
    }
    sync();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => show(index));
    tab.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      const next = (index + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
      tabs[next].focus({ preventScroll: true });
      show(next);
    });
  });

  if (reduceMotion) {
    show(0);
    return;
  }

  const hold = (value: boolean) => {
    held = value;
    sync();
  };
  panel.addEventListener('pointerenter', () => hold(true));
  panel.addEventListener('pointerleave', () => hold(panel.contains(document.activeElement)));
  panel.addEventListener('focusin', () => hold(true));
  panel.addEventListener('focusout', (event) => hold(panel.contains(event.relatedTarget as Node)));

  let started = false;
  ScrollTrigger.create({
    trigger: panel,
    start: 'top 80%',
    end: 'bottom 10%',
    onToggle: (self) => {
      onScreen = self.isActive;
      if (onScreen && !started) {
        started = true;
        gsap.from(device, { y: '1.5em', opacity: 0, duration: 0.8, ease: 'power3.out' });
        show(0);
      }
      sync();
    },
  });
}
