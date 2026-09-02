/**
 * @file filter-projects.use-case.js
 * @module use-cases/filter-projects.use-case
 * @description Caso de uso que orquesta el filtrado de proyectos por categoría.
 * Utiliza el índice invertido del repositorio para garantizar tiempo de ejecución O(1)
 * y emite eventos desacoplados hacia el EventBus para actualizar la UI reactivamente.
 */

import { projectRepository } from '../infrastructure/project.repository.js';
import { globalEventBus } from '../infrastructure/event-bus.js';

export class FilterProjectsUseCase {
  /**
   * @param {import('../infrastructure/project.repository.js').ProjectRepository} [repository=projectRepository]
   * @param {import('../infrastructure/event-bus.js').EventBus} [eventBus=globalEventBus]
   */
  constructor(repository = projectRepository, eventBus = globalEventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
  }

  /**
   * Ejecuta el filtrado por categoría, normaliza la entrada y despacha el evento reactivo.
   * @param {string} [rawCategory='all'] - Categoría solicitada (ej. 'all', 'featured', 'frontend', 'datos', 'software').
   * @returns {readonly import('../domain/project.entity.js').ProjectEntity[]} Lista inmutable de proyectos coincidentes.
   */
  execute(rawCategory = 'all') {
    const normalizedCategory = typeof rawCategory === 'string'
      ? rawCategory.trim().toLowerCase()
      : 'all';

    const matchedProjects = this.repository.findByCategory(normalizedCategory);

    this.eventBus.publish('PROJECTS_FILTERED', {
      category: normalizedCategory,
      projects: matchedProjects,
      totalCount: matchedProjects.length,
      timestamp: new Date().toISOString()
    });

    return matchedProjects;
  }
}

// Exportación Singleton del caso de uso
export const filterProjectsUseCase = new FilterProjectsUseCase();
