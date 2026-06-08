<script>
  import { language } from "$lib/stores/languageStore";

  let currentLanguage = $state("sv");
  const t = (sv, en) => (currentLanguage === "en" ? en : sv);

  $effect(() => {
    currentLanguage = $language;
  });
</script>

<section class="cw-section--map cw-grid py-8 py-xs-4 gap-2">
  <div class="cw-col-7 cw-col-xs-12">
    <p class="h6 text-orange mb-1">{t("KURRAR DET I MAGEN?", "FEELING HUNGRY?")}</p>
    <h1>
      {#if currentLanguage === "en"}
        If you are hungry, <br />come our way.
      {:else}
        Till oss ska den med hunger <br /> gå.
      {/if}
    </h1>
    <p class="mt-4 mb-2 body-text-line-height">
      {t(
        "Kom och ät på våran “all you can eat”-buffé. Du hittar oss på Stora Nygatan 11 i hjärtat av Gamla stan. På sommartid har vi öppet vardagar 11:00 - 21:00. Under vintern har vi öppet 11:00 - 20:00.",
        "Come and eat at our all-you-can-eat buffet. You can find us at Stora Nygatan 11 in the heart of Gamla Stan. In summer we are open weekdays 11:00 - 21:00. In winter we are open 11:00 - 20:00.",
      )}
    </p>
    <a href="/boka-bord" class="button primary mt-3 width-fit">
      {t("Boka bord", "Book a table")}
    </a>
  </div>
  <div class="cw-col-5 cw-col-xs-12 aspect-ratio-1-1">
    <iframe
      title="google map"
      src="https://www.google.com/maps/embed/v1/place?q=Green+Hermitage&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
      height="100%"
      width="100%"
      frameborder="0"
    ></iframe>
  </div>
</section>

<style>
  .cw-col-5 {
    border-radius: 1rem;
    overflow: hidden;
  }
</style>
