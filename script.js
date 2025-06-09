const card = document.getElementById("card")
const firstScreen = document.getElementById("firstScreen")
const secondScreen = document.getElementById("secondScreen")

// Função para criar corações
function createHearts() {
  // Limpa corações existentes
  const existingHearts = document.querySelectorAll(".falling-heart")
  existingHearts.forEach((heart) => heart.remove())

  // Cria corações mais fofos e coloridos
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div")
    heart.classList.add("falling-heart")

    // Array de corações coloridos e fofos
    const heartEmojis = ["🤍", "🤍", "🤍", "🤍", "🤍", "🤍", "🤍"]
    heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)]

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
    "img/piramede.png",
    "img/stars.png",
  ]

  imageUrls.forEach((url) => {
    const img = new Image()
    img.src = url
  })
}

// Carrega imagens quando o documento estiver pronto
document.addEventListener("DOMContentLoaded", preloadImages)

// Evento de clique no cartão
card.addEventListener("click", () => {
  createHearts()

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
  }, 3000)
})

// Adiciona efeito de hover no cartão
card.addEventListener("mouseover", () => {
  card.style.transform = "scale(1.05)"
})

card.addEventListener("mouseout", () => {
  card.style.transform = "scale(1)"
})
