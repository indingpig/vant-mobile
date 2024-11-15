<template>
	<div>
		<audio :src="AudioUrl" ref="audioRef" @play="handlePlay" @ended="handleEnded"></audio>
		<button type="button" class="text-black audio-btn disabled:opacity-50 flex items-baseline"
			@click="playAudio" :disabled="playDisabled">
			<i class="iconfont mr-2 text-lt-blue"
				v-if="showIcon"
				:class="{
					'icon-xibanyayu': languageIcon === 'Spanish',
					'icon-english-filled': languageIcon === 'English'
				}"
			></i>
			<p class="text-center text-current text-base" v-html="sentence"></p>
		</button>
	</div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
defineProps({
	AudioUrl: String,
	sentence: String,
	languageIcon: String,
	showIcon: Boolean,
});

const emits = defineEmits(['update-progress']);

const audioRef = ref<HTMLAudioElement | null>(null);
const playDisabled = ref(false);
let animationFrame: number | null = null;
const progressWidth = ref(0);

const playAudio = () => {
	audioRef.value?.play();
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

</style>