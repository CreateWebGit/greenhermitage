<script>
	// import { getCategories, createCategory, deleteCategory, addItemToCategory } from '$cmslib/menuClientFunctions.js'
	import { onMount } from "svelte";
	import { dragHandleZone, dragHandle } from "svelte-dnd-action";
	import { flip } from "svelte/animate";
	import { fly } from "svelte/transition";
	import CreateCategoryModal from "../components/modals/CreateCategoryModal.svelte";

	import { getCategories } from "$cmslib/menuClientFunctions";
	import {
		getPublished,
		setPublished,
	} from "$cmslib/publishedClientFunctions";
	import {
		showCreateCategoryModal,
		showCreateItemModal,
		toast,
	} from "../stores/layoutStore";

	import CreateItemModal from "../components/modals/CreateItemModal.svelte";

	let categories = $state([]);
	let isDirty = $state(false);
	let isPublished = $state(false);
	let updatingPublished = $state(false);
	let newCategoryTitle = $state({ sv: "", en: "" });
	let itemLanguage = $state("sv");
	let modalResolver;
	const flipDurationMs = 150;

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

	const createCategory = () => {
		if (!newCategoryTitle.sv && !newCategoryTitle.en) return;

		isDirty = true;

		const title = normalizeLocalized(newCategoryTitle);

		categories = [
			...categories,
			{
				_id: crypto.randomUUID(), // temporärt ID tills det sparas
				title,
				dishes: [],
			},
		];

		newCategoryTitle = { sv: "", en: "" };
		$showCreateCategoryModal = false;
		toast("Ny kategori har lagts till.", 3000, "success");
	};

	function deleteCategory(categoryId) {
		isDirty = true;

		categories = categories.filter((c) => c._id !== categoryId);
	}

	async function createItemHandler(categoryId) {
		const itemData = await openCreateItemModal();
		if (!itemData) return;

		isDirty = true;

		const title = normalizeLocalized(itemData.title);
		const description = normalizeLocalized(itemData.description);
		const price = Number.isFinite(itemData.price) ? itemData.price : null;

		categories = categories.map((category) => {
			if (category._id === categoryId) {
				return {
					...category,
					dishes: [
						...category.dishes,
						{
							_id: crypto.randomUUID(), // temporärt ID
							title,
							description,
							price,
						},
					],
				};
			}
			return category;
		});

		toast("Ny maträtt har lagts till.", 3000, "success");
	}

	function deleteItemInCategoryHandler(categoryId, dishId) {
		isDirty = true;

		categories = categories.map((category) => {
			if (category._id === categoryId) {
				return {
					...category,
					dishes: category.dishes.filter(
						(dish) => dish._id !== dishId,
					),
				};
			}
			return category;
		});

		toast("Maträtten har tagits bort.", 3000, "success");
	}

	async function saveMenu() {
		const res = await fetch("/dashboard/api/menu/save", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(categories),
		});

		if (res.ok) {
			await res.json().catch(() => null);
			toast("Menyn sparades och publicerades.", 3000, "success");
			isDirty = false;

			categories = await getCategories();
		} else {
			toast("Något gick fel med att spara menyn.", 3000, "error");
		}
	}

	async function cancelChanges() {
		categories = await getCategories();
		isDirty = false;
		newCategoryTitle = { sv: "", en: "" };

		toast("Ändringarna har avbrutits.", 3000, "error");
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

	function handleSort(e) {
		//TODO: there is a mixup with the "items" key, and dnd-action. we might have to change the key from items, to "dishes", or something.
		categories = e.detail.items;
	}

	function handleSortFinalize(e) {
		//TODO: this is so stupid, but im really tired. this recursivley checks for ALL isDndShadowItem keys, and wipes them.
		//it fixed bugs for now. but it probably produced more. go back to this later.

		function deepClean(obj) {
			if (Array.isArray(obj)) {
				return obj
					.filter((dish) => !dish.isDndShadowItem)
					.map(deepClean);
			}

			const cleaned = {};
			for (const key in obj) {
				if (key === "isDndShadowItem") continue;
				const value = obj[key];
				cleaned[key] =
					typeof value === "object" && value !== null
						? deepClean(value)
						: value;
			}
			return cleaned;
		}

		categories = deepClean(e.detail.items);
		isDirty = true;
	}

	onMount(async () => {
		categories = await getCategories();
		try {
			const pub = await getPublished("menu");
			isPublished = !!pub.published;
		} catch (e) {
			// fallback: leave default false
		}
	});

	async function togglePublished(e) {
		if (updatingPublished) return;
		const desired = e?.currentTarget?.checked ?? !isPublished;
		updatingPublished = true;
		try {
			await setPublished("menu", desired);
			isPublished = desired;
			toast(
				desired ? "Sidan publicerad." : "Sidan avpublicerad.",
				2500,
				"success",
			);
		} catch (e) {
			// revert UI state on failure
			isPublished = !desired;
			toast("Kunde inte uppdatera publicerad status.", 3000, "error");
		} finally {
			updatingPublished = false;
		}
	}
</script>

<div class="cwcms-header">
	<div class="cwcms-header-module-title">Á la carte meny</div>
	<div class="cwcms-header-module-published">
			<div class="input-container">
				<label
					style="display: flex; align-items: center; gap: 6px;"
					class="input-label"
				>
					<input
						type="checkbox"
						bind:checked={isPublished}
						onchange={togglePublished}
						disabled={updatingPublished}
					/>
					Publicerad
				</label>
			</div>
	</div>
	<div class="cwcms-header-button-container">
		<div class="save-buttons">
			<button class="secondary">Utöka kategorier</button>
			<button
				onclick={() => ($showCreateCategoryModal = true)}
				class="secondary">Ny kategori</button
			>
		</div>
		<div class="save-buttons">
			{#if isDirty}
				<button
					transition:fly={{ y: 5 }}
					class="secondary"
					onclick={cancelChanges}>Avbryt</button
				>
			{/if}
			<button onclick={saveMenu} class="primary">Spara</button>
		</div>
	</div>
</div>
<div
	class="cwcms-main menu"
	use:dragHandleZone={{
		items: categories,
		flipDurationMs,
		dropTargetStyle: { outline: "none" },
		type: "categories",
	}}
	onconsider={handleSort}
	onfinalize={handleSortFinalize}
>
	<!-- loop through categories -->
	{#each categories as category (category._id)}
		<details
			animate:flip={{ duration: flipDurationMs }}
			class="category-accordion {category._id}"
		>
			<summary class="category-summary">
				<div class="drag-handle" use:dragHandle>
					<i class="ph-bold ph-dots-six-vertical"></i>
				</div>
				<div class="title">
					{category.title?.sv ||
						category.title?.en ||
						"Namnlös kategori"}
				</div>
				<div class="chevron">
					<div class="button-container">
						<button
							onclick={() => deleteCategory(category._id)}
							class="small secondary square"
							aria-label="toggle expand on items"
						>
							<i class="ph-bold ph-trash"></i>
						</button>
						<button
							class="small secondary square"
							aria-label="toggle expand on items"
						>
							<i class="ph-bold ph-arrows-out-line-vertical"></i>
						</button>
						<button
							onclick={() => createItemHandler(category._id)}
							class="small primary square"
							aria-label="add item button"
						>
							<i class="ph-bold ph-plus"></i>
						</button>
					</div>
					<i class="ph-bold ph-caret-down"></i>
				</div>
			</summary>
			<div class="category-localization-fields" style="padding: 1rem">
				<div class="input-container">
					<div class="input-label">Kategori (SV)</div>
					<input
						bind:value={category.title.sv}
						oninput={() => (isDirty = true)}
						type="text"
						placeholder="t.ex. Varmrätter"
					/>
				</div>
				<div class="input-container" style="margin-top: 0.5rem">
					<div class="input-label">Category (EN)</div>
					<input
						bind:value={category.title.en}
						oninput={() => (isDirty = true)}
						type="text"
						placeholder="e.g. Main Courses"
					/>
				</div>
			</div>

			<div
				class="items-container"
				use:dragHandleZone={{
					items: category.dishes,
					flipDurationMs,
					dropTargetStyle: { outline: "none" },
					type: "dishes",
					dropFromOthersDisabled: true,
				}}
				onconsider={(e) => {
					categories = categories.map((c) => {
						if (c._id === category._id) {
							return {
								...c,
								dishes: e.detail.items,
							};
						}
						return c;
					});
				}}
				onfinalize={(e) => {
					const updatedCategoryId = category._id;
					const newItems = e.detail.items.filter(
						(dish) => !dish.isDndShadowItem,
					);

					categories = categories.map((c) => {
						if (c._id === updatedCategoryId) {
							return { ...c, dishes: newItems };
						}
						return c;
					});

					isDirty = true;
				}}
			>
				<!-- loop through items in categories -->
				{#each category.dishes as item (item._id)}
					<details
						class="item-accordion"
						animate:flip={{ duration: flipDurationMs }}
					>
						<summary class="item-summary">
							<div class="drag-handle" use:dragHandle>
								<i class="ph-bold ph-dots-six-vertical"></i>
							</div>
							<div class="title">
								{item.title?.sv ||
									item.title?.en ||
									"Namnlös maträtt"}
							</div>
							<div class="chevron">
								<div class="button-container">
									<button
										onclick={() =>
											deleteItemInCategoryHandler(
												category._id,
												item._id,
											)}
										class="small secondary square"
										aria-label="toggle expand on items"
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
										bind:value={item.title[itemLanguage]}
										oninput={() => (isDirty = true)}
										type="text"
										placeholder={titlePlaceholders[
											itemLanguage
										]}
									/>
								</div>
								<div class="input-container">
									<div class="input-label">Pris</div>
									<input
										bind:value={item.price}
										oninput={() => (isDirty = true)}
										type="text"
										placeholder="t.ex. 189"
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
									bind:value={item.description[itemLanguage]}
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
		</details>
	{/each}

	{#if categories.length === 0}
		<div class="cwcms-no-categories-container">
			Menyn verkar vara tom. Skapa en ny kategori för att sätta igång.
		</div>
	{/if}
</div>

{#if $showCreateItemModal}
	<CreateItemModal
		onConfirm={handleCreateItemModalConfirm}
		onCancel={handleCreateItemModalCancel}
	/>
{/if}

{#if $showCreateCategoryModal}
	<CreateCategoryModal
		modalTitle="Skapa kategori"
		onConfirm={createCategory}
		onCancel={() => ($showCreateCategoryModal = false)}
	>
		<div class="input-container">
			<div class="input-label">Titel (SV)</div>
			<input
				bind:value={newCategoryTitle.sv}
				type="text"
				placeholder="t.ex. Varmrätter"
			/>
			<div class="input-description">
				Standardnamnet på kategorin. Visas när svenska är valt.
			</div>
		</div>
		<div class="input-container">
			<div class="input-label">Title (EN)</div>
			<input
				bind:value={newCategoryTitle.en}
				type="text"
				placeholder="e.g. Main Courses"
			/>
			<div class="input-description">
				Valfri engelsk översättning. Lämna tomt för att återanvända den
				svenska titeln.
			</div>
		</div>
	</CreateCategoryModal>
{/if}
