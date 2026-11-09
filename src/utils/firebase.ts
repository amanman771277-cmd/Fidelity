import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  Firestore
} from 'firebase/firestore';
import { Project, FirebaseConfigState } from '../types.ts';
import { DEFAULT_FIREBASE_CONFIG, INITIAL_PROJECTS } from './portfolio.ts';

const STORAGE_KEY_CONFIG = 'fidelity_business_group_firebase_config_v3';
export const FIRESTORE_COLLECTION_NAME = 'posts';

let activeApp: FirebaseApp | null = null;
let activeDb: Firestore | null = null;

export function getStoredFirebaseConfig(): FirebaseConfigState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Could not read stored Firebase config:', err);
  }
  return DEFAULT_FIREBASE_CONFIG;
}

export function saveStoredFirebaseConfig(config: FirebaseConfigState): void {
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  } catch (err) {
    console.error('Could not save Firebase config to storage:', err);
  }
}

export function isFirebaseConfigured(config: FirebaseConfigState): boolean {
  return (
    Boolean(config.apiKey) &&
    !config.apiKey.includes('DEMO_KEY') &&
    Boolean(config.projectId) &&
    Boolean(config.appId)
  );
}

export function initFirebaseService(config: FirebaseConfigState): Firestore | null {
  if (!isFirebaseConfigured(config)) {
    return null;
  }

  try {
    const apps = getApps();
    if (apps.length > 0) {
      activeApp = apps[0];
    } else {
      activeApp = initializeApp(config);
    }
    activeDb = getFirestore(activeApp);
    return activeDb;
  } catch (err) {
    console.error('Firebase initialization error:', err);
    return null;
  }
}

let memoryProjects: Project[] = [...INITIAL_PROJECTS];

/**
 * In-memory projects cache (posts are saved directly to Firestore, not localStorage)
 */
export function getLocalProjects(): Project[] {
  return memoryProjects;
}

export function saveLocalProjects(projects: Project[]): void {
  memoryProjects = projects;
}

/**
 * Subscribe to real-time project updates from Firestore collection 'posts'.
 * Uses onSnapshot for real-time live synchronization for all visitors.
 * If Firestore is not yet configured, uses the initial in-memory seed without localStorage.
 */
export function subscribeToProjects(
  config: FirebaseConfigState,
  onUpdate: (projects: Project[], isFirebaseLive: boolean) => void
): () => void {
  const db = initFirebaseService(config);

  if (!db) {
    // In-memory mode (no localStorage for posts)
    onUpdate(memoryProjects, false);
    return () => {};
  }

  // Live Firestore mode on collection 'posts'
  try {
    const colRef = collection(db, FIRESTORE_COLLECTION_NAME);
    const q = query(colRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          // If Firestore collection 'posts' is empty, provide default showcase works
          onUpdate(INITIAL_PROJECTS, true);
        } else {
          const remoteProjects: Project[] = [];
          snapshot.forEach((docSnapshot) => {
            const data = docSnapshot.data() as Omit<Project, 'id'>;
            remoteProjects.push({
              id: docSnapshot.id,
              ...data
            });
          });
          memoryProjects = remoteProjects;
          onUpdate(remoteProjects, true);
        }
      },
      (error) => {
        console.warn('Firestore subscription notice, falling back to memory:', error.message);
        onUpdate(memoryProjects, false);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn('Firestore subscription initialization error:', err);
    onUpdate(memoryProjects, false);
    return () => {};
  }
}

/**
 * Add a new post to Firestore collection 'posts' (or local storage fallback)
 */
export async function addProjectToStore(
  projectData: Omit<Project, 'id' | 'createdAt'>,
  config: FirebaseConfigState
): Promise<Project> {
  const createdAt = Date.now();
  const db = initFirebaseService(config);

  if (db) {
    try {
      const colRef = collection(db, FIRESTORE_COLLECTION_NAME);
      const docRef = await addDoc(colRef, {
        ...projectData,
        createdAt
      });
      const newProject: Project = {
        id: docRef.id,
        ...projectData,
        createdAt
      };
      memoryProjects = [newProject, ...memoryProjects];
      return newProject;
    } catch (err) {
      console.warn('Failed to add to Firestore collection "posts":', err);
    }
  }

  // Fallback in-memory
  const newProject: Project = {
    id: `post-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    ...projectData,
    createdAt
  };
  memoryProjects = [newProject, ...memoryProjects];
  return newProject;
}

/**
 * Delete a post from Firestore collection 'posts'
 */
export async function deleteProjectFromStore(
  id: string,
  config: FirebaseConfigState
): Promise<void> {
  const db = initFirebaseService(config);

  if (db && !id.startsWith('post-') && !id.startsWith('fid-')) {
    try {
      await deleteDoc(doc(db, FIRESTORE_COLLECTION_NAME, id));
    } catch (err) {
      console.warn('Failed to delete from Firestore collection "posts":', err);
    }
  }

  memoryProjects = memoryProjects.filter((p) => p.id !== id);
}

/**
 * Update an existing post in Firestore collection 'posts'
 */
export async function updateProjectInStore(
  id: string,
  updatedData: Partial<Omit<Project, 'id'>>,
  config: FirebaseConfigState
): Promise<Project> {
  const db = initFirebaseService(config);

  if (db && !id.startsWith('fid-')) {
    try {
      await updateDoc(doc(db, FIRESTORE_COLLECTION_NAME, id), updatedData);
    } catch (err) {
      console.warn('Failed to update in Firestore collection "posts":', err);
    }
  }

  let updatedProject: Project | null = null;
  memoryProjects = memoryProjects.map((p) => {
    if (p.id === id) {
      updatedProject = { ...p, ...updatedData };
      return updatedProject;
    }
    return p;
  });

  if (updatedProject) {
    return updatedProject;
  }

  const fallback: Project = { id, ...updatedData } as Project;
  memoryProjects = [fallback, ...memoryProjects];
  return fallback;
}

