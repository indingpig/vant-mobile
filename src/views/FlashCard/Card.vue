<template>
	<div class="select-none overflow-hidden rounded-b bg-lt-blue">
		<div class="relative w-full py-4 flex justify-center">
			<div class="h-[480px] w-[320px] px-2">
				<div class="h-full w-full rounded bg-white hover:cursor-pointer">
					<div class="flex h-full w-full flex-col items-center gap-2">
						<!-- 卡片图片与播放 -->
						<div class="w-full flex-auto overflow-hidden">
							<div class="flex h-full w-full flex-col items-center overflow-auto">
								<div v-html="content.contentDesc"></div>
								<!-- 图片 -->
								<div class="flex flex-shrink-0 flex-grow items-center outline-none mx-10">
									<img v-lazy="content.contentImg" alt="">
								</div>
								<!-- 播放 -->
								<div class="w-full flex-auto flex-grow max-h-[200px] overflow-auto my-4">
									<div class="flex h-full w-full flex-auto flex-col justify-between px-4">
										<PlayAudio
											class="flex w-full flex-auto flex-col justify-center gap-2 my-1"
											v-for="(item, index) in content.wordsList" :key="index"
											:MediaUrl="item.wordsVoice"
											:sentence="item.wordsText"
											:languageIcon="item.wordsLanguage"
											:showIcon="true"
											@update-progress="updateProgress"
										/>
										<!-- <div :class="[item.wordsLanguage ? wordClass : progressClass]" v-for="(item, index) in content.wordsList" :key="index">
										</div> -->
									</div>
								</div>
							</div>
						</div>
						<!-- 按钮 -->
						<div class="flex flex-row items-center justify-center gap-2">
							<i class="flex items-center justify-center h-8 w-8 text-lt-blue iconfont font-sise-26 icon-xiangzuo" @click="prevCard">
							</i>
							<span class="inline-flex h-8 w-8 items-center justify-center text-sm text-gray-400">{{ pageNum }}</span>
							<i class="flex items-center justify-center h-8 w-8 text-lt-blue iconfont font-sise-26 icon-xiangyou" @click="nextCard">
							</i>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- <div>
		</div> -->
	</div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue';
import type { Card } from '@/types/FlashCard.d.ts';
import PlayAudio from './PlayAudio.vue';
defineProps({
	content: {
		type: Object as PropType<Card>,
		required: true,
	},
	pageNum: {
		type: Number,
		default: 1,
	}
});

const emits = defineEmits(['prev-card', 'next-card']);

// const wordClass = ref('flex w-full flex-auto flex-col items-center justify-center gap-2');

// const progressClass = ref('h-0.5 w-full bg-gray-200');

const progressWidth = ref(0);

const updateProgress = (progress: number) => {
	progressWidth.value = progress;
};

const prevCard = () => {
	emits('prev-card');
};
const nextCard = () => {
	emits('next-card');
};

</script>

<style lang="scss" scoped>

</style>