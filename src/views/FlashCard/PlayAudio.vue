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
			<p class="text-center text-current text-xl min-h-4"
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
const { showModal, videoUrl, closeVideo, downLoadFile } = useVideo();
// const tempUrl = ref('');
const playAudio = () => {
	if (!props.MediaUrl) return;
	// 通过MediaUrl判断是音频还是视频
	const videoList = ['.mp4', '.webm', '.flv', '.avi', '.mov', '.wmv', '.rmvb', '.mkv', '.3gp', '.rm', '.asf', '.divx', '.mpg', '.mpeg', '.mpe', '.ts', '.vob'];
	if (videoList.some((item) => props.MediaUrl?.toLowerCase().endsWith(item))) {
		videoUrl.value = props.MediaUrl;
		showModal.value = true;
		return;
	}
	if (props.MediaUrl.toLowerCase().endsWith('.mp3')) {
		// 如果还在播放的话，就返回
		if (audioRef.value?.paused === false) return;
		audioRef.value?.play();
		return;
	}
	downLoadFile(props.MediaUrl);
};


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
});
</script>

<style lang="scss" scoped>
.van-popup {
	width: 100%;
	height: 100%;

}
</style>