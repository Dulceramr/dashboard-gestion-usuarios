import React, { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from 'react';

export interface Usuario {
  gender: 'male' | 'female';
  name: { title: string; first: string; last: string };
  location: {
    street: { number: number; name: string };
    city: string; state: string; country: string;
    postcode: string | number;
    coordinates: { latitude: string; longitude: string };
    timezone: { offset: string; description: string };
  };
  email: string;
  login: { uuid: string; username: string; password: string };
  dob: { date: string; age: number };
  registered: { date: string; age: number };
  phone: string;
  cell: string;
  id: { name: string; value: string | null };
  picture: { large: string; medium: string; thumbnail: string };
  nat: string;
}

interface CacheData {
  timestamp: number;
  data: Usuario[];
}

interface UsuariosContextType {
  usuarios: Usuario[];
  cargando: boolean;
  error: string | null;
  recargarUsuarios: () => void;
  eliminarUsuario: (userId: string) => void;
  filtrarUsuarios: (filtros: {
    genero: string;
    nacionalidad: string;
    rangoEdad: { min: number; max: number };
  }) => Usuario[];
  getNacionalidades: () => string[];
}

const UsuariosContext = createContext<UsuariosContextType | undefined>(undefined);

const CACHE_KEY = 'users_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 min

export const UsuariosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [usuarios, setUsuarios] = useState<Usuario[]>(() => {
        // Intentar cargar de localStorage al inicio
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
        try {
            const parsed: CacheData = JSON.parse(cached);
            const ahora = Date.now();
            if (ahora - parsed.timestamp <= CACHE_DURATION) {
            return parsed.data;
            }
        } catch {}
        }
        return [];
    });
  const [cargando, setCargando] = useState(() => usuarios.length === 0); 
  const [error, setError] = useState<string | null>(null);
  const fetchInProgressRef = useRef(false);

  // Función para obtener datos del caché
  const getCachedData = useCallback((): CacheData | null => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    try {
      const parsed: CacheData = JSON.parse(cached);
      const ahora = Date.now();
      
      if (ahora - parsed.timestamp > CACHE_DURATION) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }
      
      return parsed;
    } catch {
      return null;
    }
  }, []);

  // guardar en caché
  const saveToCache = useCallback((data: Usuario[]) => {
    const cacheData: CacheData = {
      timestamp: Date.now(),
      data
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  }, []);

  // fetch de usuarios
  const fetchUsuarios = useCallback(async (forceRefresh = false) => {
    setCargando(true);
    setError(null);

    try {
      if (!forceRefresh) {
        const cached = getCachedData();
        if (cached) {
          setUsuarios(cached.data);
          setCargando(false);
          return;
        }
      }

      const response = await fetch('https://randomuser.me/api/?results=50&seed=envioclick');
      
      if (!response.ok) {
        throw new Error(`Error en la API: ${response.status}`);
      }
      
      const json = await response.json();
      const usuariosData = json.results;
      
      // Guardar en estado y caché
      setUsuarios(usuariosData);
      saveToCache(usuariosData);
      
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(`No se pudieron cargar los usuarios: ${message}`);
      console.error('Error en fetchUsuarios:', err);
    } finally {
      setCargando(false);
    }
  }, [getCachedData, saveToCache]);

  // Función para recargar
  const recargarUsuarios = useCallback(() => {
    fetchUsuarios(true);
  }, [fetchUsuarios]);

  useEffect(() => {
    if (usuarios.length === 0 && !fetchInProgressRef.current) {
      fetchInProgressRef.current = true;
      fetchUsuarios();
    }
  }, [fetchUsuarios, usuarios.length]);

  // Función para eliminar usuario
  const eliminarUsuario = useCallback((userId: string) => {
    setUsuarios(prev => {
      const nuevosUsuarios = prev.filter(user => user.login.uuid !== userId);
      saveToCache(nuevosUsuarios);
      return nuevosUsuarios;
    });
    
    const userDetailCacheKey = `user_${userId}`;
    localStorage.removeItem(userDetailCacheKey);
  }, [saveToCache]);

  // Función para filtrar usuarios
  const filtrarUsuarios = useCallback((filtros: {
    genero: string;
    nacionalidad: string;
    rangoEdad: { min: number; max: number };
  }) => {
    return usuarios.filter(user => {
      if (filtros.genero !== 'all' && user.gender !== filtros.genero) {
        return false;
      }
      
      if (filtros.nacionalidad !== 'all' && user.location.country !== filtros.nacionalidad) {
        return false;
      }
      
      if (user.dob.age < filtros.rangoEdad.min || user.dob.age > filtros.rangoEdad.max) {
        return false;
      }
      
      return true;
    });
  }, [usuarios]);

  const getNacionalidades = useCallback(() => {
    const nacionalidades = usuarios.map(user => user.location.country);
    return [...new Set(nacionalidades)];
  }, [usuarios]);

  const value = useMemo(() => ({
    usuarios,
    cargando,
    error,
    recargarUsuarios,
    eliminarUsuario,
    filtrarUsuarios,
    getNacionalidades,
  }), [
    usuarios, 
    cargando, 
    error, 
    recargarUsuarios, 
    eliminarUsuario, 
    filtrarUsuarios, 
    getNacionalidades
  ]);

  return (
    <UsuariosContext.Provider value={value}>
      {children}
    </UsuariosContext.Provider>
  );
};

export const useUsuariosContext = () => {
  const context = useContext(UsuariosContext);
  if (!context) {
    throw new Error('useUsuariosContext debe usarse dentro de UsuariosProvider');
  }
  return context;
};