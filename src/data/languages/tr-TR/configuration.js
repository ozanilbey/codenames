export default {
  code: 'tr',
  players: {
    'blue-agent': { displayName: 'mavi ajanlar' },
    'red-agent': { displayName: 'kırmızı ajanlar' }
  },
  newGameText: 'yeni oyun',
  startGameText: 'oyunu başlat',
  endTurnText: 'eli bitir',
  gameReadyText: 'Oyun başlıyor...',
  gameOverText: 'Oyun bitti!',
  priorInstructionsText: 'Aşağıdaki tabloyu ezberlemeli ya da fotoğrafını çekerek saklamalısın çünkü bu tabloyu ilk ve son görüşün olacak.',
  statusText: (state, player) => {
    if(state === 'won') {
      return `${player} kazandı!`
    } else if(state === 'switched') {
      const lastVowel = [...player.match(/[aeıioöuüAEIİOÖUÜ]/gim)].pop()
      const suffix = /[aıouAIOU]/.test(lastVowel) ? 'da!' : 'de!'
      return `Sıra ${player}${suffix}`
    } else {
      return ''
    }
  }
}
