<script>
  import { tweened } from "svelte/motion";
  import { onMount, onDestroy } from "svelte";

  const rotation = tweened(0, {
    duration: 120,
    easing: (t) => t,
  });

  let rafId = 0;
  let latestScrollY = 0;
  let mounted = false;

  const maxRotation = 360 * 2;
  const maxScroll = 5000;

  function update() {
    rafId = 0;

    const progress = Math.min(latestScrollY / maxScroll, 1);
    rotation.set(progress * maxRotation);
  }

  function onScroll() {
    latestScrollY = window.scrollY;

    if (!rafId) {
      rafId = requestAnimationFrame(update);
    }
  }

  onMount(() => {
    mounted = true;

    latestScrollY = window.scrollY;
    rotation.set(Math.min(latestScrollY / maxScroll, 1) * maxRotation);

    window.addEventListener("scroll", onScroll, { passive: true });
  });

  onDestroy(() => {
    if (!mounted) return;

    window.removeEventListener("scroll", onScroll);
    if (rafId) cancelAnimationFrame(rafId);
  });
</script>

<img
  style="transform: rotate({$rotation}deg);"
  class="cw-col-img border-radius"
  src="/images/vegmeal.webp"
  alt="Vegetarisk måltid på Hermitage"
  width="700"
  height="700"
  loading="lazy"
  decoding="async"
/>
