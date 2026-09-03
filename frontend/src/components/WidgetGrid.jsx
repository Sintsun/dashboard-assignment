import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { WidgetShell } from './WidgetShell';
import { AttentionWidget } from './widgets/AttentionWidget';
import { CategoryWidget } from './widgets/CategoryWidget';
import { RecentWidget } from './widgets/RecentWidget';
import { TicketListWidget } from './widgets/TicketListWidget';

const widgetMap = {
  attention: AttentionWidget,
  categories: CategoryWidget,
  tickets: TicketListWidget,
  recent: RecentWidget,
};

export function WidgetGrid({ widgets, tickets, onReorder }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    onReorder(active.id, over.id);
  };

  if (widgets.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-rule bg-card px-4 py-10 text-center text-sm text-muted">
        All widgets are hidden. Use Customise board to bring them back.
      </p>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={widgets.map((widget) => widget.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {widgets.map((widget) => {
            const Body = widgetMap[widget.id];
            return (
              <WidgetShell
                key={widget.id}
                id={widget.id}
                title={widget.title}
                hint={widget.hint}
                span={widget.span}
              >
                <Body tickets={tickets} />
              </WidgetShell>
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}
