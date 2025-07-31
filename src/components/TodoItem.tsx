import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Circle, Trash2, Edit3, Save, X } from "lucide-react";
import { Todo } from "./TodoApp";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className={cn(
      "glass rounded-2xl transition-all duration-500 hover-lift group border-2",
      todo.completed 
        ? "opacity-80 border-todo-complete/30 shadow-glow-success" 
        : "border-white/20 hover:border-primary/30"
    )}>
      <div className="p-5">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggle(todo.id)}
            className={cn(
              "shrink-0 transition-all duration-500 hover:scale-110",
              todo.completed 
                ? "text-todo-complete hover:text-todo-complete shadow-glow-success" 
                : "text-muted-foreground hover:text-primary hover:bg-primary/10"
            )}
          >
            {todo.completed ? (
              <CheckCircle2 className="w-6 h-6 animate-bounce-in" />
            ) : (
              <Circle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            )}
          </Button>

          {isEditing ? (
            <div className="flex-1 flex items-center gap-3">
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 bg-white/50 dark:bg-black/20 border-white/30 focus-visible:ring-primary/50"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                  if (e.key === "Escape") handleCancel();
                }}
                autoFocus
              />
              <Button
                variant="glass"
                size="icon"
                onClick={handleSave}
                className="text-todo-complete hover:text-todo-complete hover:shadow-glow-success"
              >
                <Save className="w-4 h-4" />
              </Button>
              <Button
                variant="glass"
                size="icon"
                onClick={handleCancel}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <>
              <div 
                className={cn(
                  "flex-1 transition-all duration-500 cursor-pointer px-2",
                  todo.completed 
                    ? "line-through text-muted-foreground opacity-75" 
                    : "text-foreground hover:text-primary"
                )}
                onClick={() => onToggle(todo.id)}
              >
                <p className="text-lg font-medium mb-1">{todo.text}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary/60"></span>
                  {todo.createdAt.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Button
                  variant="glass"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10 hover:scale-110 transition-all duration-300"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="glass"
                  size="icon"
                  onClick={() => onDelete(todo.id)}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:scale-110 transition-all duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};