<script>
	import { onMount } from "svelte";
	import { generateSvelteHelpers } from "@uploadthing/svelte";
	import { dragHandleZone, dragHandle } from "svelte-dnd-action";
	import { flip } from "svelte/animate";
	import UploadButton from "../components/UploadButton.svelte";
	import CreateItemModal from "../components/modals/CreateItemModal.svelte";
	import { showCreateItemModal, toast } from "../stores/layoutStore";

	const { uploadFiles } = generateSvelteHelpers();
	const flipDurationMs = 150;

	let isDirty = $state(false);
	let isLoading = $state(true);
	let isMenuLoading = $state(true);
	let uploadingSection = $state(null);

	let lunchMenu = $state({
		img: "",
	});

	let buffetMenu = $state({
		sameMenu: true,
		lunch: {
			price: null,
			items: [],
			images: [],
			openingHours: {
				weekday: { from: "", to: "" },
				weekend: { from: "", to: "" },
			},
		},
		dinner: {
			price: null,
			items: [],
			images: [],
			openingHours: {
				weekday: { from: "", to: "" },
				weekend: { from: "", to: "" },
			},
		},
	});

	let itemLanguage = $state("sv");
	let modalResolver;
	let tabBySection = $state({
		lunch: "menu",
		dinner: "menu",
	});

	const itemLanguageOptions = [
		{ code: "sv", label: "Svenska" },
		{ code: "en", label: "English" },
	];

	const titlePlaceholders = {
		sv: "t.ex. Krispig tofu i jordnötssås",
		en: "e.g. Crispy tofu in peanut sauce",
	};

	const descriptionPlaceholders = {
		sv: "t.ex. Krispig tofu serveras med en krämig jordnötssås och fluffigt ris",
		en: "e.g. Crispy tofu served with creamy peanut sauce and fluffy rice",
	};

	function setItemLanguage(code) {
		itemLanguage = code === "en" ? "en" : "sv";
	}

	const cloneLocalized = (value = {}) => ({
		sv: typeof value.sv === "string" ? value.sv.trim() : "",
		en: typeof value.en === "string" ? value.en.trim() : "",
	});

	const normalizeLocalized = (value = {}) => {
		const localized = cloneLocalized(value);
		if (!localized.sv && localized.en) {
			localized.sv = localized.en;
		}
		return localized;
	};

	const cloneItems = (items = []) =>
		items.map((item) => ({
			...item,
			title: cloneLocalized(item.title),
			description: cloneLocalized(item.description),
		}));

	const cloneImages = (images = []) => images.map((image) => ({ ...image }));

	const normalizeImageItem = (image) => {
		if (!image) return null;
		if (image?.isDndShadowItem) return image;
		if (typeof image === "string") {
			return { id: image, url: image, _id: image };
		}
		const url = image.url || image.fileUrl || image.src;
		if (!url) return null;
		const id = image.id || image._id || image.key || url;
		return { id, url, _id: id };
	};

	const normalizeImageItems = (images = []) =>
		images
			.map((image) => {
				if (image?.isDndShadowItem) return image;
				if (image && typeof image === "object" && image._id) {
					return image;
				}
				return normalizeImageItem(image);
			})
			.filter(Boolean);

	const normalizeOpeningHours = (value = {}) => ({
		weekday: {
			from:
				typeof value?.weekday?.from === "string"
					? value.weekday.from
					: "",
			to: typeof value?.weekday?.to === "string" ? value.weekday.to : "",
		},
		weekend: {
			from:
				typeof value?.weekend?.from === "string"
					? value.weekend.from
					: "",
			to: typeof value?.weekend?.to === "string" ? value.weekend.to : "",
		},
	});

	const cloneOpeningHours = (value = {}) => ({
		weekday: { ...value.weekday },
		weekend: { ...value.weekend },
	});

	function getSectionItems(sectionKey) {
		return sectionKey === "dinner"
			? buffetMenu.dinner.items
			: buffetMenu.lunch.items;
	}

	function getSectionImages(sectionKey) {
		return sectionKey === "dinner"
			? buffetMenu.dinner.images
			: buffetMenu.lunch.images;
	}

	function setItems(sectionKey, items, markDirty = true) {
		if (buffetMenu.sameMenu) {
			buffetMenu = {
				...buffetMenu,
				lunch: { ...buffetMenu.lunch, items },
				dinner: { ...buffetMenu.dinner, items },
			};
		} else {
			const key = sectionKey === "dinner" ? "dinner" : "lunch";
			buffetMenu = {
				...buffetMenu,
				[key]: { ...buffetMenu[key], items },
			};
		}
		if (markDirty) isDirty = true;
	}

	function setImages(sectionKey, images, markDirty = true) {
		const normalizedImages = normalizeImageItems(images);
		if (buffetMenu.sameMenu) {
			buffetMenu = {
				...buffetMenu,
				lunch: { ...buffetMenu.lunch, images: normalizedImages },
				dinner: { ...buffetMenu.dinner, images: normalizedImages },
			};
		} else {
			const key = sectionKey === "dinner" ? "dinner" : "lunch";
			buffetMenu = {
				...buffetMenu,
				[key]: { ...buffetMenu[key], images: normalizedImages },
			};
		}
		if (markDirty) isDirty = true;
	}

	async function loadLunchImage() {
		try {
			const res = await fetch("/dashboard/api/images");
			if (res.ok) {
				const data = await res.json();
				lunchMenu.img = data.lunch ?? "";
			}
		} catch (e) {
			console.error("Failed loading buffet image", e);
		} finally {
			isLoading = false;
		}
	}

	async function loadBuffetMenu() {
		try {
			const res = await fetch("/dashboard/api/buffet-menu");
			if (!res.ok) throw new Error("Failed to fetch buffet menu");
			const data = await res.json();

			const normalized = {
				sameMenu: !!data?.sameMenu,
				lunch: {
					price: data?.lunch?.price ?? null,
					items: Array.isArray(data?.lunch?.items)
						? data.lunch.items
						: [],
					images: normalizeImageItems(data?.lunch?.images || []),
					openingHours: normalizeOpeningHours(
						data?.lunch?.openingHours,
					),
				},
				dinner: {
					price: data?.dinner?.price ?? null,
					items: Array.isArray(data?.dinner?.items)
						? data.dinner.items
						: [],
					images: normalizeImageItems(data?.dinner?.images || []),
					openingHours: normalizeOpeningHours(
						data?.dinner?.openingHours,
					),
				},
			};

			if (normalized.sameMenu) {
				normalized.dinner.items = normalized.lunch.items;
				normalized.dinner.images = normalized.lunch.images;
			}

			buffetMenu = normalized;
		} catch (e) {
			console.error("Failed loading buffet menu", e);
		} finally {
			isMenuLoading = false;
		}
	}

	onMount(() => {
		loadLunchImage();
		loadBuffetMenu();
	});

	function handleSameMenuToggle(e) {
		const next = e?.currentTarget?.checked ?? !buffetMenu.sameMenu;
		if (next === buffetMenu.sameMenu) return;

		if (next) {
			const sourceItems =
				buffetMenu.lunch.items?.length > 0
					? buffetMenu.lunch.items
					: buffetMenu.dinner.items;
			const sourceImages =
				buffetMenu.lunch.images?.length > 0
					? buffetMenu.lunch.images
					: buffetMenu.dinner.images;
			buffetMenu = {
				...buffetMenu,
				sameMenu: true,
				lunch: {
					...buffetMenu.lunch,
					items: sourceItems,
					images: sourceImages,
				},
				dinner: {
					...buffetMenu.dinner,
					items: sourceItems,
					images: sourceImages,
				},
			};
		} else {
			buffetMenu = {
				...buffetMenu,
				sameMenu: false,
				dinner: {
					...buffetMenu.dinner,
					items: cloneItems(buffetMenu.lunch.items),
					images: cloneImages(buffetMenu.lunch.images),
				},
			};
		}

		isDirty = true;
	}

	async function saveChanges() {
		try {
			const payload = {
				sameMenu: buffetMenu.sameMenu,
				lunch: {
					...buffetMenu.lunch,
					images: normalizeImageItems(buffetMenu.lunch.images),
					openingHours: normalizeOpeningHours(
						buffetMenu.lunch.openingHours,
					),
				},
				dinner: {
					...buffetMenu.dinner,
					images: normalizeImageItems(buffetMenu.dinner.images),
					openingHours: normalizeOpeningHours(
						buffetMenu.dinner.openingHours,
					),
				},
			};

			const [imageRes, menuRes] = await Promise.all([
				fetch("/dashboard/api/images", {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ lunch: lunchMenu.img }),
				}),
				fetch("/dashboard/api/buffet-menu", {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload),
				}),
			]);

			if (!imageRes.ok || !menuRes.ok) {
				throw new Error("Failed saving buffet menu");
			}

			const saved = await menuRes.json().catch(() => null);
			if (saved?.menu) {
				const normalized = saved.menu;
				const mapped = {
					...normalized,
					lunch: {
						...normalized.lunch,
						images: normalizeImageItems(
							normalized.lunch?.images || [],
						),
						openingHours: normalizeOpeningHours(
							normalized.lunch?.openingHours,
						),
					},
					dinner: {
						...normalized.dinner,
						images: normalizeImageItems(
							normalized.dinner?.images || [],
						),
						openingHours: normalizeOpeningHours(
							normalized.dinner?.openingHours,
						),
					},
				};

				buffetMenu = mapped.sameMenu
					? {
							...mapped,
							dinner: {
								...mapped.dinner,
								items: mapped.lunch.items,
								images: mapped.lunch.images,
							},
						}
					: mapped;
			}

			isDirty = false;
			toast("Buffémenyn sparades.", 3000, "success");
		} catch (e) {
			console.error("Failed saving buffet menu", e);
			toast("Kunde inte spara buffémenyn.", 3000, "error");
		}
	}

	async function uploadImage(e) {
		const file = e.target.files?.[0];
		if (!file) return;

		try {
			const res = await uploadFiles("lunchUploader", { files: [file] });
			const url = res?.[0]?.url;
			if (url) {
				lunchMenu.img = url;
				isDirty = true;
			}
		} catch (err) {
			console.error("Upload failed", err);
			alert("Uppladdning misslyckades");
		} finally {
			e.target.value = "";
		}
	}

	async function deleteImage() {
		try {
			const res = await fetch("/dashboard/api/images", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ kind: "lunch", url: lunchMenu.img }),
			});
			if (res.ok) {
				lunchMenu.img = "";
				isDirty = true;
			} else {
				console.error("Delete failed", await res.text());
				alert("Kunde inte ta bort bilden");
			}
		} catch (e) {
			console.error("Delete error", e);
			alert("Kunde inte ta bort bilden");
		}
	}

	async function handleSectionImageUpload(sectionKey, event) {
		const files = Array.from(event.target.files || []);
		if (files.length === 0) return;
		uploadingSection = sectionKey;
		try {
			const res = await uploadFiles("sliderUploader", { files });
			const uploaded = (res ?? [])
				.map((file) => {
					const fallbackId =
						file.key ||
						file.name ||
						file.url ||
						crypto.randomUUID();
					return {
						id: fallbackId,
						_id: fallbackId,
						url: file.url,
					};
				})
				.filter((image) => image.url);

			const nextImages = [...getSectionImages(sectionKey), ...uploaded];

			setImages(sectionKey, nextImages, true);
		} catch (e) {
			console.error("Upload failed", e);
			alert("Uppladdning misslyckades");
		} finally {
			event.target.value = "";
			uploadingSection = null;
		}
	}

	async function removeSectionImage(sectionKey, image) {
		if (!image?.id) return;
		setImages(
			sectionKey,
			getSectionImages(sectionKey).filter((item) => item.id !== image.id),
			true,
		);
	}

	function openCreateItemModal() {
		$showCreateItemModal = true;

		return new Promise((resolve) => {
			modalResolver = resolve;
		});
	}

	function handleCreateItemModalConfirm(data) {
		modalResolver(data);
		$showCreateItemModal = false;
	}

	function handleCreateItemModalCancel() {
		modalResolver(null);
		$showCreateItemModal = false;
	}

	async function createItemHandler(sectionKey) {
		const itemData = await openCreateItemModal();
		if (!itemData) return;

		const title = normalizeLocalized(itemData.title);
		const description = normalizeLocalized(itemData.description);

		const newItem = {
			_id: crypto.randomUUID(),
			title,
			description,
		};

		setItems(sectionKey, [...getSectionItems(sectionKey), newItem]);
		toast("Ny rätt har lagts till.", 3000, "success");
	}

	function deleteItemHandler(sectionKey, itemId) {
		setItems(
			sectionKey,
			getSectionItems(sectionKey).filter((item) => item._id !== itemId),
		);
		toast("Rätten har tagits bort.", 3000, "success");
	}

	function setActiveTab(sectionKey, tab) {
		tabBySection = { ...tabBySection, [sectionKey]: tab };
	}
