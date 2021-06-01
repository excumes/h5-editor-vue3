export interface PageData {
  id: String;
  pageFlipSets: PageFlipSets
  pages: Page[]
}

interface PageFlipSets {
  pageFlipModeType: Number
  pageFlipUpDownMode: Number
  pageFlipLeftRightMode: Number
  pageFlipSpecialMode: Number
  pageFlipOtherSetUp: Number[]
}

interface Page {
  id: String
  pageLongSize: Number
  banPageSlideDown: Boolean
  autoPageDown: Boolean
  autoPageDownTime: Number
  background: {
    style: BackgroundStyle
    animation: BackgroundAnimation
  }
  elements: Element[]
}
interface BackgroundStyle {
  backgroundColor: String
  filter: String
  backgroundImage: String
  opacity: Boolean
}

interface BackgroundAnimation {
  animationLabel: String
  animationName: String
  animationDuration: Number
}

interface Element{
  id: String
  style: ElementStyle
  animations: ElementAnimation
  currentPlayAm: String
  type: Number
  src: String
}

interface ElementStyle {
  left: Number | String
  top: Number | String
  width: Number | String
  height: Number | String
  backgroundColor: String
  roteDeg: Number
  opacity: Number
  borderColor: String
  borderWidth: Number
  borderStyle: String
  borderRadius: Number
  boxShadowSize: Number
  boxShadowDirection: Number
  boxShadowSpread: Number
  boxShadowColor: String
}
interface ElementAnimation {
  animationLabel: String
  animationName: String
  animationDuration: Number
  animationDelay: String
  animationIterationCount: Number
  animationLoop: Boolean
}