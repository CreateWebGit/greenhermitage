import { writable } from "svelte/store";

export const formData = writable({
	name: "",
	email: "",
	guests: "",
	phone: "",
	message: "",
	date: "",
	time: {
		hour: "",
		minute: "",
	},
});

export const updateFormData = (updater) =>
	formData.update((current) =>
		typeof updater === "function"
			? updater(current)
			: { ...current, ...updater },
	);

/*

<script>
  import { updateFormData } from "$lib/stores/bookingFormStore";
</script>

<input
  on:input={(e) => updateFormData({ name: e.currentTarget.value })}
/>

updateFormData((current) => ({
  ...current,
  time: { ...current.time, hour: "09" },
}));

*/
