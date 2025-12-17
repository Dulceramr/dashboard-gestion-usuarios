import { useState } from 'react';
import ListaUsuarios from '../componentes/Usuario/ListaUsuarios';
import FiltrosUsuarios from '../componentes/Filtros/FiltrosUsuarios';
import NotificacionExportacion from '../componentes/UI/NotificacionExportacion';
import { exportarUsuariosACSV } from '../utilidades/exportarCSV'
import { useUsuarios } from '../hooks/useUsuarios';
import '../estilos/Users.css';

const Users = () => {
  const { usuarios, filtrarUsuarios } = useUsuarios();
  
  const [filtros, setFiltros] = useState({
    genero: 'all',
    nacionalidad: 'all',
    rangoEdad: { min: 18, max: 100 }
  });
  
  const [filtrosAplicados, setFiltrosAplicados] = useState(filtros);
  
  // Estado para la exportación
  const [exportando, setExportando] = useState(false);
  const [notificacion, setNotificacion] = useState({
    visible: false,
    mensaje: '',
    total: 0
  });

  const aplicarFiltros = () => {
    setFiltrosAplicados({...filtros});
  };

  const limpiarFiltros = () => {
    const filtrosLimpios = {
      genero: 'all',
      nacionalidad: 'all',
      rangoEdad: { min: 18, max: 100 }
    };
    setFiltros(filtrosLimpios);
    setFiltrosAplicados(filtrosLimpios);
  };

  // Exportar a CSV
  const handleExportarCSV = async () => {
    if (exportando) return;
    
    setExportando(true);
    
    // 1. Obtener usuarios filtrados
    const usuariosFiltrados = filtrarUsuarios(filtrosAplicados);
    
    // 2. Mostrar notificación
    setNotificacion({
      visible: true,
      mensaje: 'Preparando exportación...',
      total: usuariosFiltrados.length
    });
    
    // 3. Exportar (con retraso simulado para mostrar progreso)
    setTimeout(() => {
      setNotificacion(n => ({ ...n, mensaje: 'Generando archivo CSV...' }));
      
      setTimeout(() => {
        const exito = exportarUsuariosACSV(
          usuariosFiltrados,
          (etapa) => {
            setNotificacion(n => ({ ...n, mensaje: etapa }));
          },
          (total) => {
            console.log(`✅ Exportados ${total} usuarios`);
          }
        );
        
        if (exito) {
          setNotificacion(n => ({ 
            ...n, 
            mensaje: '✅ Exportación completada!'
          }));
          
          // Cerrar notificación automáticamente después de 2 segundos
          setTimeout(() => {
            setNotificacion({ visible: false, mensaje: '', total: 0 });
            setExportando(false);
          }, 2000);
        } else {
          setNotificacion({ visible: false, mensaje: '', total: 0 });
          setExportando(false);
        }
      }, 800);
    }, 500);
  };

  return (
    <div className="dashboard-container">
      {/* Notificación de exportación */}
      <NotificacionExportacion
        visible={notificacion.visible}
        mensaje={notificacion.mensaje}
        totalUsuarios={notificacion.total}
        onCerrar={() => {
          setNotificacion({ visible: false, mensaje: '', total: 0 });
          setExportando(false);
        }}
      />

      <header className="dashboard-header">
        <div>
          <h1>Panel de Gestión de Usuarios</h1>
          <p className="dashboard-subtitle">
            Filtra, gestiona y exporta los usuarios del sistema.
          </p>
        </div>
        <div className="user-actions">
          {/* Botón de exportar ACTUALIZADO */}
          <button 
            className={`btn-secondary ${exportando ? 'exportando' : ''}`}
            onClick={handleExportarCSV}
            disabled={exportando}
          >
            {exportando ? '⏳ Exportando...' : '📤 Exportar CSV'}
          </button>
          
          <button className="btn-logout" onClick={() => {
            sessionStorage.clear();
            window.location.href = '/login';
          }}>
            👋 Cerrar Sesión
          </button>
        </div>
      </header>

      <section className="filters-section">
        <h2>Filtrar Usuarios</h2>
        <FiltrosUsuarios 
          filtros={filtros} 
          setFiltros={setFiltros}
          onAplicar={aplicarFiltros}
          onLimpiar={limpiarFiltros}
        />
      </section>

      <section className="main-content">
        <ListaUsuarios filtros={filtrosAplicados} />
      </section>

      <footer className="dashboard-footer">
        <p>
          <small>
            ℹ️ Usa "Exportar CSV" para descargar los usuarios filtrados en formato de hoja de cálculo.
          </small>
        </p>
      </footer>
    </div>
  );
};

export default Users;