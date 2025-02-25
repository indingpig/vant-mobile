<template>
	<div>
		<audio :src="MediaUrl" ref="audioRef" @play="handlePlay" @ended="handleEnded"></audio>
		<!-- <video src="./upupup.mp4" ref="mediaRef" @play="handlePlay" @ended="handleEnded" controls></video> -->
		<button type="button" class="text-black audio-btn disabled:opacity-50 flex items-baseline"
			@click="playAudio" :disabled="playDisabled">
			<i class="iconfont mr-2 text-lt-blue"
				v-if="showIcon"
				:class="{
					'icon-xibanyayu': languageIcon === 'Spanish',
					'icon-english-filled': languageIcon === 'English',
					'text-lt-blue': languageIcon === 'English',
					'text-lt-orange': languageIcon === 'Spanish',
				}"
			></i>
			<p class="text-center text-current text-xl"
				v-html="sentence"
				:class="[isWord ? 'zain-regular' : 'zain-light']"
			></p>
		</button>
		<van-popup v-model:show="showModal" teleport="body" closeable @click-close-icon="closeVideo">
			<video-player
				class="w-full h-full"
				v-if="showModal"
				:src="videoUrl"
				controls
			/>
		</van-popup>
	</div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { useVideo } from '@/hooks/video';
const props = defineProps({
	MediaUrl: String,
	sentence: String,
	languageIcon: String,
	showIcon: Boolean,
	isWord: Boolean,
});

const emits = defineEmits(['update-progress']);
const audioRef = ref<HTMLAudioElement | null>(null);
const playDisabled = ref(false);
// let videoEle: HTMLVideoElement | null = null;
// let videoContainer: HTMLDivElement | null = null;
let animationFrame: number | null = null;
const progressWidth = ref(0);
const { showModal, videoUrl, closeVideo } = useVideo();
// const tempUrl = ref('');
const playAudio = () => {
	if (!props.MediaUrl) return;
	// 通过MediaUrl判断是音频还是视频
	const videoList = ['.mp4', '.webm', '.flv', '.avi', '.mov', '.wmv', '.rmvb', '.mkv', '.3gp', '.rm', '.asf', '.divx', '.mpg', '.mpeg', '.mpe', '.ts', '.vob'];
	if (videoList.some((item) => props.MediaUrl?.endsWith(item))) {
		// playVideo();
		videoUrl.value = props.MediaUrl;
		showModal.value = true;
	} else {
		// 如果还在播放的话，就返回
		if (audioRef.value?.paused === false) return;
		audioRef.value?.play();
	}
};

// const playVideo = () => {
// 	if (videoEle) {
// 		videoEle.play();
// 		return;
// 	}
// 	if (!props.MediaUrl) return;
// 	videoContainer = document.createElement('div');
// 	videoContainer.style.width = '100%';
// 	videoContainer.style.position = 'fixed';
// 	videoContainer.style.top = '0';
// 	videoContainer.style.left = '0';
// 	videoContainer.style.zIndex = '9999';
// 	videoContainer.style.width = '100%';
// 	videoEle = document.createElement('video');
// 	videoEle.src = props.MediaUrl;
// 	videoEle.controls = true;
// 	// videoEle.autoplay = true;
// 	videoEle.style.width = '100%';
// 	videoEle.addEventListener('play', handlePlayVideo);
// 	videoEle.addEventListener('ended', handleVideoEnded);
// 	videoContainer.appendChild(videoEle);
// 	document.body.appendChild(videoContainer);
// 	addCloseButton();
// };

// const addCloseButton = () => {
// 	const closeBtn = document.createElement('div');
// 	closeBtn.innerText = 'X';
// 	closeBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
// 	closeBtn.classList.add('video-close-btn');
// 	closeBtn.addEventListener('click', destroyVideoElement);
// 	videoContainer?.appendChild(closeBtn);
// };

// const handlePlayVideo = () => {
// 	if (videoEle) {
// 		videoEle.play();
// 	}
// };

// const handleVideoEnded = () => {
// 	if (videoEle) {
// 		videoEle.pause();
// 		videoEle.currentTime = 0;
// 	}
// };


// const destroyVideoElement = () => {
// 	if (videoEle) {
// 		videoEle.pause();
// 		videoEle.removeEventListener('play', handlePlayVideo);
// 		videoEle.removeEventListener('ended', handleVideoEnded);
// 		videoContainer?.removeChild(videoEle);
// 		if (videoContainer) {
// 			document.body.removeChild(videoContainer);
// 		}
// 		videoEle = null;
// 		videoContainer = null;
// 	}
// };

const handlePlay = () => {
	playDisabled.value = true;
	updateProgress();
};

const updateProgress = () => {
	if (audioRef.value) {
		const progress = audioRef.value.currentTime / audioRef.value.duration;
		progressWidth.value = progress * 100;
		emits('update-progress', progressWidth.value);
	}
	animationFrame = requestAnimationFrame(updateProgress);
};

const handleEnded = () => {
	playDisabled.value = false;
	emits('update-progress', 0);
	if (animationFrame) {
		cancelAnimationFrame(animationFrame);
	}
};

onUnmounted(() => {
	if (animationFrame) {
		cancelAnimationFrame(animationFrame);
	}
	// if (videoEle) {
	// 	destroyVideoElement();
	// }
});
</script>

<style lang="scss" scoped>
.van-popup {
	width: 100%;
	height: 100%;

}
</style>