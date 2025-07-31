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
      "bg-card rounded-xl shadow-card border transition-all duration-300 hover:shadow-lg group",
      todo.completed && "opacity-75"
    )}>
      <div className="p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggle(todo.id)}
            className={cn(
              "shrink-0 transition-all duration-300",
              todo.completed 
                ? "text-todo-complete hover:text-todo-complete/80" 
                : "text-muted-foreground hover:text-primary"
            )}
          >
            {todo.completed ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </Button>

          {isEditing ? (
            <div className="flex-1 flex items-center gap-2">
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                  if (e.key === "Escape") handleCancel();
                }}
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSave}
                className="text-todo-complete hover:text-todo-complete/80"
              >
                <Save className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancel}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <>
              <div 
                className={cn(
                  "flex-1 transition-all duration-300 cursor-pointer",
                  todo.completed 
                    ? "line-through text-muted-foreground" 
                    : "text-foreground"
                )}
                onClick={() => onToggle(todo.id)}
              >
                <p className="text-base">{todo.text}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {todo.createdAt.toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(todo.id)}
                  className="text-muted-foreground hover:text-destructive"
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