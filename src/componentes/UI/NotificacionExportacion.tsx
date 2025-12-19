import './NotificacionExportacion.css';

interface NotificacionProps {
  visible: boolean;
  mensaje: string;
  progreso?: number; // 0-100
  totalUsuarios?: number;
  onCerrar?: () => void;
}

const NotificacionExportacion = ({
  visible,
  mensaje,
  progreso,
  totalUsuarios,
  onCerrar
}: NotificacionProps) => {
  if (!visible) return null;

  return (
    <div className="notificacion-overlay">
      <div className="notificacion-contenido">
        <div className="notificacion-header">
          <h3>📤 Exportando Usuarios a CSV</h3>
          {onCerrar && (
            <button className="btn-cerrar" onClick={onCerrar}>×</button>
          )}
        </div>
        <div className="notificacion-body">
          <div className="notificacion-icono">
            <div className="spinner-export"></div>
          </div>
          
          <p className="notificacion-mensaje">{mensaje}</p>
          
          {progreso !== undefined && (
            <div className="progreso-container">
              <div 
                className="progreso-bar" 
                style={{ width: `${progreso}%` }}
              ></div>
              <span className="progreso-text">{progreso}%</span>
            </div>
          )}
          
          {totalUsuarios !== undefined && (
            <p className="notificacion-detail">
              Exportando {totalUsuarios} usuario{totalUsuarios !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        
        <div className="notificacion-footer">
          <small>El archivo se descargará automáticamente cuando esté listo.</small>
        </div>
      </div>
    </div>
  );
};

export default NotificacionExportacion;