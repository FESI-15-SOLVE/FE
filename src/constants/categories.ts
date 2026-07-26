import imgCategoryBusiness from '@/assets/imgs/img_category_business.svg?url';
import imgCategoryEtc from '@/assets/imgs/img_category_etc.svg?url';
import imgCategoryFamily from '@/assets/imgs/img_category_family.svg?url';
import imgCategoryHobby from '@/assets/imgs/img_category_hobby.svg?url';
import imgCategorySports from '@/assets/imgs/img_category_sports.svg?url';
import imgCategoryStudy from '@/assets/imgs/img_category_study.svg?url';

export interface MeetingCategory {
  id: number;
  name: string;
  imageSrc: string;
}

export const CATEGORIES_DATA: MeetingCategory[] = [
  {
    id: 334,
    name: '취미/여가',
    imageSrc: imgCategorySports || '',
  },
  {
    id: 335,
    name: '스터디',
    imageSrc: imgCategoryStudy || '',
  },
  {
    id: 336,
    name: '비즈니스',
    imageSrc: imgCategoryBusiness || '',
  },
  {
    id: 337,
    name: '운동/건강',
    imageSrc: imgCategoryHobby || '',
  },
  {
    id: 338,
    name: '가족/육아',
    imageSrc: imgCategoryFamily || '',
  },
  {
    id: 339,
    name: '기타',
    imageSrc: imgCategoryEtc || '',
  },
];

export const CATEGORIES_WITH_ALL = [
  { id: 'ALL', name: '전체' },
  ...CATEGORIES_DATA.map(({ id, name }) => ({ id, name })),
];
