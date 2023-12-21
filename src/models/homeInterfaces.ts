export interface ItemBanner {
  type: number
  link: string
  banner: string
  cover: string
  target: string
  title: string
  description: string
  ispr: number
  encodeId: string
}

export interface ItemHome {
  sectionType: string;
  viewType: string;
  title: string;
  link: string;
  sectionId: string;
  items: ItemBanner[]; 
}
