<template>
	<div class="relative h-24 w-full bg-lt-blue flex pc-ad" :class="{ 'hidden': !imgUrl }" @click="goToAD" >
		<img :src="imgUrl" alt="" class="ad-image"/>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getADListApi } from '@/server/api/FlashCardApi';

const props = defineProps<{
	subjectId: string;
}>();
const imgUrl = ref('');
const targetAdUrl = ref('');
const getADImg = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getADListApi(props.subjectId).then((res: any) => {
		imgUrl.value = res.rows[0]?.advertiseImg;
		targetAdUrl.value = res.rows[0]?.advertiseLink;
	});
};

const goToAD = () => {
	window.open(targetAdUrl.value, '_blank');
};

onMounted(() => {
	getADImg();
});

</script>

<style lang="scss" scoped>
.ad-image {
	max-height: 100%;
	width: auto;
	margin: auto;
}
.pc-ad {
	height: 12rem;
	cursor: pointer;
}

@media (max-width: 768px) {
  .ad-image {
    width: 100%;
  }
	.pc-ad {
		height: 6rem;
	}
}

/* 平板端（768px 到 1024px）的图片宽度设置为 100% */
@media (min-width: 769px) and (max-width: 1024px) {
  .ad-image {
    width: 100%;
  }
	.pc-ad {
		height: 6rem;
	}
}
</style>