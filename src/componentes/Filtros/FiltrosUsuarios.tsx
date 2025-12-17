import { useUsuarios } from '../../hooks/useUsuarios';
import './FiltrosUsuarios.css';

interface Filtros {
  genero: string;
  nacionalidad: string;
  rangoEdad: { min: number; max: number };
}

interface Props {
  filtros: Filtros;
  setFiltros: (filtros: Filtros) => void;
  onAplicar: () => void;      // Nueva prop
  onLimpiar: () => void;      // Nueva prop
}

const FiltrosUsuarios =  ({ filtros, setFiltros, onAplicar, onLimpiar }: Props) => {
  const { getNacionalidades } = useUsuarios();
  const nacionalidades = getNacionalidades();

  const handleGeneroChange = (genero: string) => {
    setFiltros({ ...filtros, genero });
  };

  const handleNacionalidadChange = (nacionalidad: string) => {
    setFiltros({ ...filtros, nacionalidad });
  };

  const handleEdadChange = (tipo: 'min' | 'max', valor: number) => {
    const nuevoRango = { ...filtros.rangoEdad, [tipo]: valor };
    // Validar que min <= max
    if (tipo === 'min' && valor > filtros.rangoEdad.max) return;
    if (tipo === 'max' && valor < filtros.rangoEdad.min) return;
    setFiltros({ ...filtros, rangoEdad: nuevoRango });
  };

  const aplicarFiltros = () => {
    alert(`Filtros aplicados:\nGénero: ${filtros.genero}\nNacionalidad: ${filtros.nacionalidad}\nEdad: ${filtros.rangoEdad.min}-${filtros.rangoEdad.max}`);
    // Aquí luego conectarás con la lógica real de filtrado
  };

  const limpiarFiltros = () => {
    setFiltros({
      genero: 'all',
      nacionalidad: 'all',
      rangoEdad: { min: 18, max: 100 }
    });
  };

  return (
    <div className="filtros-container">
      <div className="filtro-group">
        <label>Género</label>
        <div className="botones-genero">
          <button
            className={`btn-filtro ${filtros.genero === 'all' ? 'active' : ''}`}
            onClick={() => handleGeneroChange('all')}
          >
            👥 Todos
          </button>
          <button
            className={`btn-filtro ${filtros.genero === 'male' ? 'active' : ''}`}
            onClick={() => handleGeneroChange('male')}
          >
            👨 Hombres
          </button>
          <button
            className={`btn-filtro ${filtros.genero === 'female' ? 'active' : ''}`}
            onClick={() => handleGeneroChange('female')}
          >
            👩 Mujeres
          </button>
        </div>
      </div>

      <div className="filtro-group">
        <label>Nacionalidad</label>
        <select
          value={filtros.nacionalidad}
          onChange={(e) => handleNacionalidadChange(e.target.value)}
          className="select-nacionalidad"
        >
          <option value="all">🌎 Todas las nacionalidades</option>
          {nacionalidades.map((pais) => (
            <option key={pais} value={pais}>
              {pais}
            </option>
          ))}
        </select>
      </div>

      <div className="filtro-group">
        <label>Rango de Edad</label>
        <div className="rango-edad">
          <div className="input-group">
            <span>Mín:</span>
            <input
              type="range"
              min="18"
              max="100"
              value={filtros.rangoEdad.min}
              onChange={(e) => handleEdadChange('min', Number(e.target.value))}
            />
            <span className="edad-valor">{filtros.rangoEdad.min}</span>
          </div>
          <div className="input-group">
            <span>Máx:</span>
            <input
              type="range"
              min="18"
              max="100"
              value={filtros.rangoEdad.max}
              onChange={(e) => handleEdadChange('max', Number(e.target.value))}
            />
            <span className="edad-valor">{filtros.rangoEdad.max}</span>
          </div>
          <div className="rango-display">
            {filtros.rangoEdad.min} - {filtros.rangoEdad.max} años
          </div>
        </div>
      </div>

      <div className="acciones-filtros">
        <button onClick={onAplicar} className="btn-aplicar">
          🔍 Aplicar Filtros
        </button>
        <button onClick={onLimpiar} className="btn-limpiar">
          🗑️ Limpiar Filtros
        </button>
      </div>
    </div>
  );
};

export default FiltrosUsuarios;