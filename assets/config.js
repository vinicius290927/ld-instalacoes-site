/**
 * ============================================================
 *  CONFIGURAÇÃO CENTRAL — LD INSTALAÇÕES
 * ============================================================
 *  Edite este arquivo para atualizar informações da empresa
 *  sem precisar mexer no restante do código do site.
 *
 *  Campos vazios ("") aparecem no site como indicação de que
 *  a informação ainda precisa ser cadastrada. Nenhum dado foi
 *  inventado — preencha apenas com informações reais.
 * ============================================================
 */

const companyConfig = {
  name: "LD Instalações",

  // Número no formato internacional, apenas dígitos. Ex: "5513999998888"
  whatsapp: "5513988118895",

  // URL completa do perfil. Ex: "https://instagram.com/ldinstalacoes"
  instagram: "https://instagram.com/ld_instalacoes1",

  email: "",
  address: "",

  // Mensagens pré-preenchidas usadas pela função buildWhatsAppLink()
  whatsappMessages: {
    default:
      "Olá! Vim pelo site da LD Instalações e gostaria de solicitar um orçamento. Gostaria de saber mais sobre os serviços.",
    project:
      "Olá! Vim pelo site da LD Instalações e gostaria de enviar informações sobre o meu projeto.",
    lighting:
      "Olá! Vim pelo site da LD Instalações e tenho interesse em um projeto luminotécnico.",
    serviceArea:
      "Olá! Gostaria de confirmar se a LD Instalações atende a minha região.",
  },

  cities: ["Bertioga", "Riviera de São Lourenço", "Litoral de São Paulo e região"],
};

/**
 * Serviços oferecidos. Adicione, remova ou edite itens livremente —
 * a seção "Nossos Serviços" é renderizada a partir deste array.
 * `highlight: true` dá destaque visual especial ao card (usado em
 * Projetos Luminotécnicos, conforme solicitado no briefing).
 */
const services = [
  {
    icon: "zap",
    title: "Instalações Elétricas",
    description:
      "Execução, manutenção, adequações e soluções para instalações elétricas residenciais, comerciais e de obras.",
  },
  {
    icon: "boxes",
    title: "Infraestrutura Elétrica",
    description:
      "Execução de infraestrutura para instalações elétricas, incluindo eletrodutos, eletrocalhas, perfilados, distribuição e organização.",
  },
  {
    icon: "lightbulb",
    title: "Projetos Luminotécnicos",
    description:
      "Planejamento e especificação da iluminação para ambientes residenciais, comerciais e corporativos, buscando equilíbrio entre estética, funcionalidade, conforto e eficiência.",
    highlight: true,
  },
  {
    icon: "camera",
    title: "CFTV e Segurança",
    description:
      "Instalação e infraestrutura para sistemas de monitoramento e segurança.",
  },
  {
    icon: "network",
    title: "Redes e Cabeamento",
    description:
      "Infraestrutura e instalação para redes de comunicação, dados e cabeamento.",
  },
  {
    icon: "door-open",
    title: "Interfonia e Controle de Acesso",
    description:
      "Instalação e infraestrutura para interfones e soluções de controle de acesso.",
  },
  {
    icon: "compass",
    title: "Projetos e Soluções Elétricas",
    description:
      "Planejamento e desenvolvimento de soluções de acordo com as necessidades específicas de cada projeto.",
  },
];

/**
 * Diferenciais exibidos na seção "Por que escolher a LD Instalações?"
 */
const differentials = [
  {
    icon: "user-check",
    title: "Atendimento Personalizado",
    description: "Cada projeto é analisado de acordo com sua necessidade.",
  },
  {
    icon: "layout-grid",
    title: "Organização",
    description: "Planejamento e execução com atenção aos detalhes.",
  },
  {
    icon: "shield-check",
    title: "Segurança",
    description: "Compromisso com boas práticas e segurança durante a execução.",
  },
  {
    icon: "badge-check",
    title: "Qualidade",
    description: "Busca constante por serviços bem executados e com bom acabamento.",
  },
  {
    icon: "ruler",
    title: "Soluções Sob Medida",
    description: "Cada projeto possui necessidades diferentes.",
  },
  {
    icon: "handshake",
    title: "Compromisso",
    description: "Transparência e responsabilidade em cada etapa do serviço.",
  },
];

/**
 * Projetos realizados / fotos de luminotécnica.
 * Estas são fotos reais fornecidas pela LD Instalações.
 * Para adicionar novos projetos: inclua um novo objeto neste array
 * e coloque a foto correspondente em assets/projects/.
 */
const projects = [
  {
    image: "assets/projects/proj-cozinha-sanca.jpg",
    title: "Sanca de LED em Cozinha Planejada",
    city: "Litoral de São Paulo",
    category: "Projeto Luminotécnico",
    description:
      "Iluminação embutida em sanca, valorizando a marcenaria e criando conforto visual no ambiente da cozinha.",
  },
  {
    image: "assets/projects/proj-pendente-sala.jpg",
    title: "Pendente Decorativo em Sala de Jantar",
    city: "Litoral de São Paulo",
    category: "Projeto Luminotécnico",
    description:
      "Especificação e instalação de luminária pendente como ponto focal sobre a mesa de jantar.",
  },
  {
    image: "assets/projects/proj-escada-hall.jpg",
    title: "Iluminação de Escada e Hall Social",
    city: "Litoral de São Paulo",
    category: "Instalação Elétrica",
    description:
      "Spots direcionais e iluminação de destaque para escada e área de circulação interna.",
  },
  {
    image: "assets/projects/proj-escada-fita-led.jpg",
    title: "Escada Flutuante com Fita de LED",
    city: "Litoral de São Paulo",
    category: "Projeto Luminotécnico",
    description:
      "Instalação de fita de LED embutida nos degraus, reforçando o efeito flutuante e a segurança na circulação.",
  },
  {
    image: "assets/projects/proj-escada-externa.jpg",
    title: "Iluminação de Escada Externa e Acesso",
    city: "Litoral de São Paulo",
    category: "Projeto Luminotécnico",
    description:
      "Balizadores embutidos ao longo da escada externa, guiando o acesso com conforto visual noturno.",
  },
  {
    image: "assets/projects/proj-sanca-cozinha-2.jpg",
    title: "Sanca Aberta com Iluminação Linear",
    city: "Litoral de São Paulo",
    category: "Projeto Luminotécnico",
    description:
      "Recorte de sanca com iluminação linear embutida, integrando cozinha e área de circulação.",
  },
  {
    image: "assets/projects/proj-varanda-degraus.jpg",
    title: "Infraestrutura Elétrica para Área Integrada",
    city: "Litoral de São Paulo",
    category: "Infraestrutura Elétrica",
    description:
      "Instalação elétrica e iluminação de teto para ambiente integrado com desnível interno.",
  },
];

/**
 * Depoimentos de clientes. Deixe vazio ([]) até que existam
 * avaliações reais para publicar — o site já está preparado
 * para exibi-las assim que forem adicionadas aqui.
 * Formato: { name, company, text, rating }
 */
const testimonials = [];
