import { useState, useEffect } from 'react';

export interface Usuario {
  gender: 'male' | 'female';
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;  
    age: number;
  };
  registered: {
    date: string;  
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string | null;
  };
  picture: {
    large: string;   
    medium: string;  
    thumbnail: string; 
  };
  nat: string;  
}

interface CacheData {
  timestamp: number;
  data: Usuario[];
}

const CACHE_KEY = 'users_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 min

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener datos del caché
  const getCachedData = (): CacheData | null => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    try {
      const parsed: CacheData = JSON.parse(cached);
      const ahora = Date.now();
      
      // Verificar si el caché está vencido (más de 5 minutos)
      if (ahora - parsed.timestamp > CACHE_DURATION) {
        localStorage.removeItem(CACHE_KEY); // Limpiar caché viejo
        return null;
      }
      
      return parsed;
    } catch {
      return null; // Si hay error al parsear, ignorar caché
    }
  };

  // Función para guardar en caché
  const saveToCache = (data: Usuario[]) => {
    const cacheData: CacheData = {
      timestamp: Date.now(),
      data
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  };

  // Función principal para fetch de usuarios
  const fetchUsuarios = async (forceRefresh = false) => {
    setCargando(true);
    setError(null);

    try {
      // 1. Verificar caché (a menos que forceRefresh = true)
      if (!forceRefresh) {
        const cached = getCachedData();
        if (cached) {
          console.log('📦 Usando datos en caché');
          setUsuarios(cached.data);
          setCargando(false);
          return;
        }
      }

      // 2. Si no hay caché válido, hacer fetch
      console.log('🌐 Haciendo fetch a la API');
      const response = await fetch('https://randomuser.me/api/?results=30&seed=envioclick');
      
      if (!response.ok) {
        throw new Error(`Error en la API: ${response.status}`);
      }
      
      const json = await response.json();
      const usuariosData = json.results;
      
      // 3. Guardar en estado y caché
      setUsuarios(usuariosData);
      saveToCache(usuariosData);
      
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(`No se pudieron cargar los usuarios: ${message}`);
      console.error('Error en fetchUsuarios:', err);
    } finally {
      setCargando(false);
    }
  };

  // 3. Función para forzar recarga (ignorar caché)
  const recargarUsuarios = () => {
    fetchUsuarios(true);
  };

  // 4. Efecto para cargar datos al montar el componente
  useEffect(() => {
    fetchUsuarios();
  }, []);

  // 5. Funciones de utilidad
  const filtrarPorGenero = (genero: string) => {
    return genero === 'all' 
      ? usuarios 
      : usuarios.filter(user => user.gender === genero);
  };

  const getNacionalidades = () => {
    const nacionalidades = usuarios.map(user => user.location.country);
    return [...new Set(nacionalidades)]; // Eliminar duplicados
  };

  const eliminarUsuario = (userId: string) => {
    setUsuarios(prevUsuarios => {
      // Filtrar para quitar el usuario
      const nuevosUsuarios = prevUsuarios.filter(
        user => user.login.uuid !== userId
      );
      
      // Actualizar el caché
      saveToCache(nuevosUsuarios);
      
      return nuevosUsuarios;
    });
    
    // limpiar caché de localStorage para ese usuario específico
    const userDetailCacheKey = `user_${userId}`;
    localStorage.removeItem(userDetailCacheKey);
  };

  const filtrarUsuarios = (filtros: {
  genero: string;
  nacionalidad: string;
  rangoEdad: { min: number; max: number };
}) => {
  return usuarios.filter(user => {
    // Filtro por género
    if (filtros.genero !== 'all' && user.gender !== filtros.genero) {
      return false;
    }
    
    // Filtro por nacionalidad
    if (filtros.nacionalidad !== 'all' && user.location.country !== filtros.nacionalidad) {
      return false;
    }
    
    // Filtro por rango de edad
    if (user.dob.age < filtros.rangoEdad.min || user.dob.age > filtros.rangoEdad.max) {
      return false;
    }
    
    return true;
  });
};
  return {
    // Estado
    usuarios,
    cargando,
    error,
    
    // Acciones
    recargarUsuarios,
    fetchUsuarios,
    eliminarUsuario,
    
    // Utilidades
    filtrarPorGenero,
    getNacionalidades,
    
    // Métricas (para mostrar en UI)
    totalUsuarios: usuarios.length,
    hombres: usuarios.filter(u => u.gender === 'male').length,
    mujeres: usuarios.filter(u => u.gender === 'female').length,
    filtrarUsuarios,
  };
};