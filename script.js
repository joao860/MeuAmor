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
    this.indicators = document.querySelectorAll(".indicator")
    this.carousel = document.querySelector(".carousel-container")
    this.autoplayInterval = null
    this.isAutoplayPaused = false

    this.init()
  }

  init() {
    this.setupEventListeners()
    this.startAutoplay()
  }

  setupEventListeners() {
    // Touch/Swipe events
    let startX = 0
    let startY = 0
    let isDragging = false

    this.carousel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      isDragging = true
      this.pauseAutoplay()
    })

    this.carousel.addEventListener("touchmove", (e) => {
      if (!isDragging) return
      e.preventDefault()
    })

    this.carousel.addEventListener("touchend", (e) => {
      if (!isDragging) return

      const endX = e.changedTouches[0].clientX
      const endY = e.changedTouches[0].clientY
      const diffX = startX - endX
      const diffY = startY - endY

      // Verifica se é um swipe horizontal
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          this.nextSlide()
        } else {
          this.prevSlide()
        }
      }

      isDragging = false
      this.resumeAutoplay()
    })

    // Mouse events para desktop
    let mouseStartX = 0
    let isMouseDragging = false

    this.carousel.addEventListener("mousedown", (e) => {
      mouseStartX = e.clientX
      isMouseDragging = true
      this.pauseAutoplay()
      e.preventDefault()
    })

    this.carousel.addEventListener("mousemove", (e) => {
      if (!isMouseDragging) return
      e.preventDefault()
    })

    this.carousel.addEventListener("mouseup", (e) => {
      if (!isMouseDragging) return

      const diffX = mouseStartX - e.clientX

      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          this.nextSlide()
        } else {
          this.prevSlide()
        }
      }

      isMouseDragging = false
      this.resumeAutoplay()
    })

    this.carousel.addEventListener("mouseleave", () => {
      if (isMouseDragging) {
        isMouseDragging = false
        this.resumeAutoplay()
      }
    })

    // Pausa autoplay quando hover
    this.carousel.addEventListener("mouseenter", () => {
      this.pauseAutoplay()
    })

    this.carousel.addEventListener("mouseleave", () => {
      this.resumeAutoplay()
    })
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

    // Lista de músicas - você pode adicionar suas músicas aqui
    this.playlist = [
      {
        title: "Música Romântica 1",
        artist: "Tim Maia",
        src: "audio/EuAmoVc.mp3",
        cover: "img/euAmoLogo.png",
      },
      {
        title: "Música Romântica 2",
        artist: "Artista 2",
        src: "audio/musica2.mp3",
        cover: "img/cover2.jpg",
      },
      {
        title: "Música Romântica 3",
        artist: "Artista 3",
        src: "audio/musica3.mp3",
        cover: "img/cover3.jpg",
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
    this.volumeBar = document.getElementById("volumeBar")
    this.volumeFill = document.getElementById("volumeFill")
    this.musicPlayer = document.querySelector(".music-player")
  }

  setupEventListeners() {
    // Controles de reprodução
    this.playPauseBtn.addEventListener("click", () => this.togglePlay())
    this.prevBtn.addEventListener("click", () => this.prevTrack())
    this.nextBtn.addEventListener("click", () => this.nextTrack())

    // Barra de progresso
    this.progressBar.addEventListener("click", (e) => this.seek(e))

    // Controle de volume
    this.volumeBar.addEventListener("click", (e) => this.setVolume(e))

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
    const track = this.playlist[index]
    if (!track) return

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
    this.updateVolumeDisplay()
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
    const nextIndex = (this.currentTrack + 1) % this.playlist.length
    this.loadTrack(nextIndex)
    if (this.isPlaying) {
      this.play()
    }
  }

  prevTrack() {
    const prevIndex = (this.currentTrack - 1 + this.playlist.length) % this.playlist.length
    this.loadTrack(prevIndex)
    if (this.isPlaying) {
      this.play()
    }
  }

  seek(e) {
    const rect = this.progressBar.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    this.audio.currentTime = percent * this.audio.duration
  }

  setVolume(e) {
    const rect = this.volumeBar.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    this.volume = Math.max(0, Math.min(1, percent))
    this.audio.volume = this.volume
    this.updateVolumeDisplay()
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

  updateVolumeDisplay() {
    this.volumeFill.style.width = this.volume * 100 + "%"
  }

  formatTime(seconds) {
    if (isNaN(seconds)) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return mins + ":" + (secs < 10 ? "0" : "") + secs
  }

  showLoading() {
    this.musicTitle.textContent = "Carregando..."
  }

  hideLoading() {
    // Título será atualizado quando a música carregar
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
  // Inicia a reprodução imediatamente
  musicPlayer.play()

  setTimeout(() => {
    firstScreen.style.display = "none"
    secondScreen.classList.add("visible")
    document.body.style.overflowY = "auto"

    // Carrega as imagens de forma progressiva
    const images = document.querySelectorAll(".second-screen img");
    images.forEach((img, index) => {
      setTimeout(() => {
        img.style.opacity = "1";
      }, index * 200);
    });

    // Inicializa o carrossel após as imagens carregarem
    setTimeout(() => {
      new PhotoCarousel();
    }, 2000);
  }, 3000);

  // Adiciona efeito de hover no cartão
  card.addEventListener("mouseover", () => {
    card.style.transform = "scale(1.05)";
  });

  card.addEventListener("mouseout", () => {
    card.style.transform = "scale(1)";
  });
});
