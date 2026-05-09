export const defaultConfig = {
  businessName: "MGX3D",
  tagline: "DO DIGITAL PARA O REAL",
  description: "Especialistas em impressão 3D, unindo tecnologia, inovação e alta qualidade para materializar seus projetos.",
  whatsapp: {
    number: "5581991042106", // Apenas números com DDI + DDD + Número
    displayNumber: "(81) 99104-2106",
    message: "Olá! Vim pelo site e gostaria de fazer um orçamento de impressão 3D."
  },
  instagram: {
    handle: "@mgx3d_",
    url: "https://instagram.com/mgx3d_"
  },
  // Para atualizar as fotos, basta trocar as URLs abaixo
  // Você pode hospedar suas fotos no Imgur, Google Drive (com link direto) ou na própria pasta public/ do projeto.
  portfolio: [
    {
      id: 1,
      title: "Action Figure e Miniaturas",
      imageUrl: "/fotos/WhatsApp Image 2026-05-09 at 11.01.34.jpeg",
      category: "Colecionáveis"
    },
    {
      id: 2,
      title: "Peças Mecânicas e Protótipos",
      imageUrl: "/fotos/1cf48680-d930-4760-8886-be38274d87c4.png",
      category: "Industrial"
    },
    {
      id: 3,
      title: "Decoração Geek e Moderna",
      imageUrl: "/fotos/Captura de tela 2026-05-09 110557.png",
      category: "Decoração"
    },
    {
      id: 4,
      title: "Brindes Personalizados",
      imageUrl: "/fotos/Captura de tela 2026-05-09 110649.png",
      category: "Marketing"
    },
    {
      id: 5,
      title: "Peças de Reposição sob Medida",
      imageUrl: "/fotos/Captura de tela 2026-05-09 110733.png",
      category: "Utilidades"
    },
    {
      id: 6,
      title: "Acessórios e Organização",
      imageUrl: "/fotos/Captura de tela 2026-05-09 110755.png",
      category: "Utilitários"
    },
    {
      id: 7,
      title: "Peça Personalizada",
      imageUrl: "/fotos/Captura de tela 2026-05-09 110649-1.png",
      category: "Projetos"
    },
    {
      id: 8,
      title: "Impressão 3D Avançada",
      imageUrl: "/fotos/Captura de tela 2026-05-09 110821.png",
      category: "Outros"
    },
    {
      id: 9,
      title: "Modelagem e Protótipo",
      imageUrl: "/fotos/Captura de tela 2026-05-09 110848.png",
      category: "Industrial"
    },
    {
      id: 10,
      title: "Peça Especializada",
      imageUrl: "/fotos/Captura de tela 2026-05-09 110949.png",
      category: "Projetos"
    }
  ],
  features: [
    {
      title: "Impressão 3D",
      description: "Alta resolução e fidelidade ao modelo original."
    },
    {
      title: "Tecnologia",
      description: "Os melhores materiais (PLA, ABS, PETG, Resina)."
    },
    {
      title: "Inovação",
      description: "Ajudamos a otimizar sua ideia para a melhor fabricação."
    }
  ]
};

export const getWhatsAppUrl = (config: typeof defaultConfig) => {
  const encodedMessage = encodeURIComponent(config.whatsapp.message);
  return `https://wa.me/${config.whatsapp.number}?text=${encodedMessage}`;
};
