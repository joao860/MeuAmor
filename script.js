const card = document.getElementById("card")
const firstScreen = document.getElementById("firstScreen")
const secondScreen = document.getElementById("secondScreen")

// Função para criar corações
function createHearts() {
  // Limpa corações existentes
  const existingHearts = document.querySelectorAll(".falling-heart")
  existingHearts.forEach((heart) => heart.remove())

  // Cria corações brancos apenas
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement("div")
    heart.classList.add("falling-heart")

    // Apenas corações brancos
    heart.innerHTML = "🤍"

    // Posicionamento mais distribuído
    heart.style.left = Math.random() * 90 + 5 + "vw"
    heart.style.animationDuration = Math.random() * 2 + 3 + "s"
    heart.style.fontSize = Math.random() * 10 + 20 + "px"
    heart.style.animationDelay = Math.random() * 1 + "s"

    document.body.appendChild(heart)

    // Remove após a animação
    setTimeout(() => {
      if (heart.parentNode) {
        heart.remove()
      }
    }, 5000)
  }
}

// Pré-carrega as imagens para evitar atrasos
function preloadImages() {
  const imageUrls = [
    "img/1.png",
    "img/2.png",
    "img/3.png",
    "img/4.png",
    "img/5.png",
    "img/6.png",
    "img/7.png",
    "img/8.png",
    "img/9.png",
    "img/10.png",
    "img/piramede.png",
    "img/piramede2.png",
    "img/stars.png",
    "img/StarsENDcoraçoes.png",
    "img/titulo1.png",
    "img/titulo2.png",
    "img/moments1.jpeg",
    "img/moments2.jpeg",
    "img/moments3.jpeg",
    "img/moments4.jpeg",
    "img/moments5.jpeg",
    "img/moments6.jpeg",
    "img/moments7.jpeg",
  ]

  imageUrls.forEach((url) => {
    const img = new Image()
    img.src = url
  })
}

// Carrossel de Fotos
class PhotoCarousel {
  constructor() {
    this.currentSlide = 0
    this.slides = document.querySelectorAll(".carousel-slide")
    this.carousel = document.querySelector(".carousel-container")
    this.autoplayInterval = null
    this.isAutoplayPaused = false
    this.isDragging = false
    this.startX = 0
    this.currentTranslate = 0
    this.prevTranslate = 0
    this.animationID = 0

    this.init()
  }

  init() {
    this.setupEventListeners()
    this.startAutoplay()
  }

  setupEventListeners() {
    // Touch/Swipe events
    this.carousel.addEventListener("touchstart", this.touchStart.bind(this))
    this.carousel.addEventListener("touchmove", this.touchMove.bind(this))
    this.carousel.addEventListener("touchend", this.touchEnd.bind(this))

    // Mouse events para desktop
    this.carousel.addEventListener("mousedown", this.mouseDown.bind(this))
    this.carousel.addEventListener("mousemove", this.mouseMove.bind(this))
    this.carousel.addEventListener("mouseup", this.mouseUp.bind(this))
    this.carousel.addEventListener("mouseleave", this.mouseLeave.bind(this))

    // Pausa autoplay quando hover
    this.carousel.addEventListener("mouseenter", () => {
      this.pauseAutoplay()
    })

    this.carousel.addEventListener("mouseleave", () => {
      this.resumeAutoplay()
    })
  }

  touchStart(e) {
    this.startX = e.touches[0].clientX
    this.isDragging = true
    this.pauseAutoplay()
  }

  touchMove(e) {
    if (!this.isDragging) return
    e.preventDefault()
    const currentX = e.touches[0].clientX
    const diff = this.startX - currentX

    // Adiciona um pequeno movimento visual durante o arrasto
    if (Math.abs(diff) > 10) {
      const activeSlide = this.slides[this.currentSlide]
      const moveX = -diff / 10
      activeSlide.style.transform = `translateX(${moveX}px) scale(1)`
    }
  }

