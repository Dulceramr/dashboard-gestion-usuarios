import type { Usuario } from '../hooks/useUsuarios';

/**
 * Convierte un array de usuarios a formato CSV
 */
export const convertirUsuariosACSV = (usuarios: Usuario[]): string => {
  if (usuarios.length === 0) return '';
  
  // Definir las columnas que queremos exportar
  const columnas = [
    'Nombre',
    'Apellido',
    'Email',
    'Género',
    'Edad',
    'País',
    'Teléfono',
    'Fecha de Nacimiento'
  ];
  
  // Crear filas de datos
  const filas = usuarios.map(usuario => [
    `"${usuario.name.first}"`,
    `"${usuario.name.last}"`,
    `"${usuario.email}"`,
    `"${usuario.gender === 'male' ? 'Hombre' : 'Mujer'}"`,
    usuario.dob.age.toString(),
    `"${usuario.location.country}"`,
    `"${usuario.phone}"`,
    `"${new Date(usuario.dob.date).toLocaleDateString('es-MX')}"`
  ]);
  
  // Combinar columnas y filas
  const contenido = [
    columnas.join(','),
    ...filas.map(fila => fila.join(','))
  ].join('\n');
  
  return contenido;
};

/**
 * Descarga un archivo CSV
 */
export const descargarCSV = (contenido: string, nombreArchivo: string) => {
  // Crear blob y URL
  const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  // Crear elemento <a> temporal para la descarga
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', nombreArchivo);
  link.style.visibility = 'hidden';
  
  // Disparar la descarga
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Liberar memoria
  URL.revokeObjectURL(url);
};

/**
 * Función principal para exportar usuarios a CSV
 * Incluye notificación de progreso
 */
export const exportarUsuariosACSV = (
  usuarios: Usuario[],
  onProgreso?: (etapa: string) => void,
  onCompletado?: (total: number) => void
): boolean => {
  try {
    if (usuarios.length === 0) {
      alert('⚠️ No hay usuarios para exportar');
      return false;
    }
    
    // Notificar inicio
    onProgreso?.('Convirtiendo datos a CSV...');
    
    // Convertir a CSV
    const csvData = convertirUsuariosACSV(usuarios);
    
    onProgreso?.('Preparando descarga...');
    
    // Generar nombre de archivo con fecha
    const fecha = new Date().toISOString().split('T')[0];
    const hora = new Date().toLocaleTimeString('es-MX', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    }).replace(/:/g, '-');
    
    const nombreArchivo = `usuarios_${fecha}_${hora}.csv`;
    
    // Descargar
    descargarCSV(csvData, nombreArchivo);
    
    onProgreso?.('Descarga completada');
    onCompletado?.(usuarios.length);
    
    return true;
  } catch (error) {
    console.error('❌ Error exportando CSV:', error);
    alert('Error al exportar el archivo CSV');
    return false;
  }
};