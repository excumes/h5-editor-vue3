interface pageAnimations {
  label: String[]
  value: String[]
}

export const pageAnimations: pageAnimations = {
  label: ['无', '放大', '缩小', '淡入','移入','弹入','中心弹入','中心放大','翻滚进入','光速进入','魔幻进入','缩小进入','旋转进入'],
  value: ['none','scaleUp', 'scaleDown','fadeIn','fadeInLeft','bounceInLeft','bounceIn','zoomIn','rollInRight','lightSpeedInRight',"twisterInDownRight",'puffIn','twisterInUpRight'],
}