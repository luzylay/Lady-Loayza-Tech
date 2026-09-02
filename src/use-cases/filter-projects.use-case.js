/**
 * @file filter-projects.use-case.js
 * @module use-cases/filter-projects.use-case
 * @description Caso de uso para filtrado algorítmico de proyectos en tiempo O(1).
 */

import { projectRepository } from '../infrastructure/project.repository.js';
import { globalEventBus } from '../infrastructure/event-bus.js';

export class FilterProjectsUseCase {
  constructor(repository = projectRepository, eventBus = globalEventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
  }

  /**
   * Ejecuta el filtrado por categoría y notifica a los suscriptores
   * @param {string} category Categoría solicitada
   * @returns {import('../domain/project.entity.js').ProjectEntity[]}
   */
  execute(category = 'all') {
    const matchedProjects = this.repository.findByCategory(category);

    this.eventBus.publish('PROJECTS_FILTERED', {
      category,
      projects: matchedProjects,
      totalCount: matchedProjects.length
    });

    return matchedProjects;
  }
}

export const filterProjectsUseCase = new FilterProjectsUseCase();
