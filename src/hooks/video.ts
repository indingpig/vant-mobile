import { ref } from 'vue';

export function useVideo() {
	const showModal = ref(false);
	const videoUrl  = ref('');
	const playVideo = () => {

	};

	const closeVideo = () => {
		showModal.value = false;
		videoUrl.value = '';
	};
	return {
		showModal,
		videoUrl,
		playVideo,
		closeVideo
	};
}