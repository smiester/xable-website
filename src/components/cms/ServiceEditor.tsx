import React, { useState } from 'react';
import { useCMSStore } from '../../store/cmsStore';
import { ServiceItem } from '../../types/cms';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export function ServiceEditor() {
  const services = useCMSStore((state) => state.services);
  const addService = useCMSStore((state) => state.addService);
  const updateService = useCMSStore((state) => state.updateService);
  const deleteService = useCMSStore((state) => state.deleteService);

  const [newService, setNewService] = useState<Partial<ServiceItem>>({
    title: '',
    description: '',
    icon: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newService.title && newService.description) {
      addService({
        ...newService,
        id: Date.now().toString(),
        order: services.length,
      } as ServiceItem);
      setNewService({ title: '', description: '', icon: '' });
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(services);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    items.forEach((item, index) => {
      updateService(item.id, { order: index });
    });
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={newService.title}
              onChange={(e) => setNewService({ ...newService, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              rows={3}
            />
          </div>
          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
              Icon Name
            </label>
            <input
              type="text"
              id="icon"
              value={newService.icon}
              onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Add Service
          </button>
        </div>
      </form>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="services">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {services
                .sort((a, b) => a.order - b.order)
                .map((service, index) => (
                  <Draggable
                    key={service.id}
                    draggableId={service.id}
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
                              {service.title}
                            </h3>
                            <p className="mt-1 text-gray-600">
                              {service.description}
                            </p>
                          </div>
                          <button
                            onClick={() => deleteService(service.id)}
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