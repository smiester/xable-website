import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CMSStore } from '../types/cms';

export const useCMSStore = create<CMSStore>()(
  persist(
    (set) => ({
      sections: [],
      services: [],
      teamMembers: [],
      images: {},
      
      updateSection: (id, content) =>
        set((state) => ({
          sections: state.sections.map((section) =>
            section.id === id ? { ...section, ...content } : section
          ),
        })),

      addService: (service) =>
        set((state) => ({
          services: [...state.services, service],
        })),

      updateService: (id, service) =>
        set((state) => ({
          services: state.services.map((s) =>
            s.id === id ? { ...s, ...service } : s
          ),
        })),

      deleteService: (id) =>
        set((state) => ({
          services: state.services.filter((s) => s.id !== id),
        })),

      addTeamMember: (member) =>
        set((state) => ({
          teamMembers: [...state.teamMembers, member],
        })),

      updateTeamMember: (id, member) =>
        set((state) => ({
          teamMembers: state.teamMembers.map((m) =>
            m.id === id ? { ...m, ...member } : m
          ),
        })),

      deleteTeamMember: (id) =>
        set((state) => ({
          teamMembers: state.teamMembers.filter((m) => m.id !== id),
        })),

      updateImage: (section, url) =>
        set((state) => ({
          images: {
            ...state.images,
            [section]: url,
          },
        })),
    }),
    {
      name: 'cms-storage',
    }
  )
);