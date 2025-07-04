
import { CourseType } from "../components/CourseCard";

export const courses: CourseType[] = [
  {
    id: 1,
    title: "Introdução ao Direito Constitucional",
    area: "Direito Constitucional",
    coverImage: "https://images.unsplash.com/photo-1589994965851-a7f54d2274b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    shortDescription: "Aprenda os fundamentos do Direito Constitucional brasileiro e sua aplicação prática."
  },
  {
    id: 2,
    title: "Direito Penal Avançado",
    area: "Direito Penal",
    coverImage: "https://images.unsplash.com/photo-1589994965851-a7f54d2274b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    shortDescription: "Estude casos complexos de Direito Penal e aprenda estratégias de defesa e acusação."
  },
  {
    id: 3,
    title: "Direito Civil: Contratos e Obrigações",
    area: "Direito Civil",
    coverImage: "https://images.unsplash.com/photo-1589994965851-a7f54d2274b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    shortDescription: "Compreenda os princípios fundamentais dos contratos civis e das obrigações."
  },
  {
    id: 4,
    title: "Direito Empresarial para Iniciantes",
    area: "Direito Empresarial",
    coverImage: "https://images.unsplash.com/photo-1589994965851-a7f54d2274b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    shortDescription: "Conheça os princípios básicos do Direito Empresarial e sua aplicação no mundo dos negócios."
  },
  {
    id: 5,
    title: "Processo Civil na Prática",
    area: "Direito Processual Civil",
    coverImage: "https://images.unsplash.com/photo-1589994965851-a7f54d2274b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    shortDescription: "Aprenda as técnicas e estratégias práticas para atuar em processos civis."
  },
  {
    id: 6,
    title: "Direito Ambiental Contemporâneo",
    area: "Direito Ambiental",
    coverImage: "https://images.unsplash.com/photo-1589994965851-a7f54d2274b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    shortDescription: "Estude os desafios atuais do Direito Ambiental e as soluções jurídicas existentes."
  },
  {
    id: 7,
    title: "Fundamentos do Direito Tributário",
    area: "Direito Tributário",
    coverImage: "https://images.unsplash.com/photo-1589994965851-a7f54d2274b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    shortDescription: "Compreenda os princípios e conceitos essenciais do Direito Tributário brasileiro."
  },
  {
    id: 8,
    title: "Direito do Trabalho Atualizado",
    area: "Direito do Trabalho",
    coverImage: "https://images.unsplash.com/photo-1589994965851-a7f54d2274b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    shortDescription: "Estude as principais mudanças na legislação trabalhista e suas aplicações práticas."
  }
];

export const getLegalAreas = (): string[] => {
  const areas = courses.map(course => course.area);
  return [...new Set(areas)];
};

export const getCoursesByArea = (area: string): CourseType[] => {
  return courses.filter(course => course.area === area);
};