  touchEnd(e) {
    if (!this.isDragging) return

    const endX = e.changedTouches[0].clientX
    const diff = this.startX - endX

    // Reseta qualquer transformação aplicada durante o arrasto
    const activeSlide = this.slides[this.currentSlide]
    activeSlide.style.transform = ""

    // Verifica se é um swipe horizontal
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        this.nextSlide()
      } else {
        this.prevSlide()
      }
    }

    this.isDragging = false
    this.resumeAutoplay()
  }

  mouseDown(e) {
    this.startX = e.clientX
    this.isDragging = true
    this.pauseAutoplay()
    e.preventDefault()
  }

  mouseMove(e) {
    if (!this.isDragging) return
    e.preventDefault()

    const currentX = e.clientX
    const diff = this.startX - currentX

    // Adiciona um pequeno movimento visual durante o arrasto
    if (Math.abs(diff) > 10) {
      const activeSlide = this.slides[this.currentSlide]
      const moveX = -diff / 10
      activeSlide.style.transform = `translateX(${moveX}px) scale(1)`
    }
  }

  mouseUp(e) {
    if (!this.isDragging) return

    const diff = this.startX - e.clientX

    // Reseta qualquer transformação aplicada durante o arrasto
    const activeSlide = this.slides[this.currentSlide]
    activeSlide.style.transform = ""

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        this.nextSlide()
      } else {
        this.prevSlide()
      }
    }

    this.isDragging = false
    this.resumeAutoplay()
  }

  mouseLeave() {
    if (this.isDragging) {
      // Reseta qualquer transformação aplicada durante o arrasto
      const activeSlide = this.slides[this.currentSlide]
      activeSlide.style.transform = ""

      this.isDragging = false
      this.resumeAutoplay()
    }
  }

  goToSlide(index) {
    // Remove active class from current slide
    this.slides[this.currentSlide].classList.remove("active")

    // Update current slide
    this.currentSlide = index

    // Add active class to new slide
    this.slides[this.currentSlide].classList.add("active")
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length
    this.goToSlide(nextIndex)
  }

  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length
    this.goToSlide(prevIndex)
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      if (!this.isAutoplayPaused) {
        this.nextSlide()
      }
    }, 7000) // 7 segundos - velocidade mais devagar
  }

  pauseAutoplay() {
    this.isAutoplayPaused = true
  }

  resumeAutoplay() {
    setTimeout(() => {
      this.isAutoplayPaused = false
    }, 1000) // Resume após 1 segundo
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval)
    }
  }
}

// Player de Música
class MusicPlayer {
  constructor() {
    this.currentTrack = 0
    this.isPlaying = false
    this.audio = new Audio()
    this.volume = 0.7
    this.isChangingTrack = false
    this.direction = "next" // 'next' ou 'prev'

    // Lista de músicas - você pode adicionar suas músicas aqui
    this.playlist = [
      {
        title: "Eu Amo Você",
        artist: "Tim Maia",
        src: "audio/EuAmoVc.mp3",
        cover: "img/euAmoLogo.png",
      },
      {
        title: "Velha infancia",
        artist: "Tribalistas",
        src: "audio/velhaInf.mp3",
        cover: "img/m1.png",
      },
      {
        title: "Cartel 5 estrela",
        artist: "Cartel mcs",
        src: "audio/5.mp3",
        cover: "img/estrelas.png",
      },
    ]

    this.init()
  }

  init() {
    this.setupElements()
    this.setupEventListeners()
    this.loadTrack(0)
    this.setupSwipeGestures()
  }

  setupElements() {
    this.playPauseBtn = document.getElementById("playPauseBtn")
    this.prevBtn = document.getElementById("prevBtn")
    this.nextBtn = document.getElementById("nextBtn")
    this.progressBar = document.getElementById("progressBar")
    this.progressFill = document.getElementById("progressFill")
    this.currentTimeEl = document.getElementById("currentTime")
    this.totalTimeEl = document.getElementById("totalTime")
    this.musicTitle = document.getElementById("musicTitle")
    this.musicArtist = document.getElementById("musicArtist")
    this.albumImage = document.getElementById("albumImage")
    this.albumCover = document.getElementById("albumCover")
    this.musicPlayer = document.querySelector(".music-player")
  }

  setupEventListeners() {
    // Controles de reprodução
    this.playPauseBtn.addEventListener("click", () => this.togglePlay())
    this.prevBtn.addEventListener("click", () => this.prevTrack())
    this.nextBtn.addEventListener("click", () => this.nextTrack())

    // Barra de progresso
    this.progressBar.addEventListener("click", (e) => this.seek(e))

    // Eventos do áudio
    this.audio.addEventListener("loadedmetadata", () => this.updateDuration())
    this.audio.addEventListener("timeupdate", () => this.updateProgress())
    this.audio.addEventListener("ended", () => this.nextTrack())
    this.audio.addEventListener("loadstart", () => this.showLoading())
    this.audio.addEventListener("canplay", () => this.hideLoading())
  }

