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

export function getADListApi(subjectId: string) {
	return request({
		url: '/business/advertise/subject/{subjectId}'.replace('{subjectId}', subjectId),
		method: 'get',
	});
}

export function getCompany(userId: string) {
  return request({
    url: '/business/company/' + userId,
    method: 'get'
  });
}
