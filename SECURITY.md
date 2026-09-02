# Política de Seguridad y Privacidad

## Versiones Soportadas

Este proyecto se mantiene activamente bajo las últimas versiones y estándares web modernos:

| Versión | Estado de Soporte |
| :------ | :---------------- |
| 1.x.x   | Soportada (Activa)|

---

## Protección de Datos Sensibles & Criptografía Aplicada

La seguridad de la información y la privacidad por diseño son principios rectores en este proyecto:

1. **Cifrado de Telemetría en Reposo (AES-GCM-256):**
   - Cualquier dato persistido localmente se cifra utilizando la Web Crypto API (`window.crypto.subtle`) con el algoritmo AES-GCM de 256 bits y derivación de clave mediante PBKDF2 (100,000 iteraciones).
2. **Anonimización Criptográfica (SHA-256):**
   - No se almacenan datos personales identificables (Zero PII). Las métricas de sesión utilizan resúmenes criptográficos SHA-256 no reversibles para distinguir sesiones únicas.
3. **Generación Segura de Tokens:**
   - Los identificadores de sesión se originan exclusivamente mediante generadores de números pseudoaleatorios criptográficamente seguros (`crypto.getRandomValues`).
4. **Transporte Seguro (TLS 1.3 / HTTPS):**
   - Todo el tráfico se sirve de manera forzada bajo HTTPS en Cloudflare Edge y GitHub Pages.
5. **Mitigación de Ataques Web:**
   - Cabeceras de seguridad y prevención de inyecciones de código (XSS) y Clickjacking.

---

## Reporte de Vulnerabilidades

Si descubre una posible vulnerabilidad técnica o inconsistencia en los enlaces o recursos públicos, por favor siga el procedimiento indicado:

1. **Canal Oficial:** Envíe un mensaje directo a través del perfil oficial de **[LinkedIn](https://www.linkedin.com/in/ladyloayzarodriguez/)** o abra un reporte privado en el repositorio de **[GitHub](https://github.com/luzylay/Lady-Loayza-Tech/security)**.
2. **Detalles del Reporte:** Incluya:
   - Descripción detallada de la vulnerabilidad o comportamiento detectado.
   - Pasos para reproducir el escenario o prueba de concepto (PoC).
   - Impacto potencial estimado.
   - Entorno de ejecución: navegador, sistema operativo y versión del dispositivo.

3. **Compromiso de Respuesta:**
   - Confirmación de recepción en un plazo máximo de **24 a 48 horas**.
   - Evaluación y mitigación de la incidencia con alta prioridad.
   - Divulgación responsable coordinada una vez aplicado el parche o corrección.
