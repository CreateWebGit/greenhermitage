<script>
    import '../../css/main.scss';

    import Hero from '$lib/components/Hero.svelte';
    import Header from '$lib/components/Header.svelte';
    import SectionReviews from '$lib/components/sections/SectionReviews.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { language } from '$lib/stores/languageStore';

    let { data } = $props();
    let { categories, reviews, images } = data;

    let activeCategoryId = $state(null);
    let currentLanguage = $state('sv');
    const t = (sv, en) => (currentLanguage === "en" ? en : sv);
    const baseUrl = "https://greenhermitage.se";
    const canonicalUrl = `${baseUrl}/meny`;

    const translate = (value) => {
        if (!value) return '';
        if (typeof value === 'string') return value;
        return value?.[currentLanguage] ?? value?.sv ?? value?.en ?? '';
    };

    $effect(() => {
        if (!activeCategoryId && categories?.length) {
            activeCategoryId = categories[0]._id;
        }
    });

    $effect(() => {
        currentLanguage = $language;
    });

    const getActiveCategory = () => categories?.find(c => c._id === activeCategoryId);
</script>

<svelte:head>
    <title>{t("Meny | Green Hermitage", "Menu | Green Hermitage")}</title>
    <meta
        name="description"
        content={t(
            "Utforska vår á la carte-meny med vegetariska rätter i Gamla Stan.",
            "Explore our à la carte menu with vegetarian dishes in Gamla Stan.",
        )}
    />
    <link rel="canonical" href={canonicalUrl} />

    <meta
        property="og:title"
        content={t("Meny | Green Hermitage", "Menu | Green Hermitage")}
    />
    <meta
        property="og:description"
        content={t(
            "Utforska vår á la carte-meny med vegetariska rätter i Gamla Stan.",
            "Explore our à la carte menu with vegetarian dishes in Gamla Stan.",
        )}
    />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Green Hermitage" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta
        name="twitter:title"
        content={t("Meny | Green Hermitage", "Menu | Green Hermitage")}
    />
    <meta
        name="twitter:description"
        content={t(
            "Utforska vår á la carte-meny med vegetariska rätter i Gamla Stan.",
            "Explore our à la carte menu with vegetarian dishes in Gamla Stan.",
        )}
    />
</svelte:head>

<Header/>
<Hero title={currentLanguage === 'en' ? 'Our Menu' : 'Vår meny'} backgroundImage={"/images/header-meny.webp"}/>
<section class="cw-section--alacarte cw-grid py-5 py-xs-4">
    <div class="cw-col-12 cw-col-xs-12 d-flex flex-column">
        <h1 class="h2 text-center mt-2">Á la carte</h1>
        <img class="mx-auto mt-1 mb-5" src="/icons/divider.svg" alt="divider icon"/>
        <div class="dish-category-tabs-container">
            {#each categories as category (category._id)}
                <button class={`menu-tab ${activeCategoryId === category._id ? 'active' : ''}`} onclick={() => (activeCategoryId = category._id)}>
                    {translate(category.title)}
                </button>
            {/each}
        </div>
    </div>
    <div class="cw-col-12 cw-col-xs-12 d-flex flex-column py-5">
        {#if getActiveCategory()}
            {#key activeCategoryId}
                <div class="dish-container">
                    {#each getActiveCategory().dishes as dish, i}
                        <article class="dish">
                            <div class="title-price">
                                <h3 class="title">{i + 1}. {translate(dish.title)}</h3>
                                <div class="line"></div>
                                {#if dish?.price != null}
                                    <div class="price">{dish.price} SEK</div>
                                {/if}
                            </div>
                            {#if translate(dish.description)}
                                <p class="description">{translate(dish.description)}</p>
                            {/if}
                        </article>
                    {/each}
                </div>
            {/key}
        {/if}
        <img class="mx-auto mt-5 mb-2" src="/icons/divider.svg" alt="divider icon"/>
        <button class="primary mx-auto width-fit">{currentLanguage === 'en' ? 'Book a table' : 'Boka bord'}</button>
    </div>
</section>
<SectionReviews images={images[0].slider} {reviews}/>
<div class="mt-3"></div>
<Footer/>
