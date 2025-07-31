import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TodoItem } from "./TodoItem";
import { Plus, CheckCircle2, Circle, List } from "lucide-react";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

type FilterType = "all" | "active" | "completed";

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTodos([todo, ...todos]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-todo-gradient bg-clip-text text-transparent mb-2">
            Todo App
          </h1>
          <p className="text-muted-foreground">
            Stay organized and get things done
          </p>
        </div>

        {/* Add Todo Form */}
        <div className="bg-card rounded-xl shadow-card border p-6 mb-6">
          <div className="flex gap-3">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-1 h-12 text-base border-border/50 focus-visible:ring-primary/50"
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
            />
            <Button 
              onClick={addTodo}
              variant="gradient"
              size="lg"
              className="px-6"
            >
              <Plus className="w-5 h-5" />
              Add
            </Button>
          </div>
        </div>

        {/* Stats and Filters */}
        <div className="bg-card rounded-xl shadow-card border p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Circle className="w-4 h-4" />
                {activeCount} active
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-todo-complete" />
                {completedCount} completed
              </span>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "gradient" : "ghost"}
                size="sm"
                onClick={() => setFilter("all")}
                className="text-xs"
              >
                <List className="w-3 h-3" />
                All
              </Button>
              <Button
                variant={filter === "active" ? "gradient" : "ghost"}
                size="sm"
                onClick={() => setFilter("active")}
                className="text-xs"
              >
                <Circle className="w-3 h-3" />
                Active
              </Button>
              <Button
                variant={filter === "completed" ? "complete" : "ghost"}
                size="sm"
                onClick={() => setFilter("completed")}
                className="text-xs"
              >
                <CheckCircle2 className="w-3 h-3" />
                Done
              </Button>
            </div>
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="bg-card rounded-xl shadow-card border p-8 text-center">
              <div className="text-muted-foreground">
                {filter === "all" && "No todos yet. Add one above!"}
                {filter === "active" && "No active todos. Great job!"}
                {filter === "completed" && "No completed todos yet."}
              </div>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {todos.length > 0 && (
          <div className="text-center mt-8 text-sm text-muted-foreground">
            {completedCount > 0 && (
              <p>🎉 You've completed {completedCount} {completedCount === 1 ? 'task' : 'tasks'}!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};