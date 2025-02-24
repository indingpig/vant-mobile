export interface ListItem {
	context: string;
	url: string;
	subjectImg?: string;
}

export interface MediaItem extends ListItem {
	imageUrl: string;
}

export interface CardContent {
	language?: string;
	wordAudioUrl?: string;
	sentenceAudioUrl?: string;
	word?: string;
	sentence?: string;
}
interface BusinessWordsInfo {
  wordsId?: string;         // 详细内容编号
  contentId: string;       // 内容编号
  wordsText: string;       // 详细内容
  wordsVoice: string;      // 详细内容音频
  wordsVideo: string;      // 详细内容视频
  wordsLanguage: string;   // 详细内容语言
  wordsImg?: string;        // 内容图片
  wordsDesc?: string;       // 内容描述
  isWord: string;          // 是否单词
  wordsSort?: number;       // 内容排序
  isExpired: string;       // 是否过期 (Y=是, N=否)
}

export interface Card {
	contentImg: string;
	contentDesc: string;
	contentId: string;
	wordsList: BusinessWordsInfo[];
}

export interface FloderItem {
	title: string;
	catalogName: string;
	unit: string;
	catalogDesc: string;
	catalogImg: string;
	contentList: Card[];
}

export interface Subject {
	imgSub?: ListItem;
	alist?: ListItem[];
	subjectDesc: string;
	subjectImg: string;
	context: string;
	catalogList: FloderItem[];
}