  setupSwipeGestures() {
    let startX = 0
    let startY = 0
    let isDragging = false

    this.musicPlayer.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      isDragging = true
    })

    this.musicPlayer.addEventListener("touchmove", (e) => {
      if (!isDragging) return
      e.preventDefault()
    })

    this.musicPlayer.addEventListener("touchend", (e) => {
      if (!isDragging) return

      const endX = e.changedTouches[0].clientX
      const endY = e.changedTouches[0].clientY
      const diffX = startX - endX
      const diffY = startY - endY

      // Verifica se é um swipe horizontal
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          this.nextTrack()
        } else {
          this.prevTrack()
        }
      }

      isDragging = false
    })
  }

  loadTrack(index) {
    if (this.isChangingTrack) return

    const track = this.playlist[index]
    if (!track) return

    // Animação de transição
    this.animateTrackChange()

    setTimeout(() => {
      this.currentTrack = index
      this.audio.src = track.src
      this.musicTitle.textContent = track.title
      this.musicArtist.textContent = track.artist

      // Carrega a capa se existir
      if (track.cover) {
        this.albumImage.src = track.cover
        this.albumImage.style.display = "block"
      } else {
        this.albumImage.style.display = "none"
      }

      this.audio.volume = this.volume

      // Completa a animação
      setTimeout(() => {
        this.isChangingTrack = false
        this.albumCover.classList.remove("slide-out-left", "slide-out-right")
        this.albumCover.classList.remove("slide-in-left", "slide-in-right")
      }, 500)
    }, 500)
  }

  animateTrackChange() {
    this.isChangingTrack = true

    // Animação de saída
    if (this.direction === "next") {
      this.albumCover.classList.add("slide-out-left")
      setTimeout(() => {
        this.albumCover.classList.remove("slide-out-left")
        this.albumCover.classList.add("slide-in-right")
      }, 500)
    } else {
      this.albumCover.classList.add("slide-out-right")
      setTimeout(() => {
        this.albumCover.classList.remove("slide-out-right")
        this.albumCover.classList.add("slide-in-left")
      }, 500)
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause()
    } else {
      this.play()
    }
  }

  play() {
    this.audio
      .play()
      .then(() => {
        this.isPlaying = true
        this.playPauseBtn.textContent = "⏸"
      })
      .catch((error) => {
        console.log("Erro ao reproduzir:", error)
      })
  }

  pause() {
    this.audio.pause()
    this.isPlaying = false
    this.playPauseBtn.textContent = "▶"
  }

  nextTrack() {
    if (this.isChangingTrack) return
    this.direction = "next"
    const nextIndex = (this.currentTrack + 1) % this.playlist.length
    this.loadTrack(nextIndex)
    if (this.isPlaying) {
      setTimeout(() => {
        this.play()
      }, 1000)
    }
  }

  prevTrack() {
    if (this.isChangingTrack) return
    this.direction = "prev"
    const prevIndex = (this.currentTrack - 1 + this.playlist.length) % this.playlist.length
    this.loadTrack(prevIndex)
    if (this.isPlaying) {
      setTimeout(() => {
        this.play()
      }, 1000)
    }
  }

  seek(e) {
    const rect = this.progressBar.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    this.audio.currentTime = percent * this.audio.duration
  }

  updateProgress() {
    if (this.audio.duration) {
      const percent = (this.audio.currentTime / this.audio.duration) * 100
      this.progressFill.style.width = percent + "%"
      this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime)
    }
  }

  updateDuration() {
    this.totalTimeEl.textContent = this.formatTime(this.audio.duration)
  }

  formatTime(seconds) {
    if (isNaN(seconds)) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return mins + ":" + (secs < 10 ? "0" : "") + secs
  }

  showLoading() {
    // Não altera o título durante o carregamento
    // Mantém o título da música atual
  }

  hideLoading() {
    // Não faz nada, pois o título já está definido
  }
}

// Instância global do player
let musicPlayer

// Carrega imagens quando o documento estiver pronto
document.addEventListener("DOMContentLoaded", preloadImages)

// Evento de clique no cartão
card.addEventListener("click", () => {
  createHearts()

  // Inicializa o player de música imediatamente quando clica no envelope
  musicPlayer = new MusicPlayer()

  // Inicia a reprodução imediatamente sem delay
  musicPlayer.play()

  // Reduzir o tempo de espera para a transição
  setTimeout(() => {
    firstScreen.style.display = "none"
    secondScreen.classList.add("visible")
    document.body.style.overflowY = "auto"

    // Carrega as imagens de forma progressiva
    const images = document.querySelectorAll(".second-screen img")
    images.forEach((img, index) => {
      setTimeout(() => {
        img.style.opacity = "1"
      }, index * 200)
    })

    // Inicializa o carrossel após as imagens carregarem
    setTimeout(() => {
      new PhotoCarousel()
    }, 1500)
  }, 1500) // Reduzido de 3000 para 1500ms
})

// Adiciona efeito de hover no cartão
card.addEventListener("mouseover", () => {
  card.style.transform = "scale(1.05)"
})

card.addEventListener("mouseout", () => {
  card.style.transform = "scale(1)"
})
