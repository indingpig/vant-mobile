import request from '@/server/utils/request';

export const flashAPiString = {
	adUrl: '/flashCard/ad',
};

export function getFlashCardListApi(subjectId: string) {
	return request({
		url: '/business/subject/{subjectId}'.replace('{subjectId}', subjectId as string),
		method: 'get'
	});
}

export function getADImgApi(url: string) {
	return request({
		url: url,
		method: 'get',
	});
}

export function getCompany(userId: string) {
  return request({
    url: '/business/company/' + userId,
    method: 'get'
  });
}
