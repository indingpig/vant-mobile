<template>
	<div class="relative h-24 w-full bg-lt-blue" :class="{ 'hidden': !imgUrl }">
		<img :src="imgUrl" alt="" @click="goToAD" />
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

</style>