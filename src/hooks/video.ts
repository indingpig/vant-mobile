import { ref } from 'vue';

export function useVideo() {
	const showModal = ref(false);
	const videoUrl  = ref('');
	const downLoadFile = (url: string) => {
		const host = window.location.origin;
		window.open(host + url, '_blank');
	};

	const closeVideo = () => {
		showModal.value = false;
		videoUrl.value = '';
	};
	return {
		showModal,
		videoUrl,
		downLoadFile,
		closeVideo
	};
}