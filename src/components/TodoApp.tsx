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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/20 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-primary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-secondary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-accent rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="max-w-2xl mx-auto pt-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold text-gradient mb-4 text-shadow animate-glow-pulse">
            Todo App
          </h1>
          <p className="text-muted-foreground text-lg">
            Stay organized and get things done ✨
          </p>
        </div>

        {/* Add Todo Form */}
        <div className="glass rounded-2xl p-6 mb-6 hover-lift animate-slide-up border-2 border-white/20">
          <div className="flex gap-4">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-1 h-14 text-base bg-white/50 dark:bg-black/20 border-white/30 focus-visible:ring-primary/50 focus-visible:border-primary/50 backdrop-blur-sm transition-all duration-300"
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
            />
            <Button 
              onClick={addTodo}
              variant="gradient"
              size="lg"
              className="px-8 h-14 shadow-glow-primary"
            >
              <Plus className="w-6 h-6" />
              Add Task
            </Button>
          </div>
        </div>

        {/* Stats and Filters */}
        <div className="glass rounded-2xl p-5 mb-6 animate-slide-up border-2 border-white/20" style={{animationDelay: '0.1s'}}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-8 text-sm">
              <span className="flex items-center gap-2 text-muted-foreground font-medium">
                <div className="w-3 h-3 rounded-full bg-gradient-secondary animate-pulse"></div>
                {activeCount} active
              </span>
              <span className="flex items-center gap-2 text-todo-complete font-medium">
                <div className="w-3 h-3 rounded-full bg-todo-complete animate-pulse"></div>
                {completedCount} completed
              </span>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "neon" : "glass"}
                size="sm"
                onClick={() => setFilter("all")}
                className="text-xs font-medium px-4"
              >
                <List className="w-3 h-3" />
                All
              </Button>
              <Button
                variant={filter === "active" ? "gradient" : "glass"}
                size="sm"
                onClick={() => setFilter("active")}
                className="text-xs font-medium px-4"
              >
                <Circle className="w-3 h-3" />
                Active
              </Button>
              <Button
                variant={filter === "completed" ? "complete" : "glass"}
                size="sm"
                onClick={() => setFilter("completed")}
                className="text-xs font-medium px-4"
              >
                <CheckCircle2 className="w-3 h-3" />
                Done
              </Button>
            </div>
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {filteredTodos.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center animate-scale-in border-2 border-white/20">
              <div className="text-muted-foreground text-lg">
                {filter === "all" && "✨ No todos yet. Add your first task above!"}
                {filter === "active" && "🎉 No active todos. You're all caught up!"}
                {filter === "completed" && "📝 No completed todos yet. Start checking things off!"}
              </div>
            </div>
          ) : (
            filteredTodos.map((todo, index) => (
              <div 
                key={todo.id} 
                className="animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <TodoItem
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {todos.length > 0 && (
          <div className="text-center mt-8 animate-fade-in">
            {completedCount > 0 && (
              <div className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full border-2 border-white/20">
                <span className="text-2xl">🎉</span>
                <p className="text-foreground font-medium">
                  You've completed {completedCount} {completedCount === 1 ? 'task' : 'tasks'}!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};