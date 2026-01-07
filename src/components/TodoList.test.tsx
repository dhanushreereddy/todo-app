import { render, screen, fireEvent } from "@testing-library/react";
import { TodosList } from "./TodoList";
import "@testing-library/jest-dom";

// Mock TodoItem so we test only TodosList behavior
jest.mock("./TodoItem", () => ({
  TodoItem: ({ todo, onToggle, onArchive, onDelete }: any) => (
    <div data-testid="todo-item">
      <span>{todo.title}</span>
      <button onClick={onToggle}>toggle</button>
      <button onClick={onArchive}>archive</button>
      <button onClick={onDelete}>delete</button>
    </div>
  ),
}));

const categories = [
  { id: "1", name: "Work", color: "#6366f1" },
  { id: "2", name: "Personal", color: "#10b981" },
];

const todos = [
  {
    id: "t1",
    title: "Todo #1",
    createdAt: Date.now(),
    isCompleted: false,
    isArchive: false,
    category: "1",
    type: "text",
    content: "Test",
  },
  {
    id: "t2",
    title: "Todo #2",
    createdAt: Date.now(),
    isCompleted: false,
    isArchive: false,
    category: "2",
    type: "text",
    content: "Test",
  },
];

describe("TodosList", () => {
  test("renders empty state when no todos", () => {
    render(
      <TodosList
        todos={[]}
        removeTodo={() => {}}
        toggleTodo={() => {}}
        toggleArchive={() => {}}
        categories={categories}
      />
    );

    expect(screen.getByText("No todos yet")).toBeInTheDocument();
    expect(
      screen.getByText("Create your first todo above to get started!")
    ).toBeInTheDocument();
  });

  test("renders header and count when todos exist", () => {
    render(
      <TodosList
        todos={todos}
        removeTodo={() => {}}
        toggleTodo={() => {}}
        toggleArchive={() => {}}
        categories={categories}
      />
    );

    expect(screen.getByText("✨ Active Todos")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("renders a TodoItem for each todo", () => {
    render(
      <TodosList
        todos={todos}
        removeTodo={() => {}}
        toggleTodo={() => {}}
        toggleArchive={() => {}}
        categories={categories}
      />
    );

    expect(screen.getAllByTestId("todo-item")).toHaveLength(2);
  });

  test("calls toggleTodo when toggle button is clicked", () => {
    const mockToggle = jest.fn();

    render(
      <TodosList
        todos={todos}
        removeTodo={() => {}}
        toggleTodo={mockToggle}
        toggleArchive={() => {}}
        categories={categories}
      />
    );

    fireEvent.click(screen.getAllByText("toggle")[0]);
    expect(mockToggle).toHaveBeenCalledWith("t1");
  });

  test("calls toggleArchive when archive button is clicked", () => {
    const mockArchive = jest.fn();

    render(
      <TodosList
        todos={todos}
        removeTodo={() => {}}
        toggleTodo={() => {}}
        toggleArchive={mockArchive}
        categories={categories}
      />
    );

    fireEvent.click(screen.getAllByText("archive")[1]);
    expect(mockArchive).toHaveBeenCalledWith("t2");
  });

  test("calls removeTodo when delete button is clicked", () => {
    const mockDelete = jest.fn();

    render(
      <TodosList
        todos={todos}
        removeTodo={mockDelete}
        toggleTodo={() => {}}
        toggleArchive={() => {}}
        categories={categories}
      />
    );

    fireEvent.click(screen.getAllByText("delete")[0]);
    expect(mockDelete).toHaveBeenCalledWith("t1");
  });
});
