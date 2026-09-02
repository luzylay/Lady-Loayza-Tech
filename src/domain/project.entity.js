/**
 * @file project.entity.js
 * @module domain/project.entity
 * @description Entidad de dominio inmutable que representa un proyecto del portafolio.
 * Aplica encapsulamiento e invariantes de negocio según DDD y Clean Architecture.
 */

export class ProjectEntity {
  /**
   * @param {Object} props Propiedades del proyecto
   * @param {string} props.id Identificador único
   * @param {string} props.title Título formal del proyecto
   * @param {string} props.badge Insignia o reconocimiento
   * @param {string} [props.badgeType='snow'] Tipo visual ('lime' | 'snow')
   * @param {string} props.categoryTag Etiqueta de categoría principal
   * @param {string[]} props.categories Lista de categorías para indexación
   * @param {string} props.image URL de la imagen de portada
   * @param {string} props.imageAlt Texto alternativo para accesibilidad
   * @param {string} props.description Resumen técnico del proyecto
   * @param {string[]} props.techStack Stack de tecnologías empleadas
   * @param {string|null} [props.liveUrl=null] URL de demo en producción
   * @param {string|null} [props.liveLabel='Demo en vivo ↗'] Texto del botón de demo
   * @param {string|null} [props.repoUrl=null] URL del repositorio de código
   */
  constructor({
    id,
    title,
    badge,
    badgeType = 'snow',
    categoryTag,
    categories = [],
    image,
    imageAlt,
    description,
    techStack = [],
    liveUrl = null,
    liveLabel = 'Demo en vivo ↗',
    repoUrl = null
  }) {
    if (!id || !title || !description) {
      throw new Error('[ProjectEntity] Violación de invariante: id, title y description son obligatorios.');
    }

    this.id = Object.freeze(id);
    this.title = Object.freeze(title);
    this.badge = Object.freeze(badge);
    this.badgeType = Object.freeze(badgeType);
    this.categoryTag = Object.freeze(categoryTag);
    this.categories = Object.freeze([...categories]);
    this.image = Object.freeze(image);
    this.imageAlt = Object.freeze(imageAlt || title);
    this.description = Object.freeze(description);
    this.techStack = Object.freeze([...techStack]);
    this.liveUrl = Object.freeze(liveUrl);
    this.liveLabel = Object.freeze(liveLabel);
    this.repoUrl = Object.freeze(repoUrl);

    // Garantizar inmutabilidad profunda de la entidad
    Object.freeze(this);
  }

  /**
   * Verifica si el proyecto pertenece a una categoría dada
   * @param {string} category
   * @returns {boolean}
   */
  hasCategory(category) {
    if (category === 'all') return true;
    return this.categories.includes(category);
  }
}
