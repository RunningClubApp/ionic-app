import { getPlatforms, isPlatform } from '@ionic/vue'

function isMobile(): boolean {
  console.log(`=== platform[${getPlatforms()}]`)
  return isPlatform('android') ||
          isPlatform('iphone') ||
          isPlatform('ios') ||
          isPlatform('mobile')
}

export { isMobile }