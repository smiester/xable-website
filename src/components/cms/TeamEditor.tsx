import React, { useState } from 'react';
import { useCMSStore } from '../../store/cmsStore';
import { TeamMember } from '../../types/cms';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export function TeamEditor() {
  const teamMembers = useCMSStore((state) => state.teamMembers);
  const addTeamMember = useCMSStore((state) => state.addTeamMember);
  const updateTeamMember = useCMSStore((state) => state.updateTeamMember);
  const deleteTeamMember = useCMSStore((state) => state.deleteTeamMember);

  const [newMember, setNewMember] = useState<Partial<TeamMember>>({
    name: '',
    role: '',
    bio: '',
    imageUrl: '',
    qualifications: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMember.name && newMember.role) {
      addTeamMember({
        ...newMember,
        id: Date.now().toString(),
        order: teamMembers.length,
        qualifications: newMember.qualifications || [],
      } as TeamMember);
      setNewMember({ name: '', role: '', bio: '', imageUrl: '', qualifications: [] });
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(teamMembers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    items.forEach((item, index) => {
      updateTeamMember(item.id, { order: index });
    });
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              id="role"
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              value={newMember.bio}
              onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              rows={3}
            />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              value={newMember.imageUrl}
              onChange={(e) => setNewMember({ ...newMember, imageUrl: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700">
              Qualifications (comma-separated)
            </label>
            <input
              type="text"
              id="qualifications"
              value={newMember.qualifications?.join(', ')}
              onChange={(e) =>
                setNewMember({
                  ...newMember,
                  qualifications: e.target.value.split(',').map((q) => q.trim()),
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Add Team Member
          </button>
        </div>
      </form>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="team">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {teamMembers
                .sort((a, b) => a.order - b.order)
                .map((member, index) => (
                  <Draggable
                    key={member.id}
                    draggableId={member.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white shadow rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {member.name}
                            </h3>
                            <p className="text-sm text-purple-600">{member.role}</p>
                            <p className="mt-2 text-gray-600">{member.bio}</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {member.qualifications.map((qual, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                                >
                                  {qual}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={() => deleteTeamMember(member.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}