</script>

<div class="cwcms-header">
	<div class="cwcms-header-module-title">Buffémeny</div>
	<div
		class="cwcms-header-module-published"
		style="margin-right: auto; margin-left: 0.5rem;"
	>
		<div class="input-container">
			<label
				style="display: flex; align-items: center; gap: 6px;"
				class="input-label"
			>
				<input
					type="checkbox"
					checked={buffetMenu.sameMenu}
					onchange={handleSameMenuToggle}
				/>
				Samma meny för lunch & middag
			</label>
		</div>
	</div>
	<div class="cwcms-header-button-container">
		<div class="line"></div>
		<div class="save-buttons">
			<button onclick={saveChanges} class="primary">Spara</button>
		</div>
	</div>
</div>
<div class="cwcms-main lunch-menu menu">
	{#if isMenuLoading}
		<div class="cwcms-no-categories-container">Laddar buffémenyn...</div>
	{:else}
		{#each buffetMenu.sameMenu ? ["lunch"] : ["lunch", "dinner"] as sectionKey (sectionKey)}
			<details
				animate:flip={{ duration: flipDurationMs }}
				class="category-accordion {sectionKey}"
			>
				<summary class="category-summary">
					<div class="drag-handle" style="cursor: default;"></div>
					<div class="title">
						{sectionKey === "lunch"
							? buffetMenu.sameMenu
								? "Lunch & Middag"
								: "Lunch"
							: "Middag"}
					</div>
					<div class="chevron">
						<div class="button-container">
							<button
								onclick={() => createItemHandler(sectionKey)}
								class="small primary square"
								aria-label="add item button"
							>
								<i class="ph-bold ph-plus"></i>
							</button>
						</div>
						<i class="ph-bold ph-caret-down"></i>
					</div>
				</summary>

				<div class="category-tabs">
					<button
						type="button"
						class="tab-button {tabBySection[sectionKey] === 'menu'
							? 'active'
							: ''}"
						onclick={() => setActiveTab(sectionKey, "menu")}
					>
						Meny & Pris
					</button>
					<button
						type="button"
						class="tab-button {tabBySection[sectionKey] === 'hours'
							? 'active'
							: ''}"
						onclick={() => setActiveTab(sectionKey, "hours")}
					>
						Öppettider
					</button>
					<button
						type="button"
						class="tab-button {tabBySection[sectionKey] === 'images'
							? 'active'
							: ''}"
						onclick={() => setActiveTab(sectionKey, "images")}
					>
						Bilder
					</button>
				</div>

				{#if tabBySection[sectionKey] === "menu"}
					<div
						class="items-container"
						use:dragHandleZone={{
							items: getSectionItems(sectionKey),
							flipDurationMs,
							dropTargetStyle: { outline: "none" },
							type: `${sectionKey}-items`,
							dropFromOthersDisabled: true,
						}}
						onconsider={(e) =>
							setItems(sectionKey, e.detail.items, false)}
						onfinalize={(e) => {
							const newItems = e.detail.items.filter(
								(item) => !item.isDndShadowItem,
							);
							setItems(sectionKey, newItems, true);
						}}
					>
						{#each getSectionItems(sectionKey) as item (item._id)}
							<details
								class="item-accordion"
								animate:flip={{ duration: flipDurationMs }}
							>
								<summary class="item-summary">
									<div class="drag-handle" use:dragHandle>
										<i class="ph-bold ph-dots-six-vertical"
										></i>
									</div>
									<div class="title">
										{item.title?.sv ||
											item.title?.en ||
											"Namnlös rätt"}
									</div>
									<div class="chevron">
										<div class="button-container">
											<button
												onclick={() =>
													deleteItemHandler(
														sectionKey,
														item._id,
													)}
												class="small secondary square"
												aria-label="delete item"
											>
												<i class="ph-bold ph-trash"></i>
											</button>
										</div>
										<i class="ph-bold ph-caret-down"></i>
									</div>
								</summary>
								<div class="item-container">
									<div class="item-language-toggle">
										{#each itemLanguageOptions as lang}
											<button
												type="button"
												class="item-language-button {itemLanguage ===
												lang.code
													? 'active'
													: ''}"
												onclick={() =>
													setItemLanguage(lang.code)}
											>
												{lang.label}
											</button>
										{/each}
									</div>

									<div class="title-price-container">
										<div class="input-container">
											<div class="input-label">
												{itemLanguage === "en"
													? "Title (EN)"
													: "Titel (SV)"}
											</div>
											<input
												bind:value={
													item.title[itemLanguage]
												}
												oninput={() => (isDirty = true)}
												type="text"
												placeholder={titlePlaceholders[
													itemLanguage
												]}
											/>
										</div>
									</div>

									<div class="input-container">
										<div class="input-label">
											{itemLanguage === "en"
												? "Description (EN)"
												: "Beskrivning (SV)"}
										</div>
										<textarea
											bind:value={
												item.description[itemLanguage]
											}
											oninput={() => (isDirty = true)}
											placeholder={descriptionPlaceholders[
												itemLanguage
											]}
											rows="3"
										></textarea>
									</div>
								</div>
							</details>
						{/each}
					</div>

					{#if buffetMenu.sameMenu}
						<div class="category-localization-fields">
							<div class="input-container">
								<div class="input-label">Lunchpris</div>
								<input
									bind:value={buffetMenu.lunch.price}
									oninput={() => (isDirty = true)}
									type="text"
									placeholder="t.ex. 149"
								/>
							</div>
							<div class="input-container">
								<div class="input-label">Middagspris</div>
								<input
									bind:value={buffetMenu.dinner.price}
									oninput={() => (isDirty = true)}
									type="text"
									placeholder="t.ex. 199"
								/>
							</div>
						</div>
					{:else}
						<div class="category-localization-fields">
							<div class="input-container">
								<div class="input-label">
									{sectionKey === "lunch"
										? "Lunchpris"
										: "Middagspris"}
								</div>
								<input
									bind:value={buffetMenu[sectionKey].price}
									oninput={() => (isDirty = true)}
									type="text"
									placeholder={sectionKey === "lunch"
										? "t.ex. 149"
										: "t.ex. 199"}
								/>
							</div>
						</div>
					{/if}
				{:else if tabBySection[sectionKey] === "hours"}
					{#if buffetMenu.sameMenu}
						<div class="category-localization-fields">
							<div class="input-container">
								<div class="input-label">
									Lunch vardag (från)
								</div>
								<input
									bind:value={
										buffetMenu.lunch.openingHours.weekday
											.from
									}
									oninput={() => (isDirty = true)}
									type="text"
									placeholder="t.ex. 11:00"
								/>
							</div>
							<div class="input-container">
								<div class="input-label">
									Lunch vardag (till)
								</div>
								<input
									bind:value={
										buffetMenu.lunch.openingHours.weekday.to
									}
									oninput={() => (isDirty = true)}
									type="text"
									placeholder="t.ex. 14:00"
								/>
							</div>
							<div class="input-container">
								<div class="input-label">Lunch helg (från)</div>
								<input
									bind:value={
										buffetMenu.lunch.openingHours.weekend
											.from
									}
									oninput={() => (isDirty = true)}
									type="text"
									placeholder="t.ex. 11:00"
								/>
							</div>
							<div class="input-container">
								<div class="input-label">Lunch helg (till)</div>
								<input
									bind:value={
										buffetMenu.lunch.openingHours.weekend.to
									}
									oninput={() => (isDirty = true)}
									type="text"
									placeholder="t.ex. 14:00"
								/>
							</div>
							<div class="input-container">
								<div class="input-label">
									Middag vardag (från)
								</div>
								<input
									bind:value={
										buffetMenu.dinner.openingHours.weekday
											.from
									}
									oninput={() => (isDirty = true)}
									type="text"
									placeholder="t.ex. 17:00"
								/>
							</div>
							<div class="input-container">
								<div class="input-label">
									Middag vardag (till)
								</div>
								<input
									bind:value={
										buffetMenu.dinner.openingHours.weekday
											.to
									}
									oninput={() => (isDirty = true)}
									type="text"
									placeholder="t.ex. 21:00"
								/>
							</div>
							<div class="input-container">
								<div class="input-label">
									Middag helg (från)
								</div>
								<input
									bind:value={
										buffetMenu.dinner.openingHours.weekend
											.from
									}
									oninput={() => (isDirty = true)}
									type="text"
									placeholder="t.ex. 17:00"
								/>
							</div>
							<div class="input-container">
								<div class="input-label">
									Middag helg (till)
								</div>
								<input
									bind:value={
										buffetMenu.dinner.openingHours.weekend
											.to
									}
									oninput={() => (isDirty = true)}
									type="text"
									placeholder="t.ex. 21:00"
								/>
							</div>
						</div>
					{:else}
						<div class="category-localization-fields">
							<div class="input-container">
								<div class="input-label">
									{sectionKey === "lunch"
										? "Lunch vardag (från)"
										: "Middag vardag (från)"}
								</div>
								<input
									bind:value={
										buffetMenu[sectionKey].openingHours
											.weekday.from
									}
									oninput={() => (isDirty = true)}
									type="text"
									placeholder="t.ex. 11:00"
								/>
							</div>
							<div class="input-container">
								<div class="input-label">
									{sectionKey === "lunch"
										? "Lunch vardag (till)"
										: "Middag vardag (till)"}
								</div>
								<input
									bind:value={
										buffetMenu[sectionKey].openingHours
											.weekday.to
									}
									oninput={() => (isDirty = true)}
									type="text"
									placeholder="t.ex. 14:00"
								/>
							</div>
							<div class="input-container">
								<div class="input-label">
									{sectionKey === "lunch"
										? "Lunch helg (från)"
										: "Middag helg (från)"}
								</div>
								<input
									bind:value={
										buffetMenu[sectionKey].openingHours
											.weekend.from
									}
									oninput={() => (isDirty = true)}
									type="text"
									placeholder="t.ex. 11:00"
								/>
							</div>
							<div class="input-container">
								<div class="input-label">
									{sectionKey === "lunch"
										? "Lunch helg (till)"
										: "Middag helg (till)"}
								</div>
								<input
									bind:value={
										buffetMenu[sectionKey].openingHours
											.weekend.to
									}
									oninput={() => (isDirty = true)}
									type="text"
									placeholder="t.ex. 14:00"
								/>
							</div>
						</div>
					{/if}
				{:else}
					<div
						class="category-localization-fields"
						style="padding-top: 1rem;"
					>
						<div
							class="input-container"
							style="grid-column: 1 / -1;"
						>
							<div class="input-label">
								{buffetMenu.sameMenu
									? "Buffémeny bilder"
									: sectionKey === "lunch"
										? "Lunchbilder"
										: "Middagsbilder"}
							</div>
							<div
								class="menu-images-grid"
								style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; margin-bottom: 12px;"
								use:dragHandleZone={{
									items: getSectionImages(sectionKey),
									flipDurationMs,
									dropTargetStyle: { outline: "none" },
									type: `${sectionKey}-images`,
									dropFromOthersDisabled: true,
								}}
								onconsider={(e) => {
									setImages(
										sectionKey,
										e.detail.items,
										false,
									);
								}}
								onfinalize={(e) => {
									const newImages = e.detail.items.filter(
										(item) => !item.isDndShadowItem,
									);
									setImages(sectionKey, newImages, true);
								}}
							>
								{#each getSectionImages(sectionKey) as image (image._id)}
									<div
										animate:flip={{
											duration: flipDurationMs,
										}}
										class="menu-image-tile"
										style="position: relative; border: 1px solid var(--color-border); border-radius: 8px; overflow: hidden; background: #f9f9f9; aspect-ratio: 16/10;"
									>
										<div
											class="drag-handle"
											use:dragHandle
											style="position: absolute; top: 6px; left: 6px; background: rgba(255, 255, 255, 0.9); border-radius: 6px; padding: 4px 6px; cursor: move; z-index: 2;"
										>
											<i
												class="ph-bold ph-dots-six-vertical"
											></i>
										</div>
										<button
											onclick={() =>
												removeSectionImage(
													sectionKey,
													image,
												)}
											class="secondary small"
											aria-label="remove image"
											style="position: absolute; top: 6px; right: 6px; z-index: 2;"
										>
											Ta bort
										</button>
										<img
											src={image.url}
											alt="buffet image"
											style="width: 100%; height: 100%; object-fit: cover;"
										/>
									</div>
								{/each}
							</div>

							<UploadButton
								uploadImage={(event) =>
									handleSectionImageUpload(sectionKey, event)}
								isUploading={uploadingSection === sectionKey}
							></UploadButton>
							<div class="input-description">
								Lägg till bilder för buffémenyn.
							</div>
						</div>
					</div>
				{/if}
			</details>
		{/each}

		{#if buffetMenu.lunch.items.length === 0 && (!buffetMenu.sameMenu ? buffetMenu.dinner.items.length === 0 : true)}
			<div class="cwcms-no-categories-container">
				Buffémenyn verkar vara tom. Lägg till rätter för att börja.
			</div>
		{/if}
	{/if}
</div>

{#if $showCreateItemModal}
	<CreateItemModal
		showPrice={false}
		onConfirm={handleCreateItemModalConfirm}
		onCancel={handleCreateItemModalCancel}
	/>
{/if}

<style lang="scss">
	.category-localization-fields {
		padding: 1rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.category-tabs {
		display: flex;
		gap: 0.5rem;
		padding: 0.75rem 1rem 0.25rem;
	}

	.category-tabs .tab-button {
		border: 1px solid var(--color-border);
		background: var(--color-bg-secondary);
		border-radius: 999px;
		padding: 0.35rem 0.85rem;
		font-size: 0.85rem;
		cursor: pointer;
	}

	.category-tabs .tab-button.active {
		background: var(--color-bg);
		border-color: var(--color-border-strong, #333333);
	}
</style>
