import { render, screen, fireEvent } from "@testing-library/react";
import { CompletedList } from "./CompletedList";
import "@testing-library/jest-dom";

// Mock the child component so we test only CompletedList behavior
jest.mock("./CompletedTodoItem", () => ({
  CompletedTodoItem: ({ todo, onUncomplete, onDelete }: any) => (
    <div>
      <span>{todo.title}</span>
      <button onClick={onUncomplete}>Uncomplete</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  ),
}));

const categories = [
  { id: "1", name: "Work", color: "#6366f1" },
  { id: "2", name: "Personal", color: "#10b981" },
];

const todos = [
  {
    id: "c1",
    createdAt: Date.now(),
    title: "Completed todo #1",
    isCompleted: true,
    isArchive: false,
    category: "1",
    type: "text",
    content: "Done",
  },
  {
    id: "c2",
    createdAt: Date.now(),
    title: "Completed todo #2",
    isCompleted: true,
    isArchive: false,
    category: "2",
    type: "text",
    content: "Done",
  },
];

describe("CompletedList", () => {
  test("returns null when no completed todos", () => {
    const { container } = render(
      <CompletedList
        completedTodos={[]}
        onUncomplete={() => {}}
        onDelete={() => {}}
        categories={categories}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  test("renders header and count", () => {
    render(
      <CompletedList
        completedTodos={todos}
        onUncomplete={() => {}}
        onDelete={() => {}}
        categories={categories}
      />
    );

    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("renders each completed todo item", () => {
    render(
      <CompletedList
        completedTodos={todos}
        onUncomplete={() => {}}
        onDelete={() => {}}
        categories={categories}
      />
    );

    expect(screen.getByText("Completed todo #1")).toBeInTheDocument();
    expect(screen.getByText("Completed todo #2")).toBeInTheDocument();
  });

  test("calls onUncomplete with correct id", () => {
    const mockUncomplete = jest.fn();

    render(
      <CompletedList
        completedTodos={todos}
        onUncomplete={mockUncomplete}
        onDelete={() => {}}
        categories={categories}
      />
    );

    fireEvent.click(screen.getAllByText("Uncomplete")[0]);
    expect(mockUncomplete).toHaveBeenCalledTimes(1);
    expect(mockUncomplete).toHaveBeenCalledWith("c1");
  });

  test("calls onDelete with correct id", () => {
    const mockDelete = jest.fn();

    render(
      <CompletedList
        completedTodos={todos}
        onUncomplete={() => {}}
        onDelete={mockDelete}
        categories={categories}
      />
    );

    fireEvent.click(screen.getAllByText("Delete")[1]);
    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith("c2");
  });
});
