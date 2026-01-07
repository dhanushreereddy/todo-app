import { render, screen, fireEvent } from "@testing-library/react";
import { ArchiveList } from "./ArchiveList";
import { ArchivedTodoItem } from "./ArchivedTodoItem";
import "@testing-library/jest-dom";

// Mock child component if ArchiveList uses ArchivedTodoItem internally
jest.mock("./ArchivedTodoItem", () => ({
  ArchivedTodoItem: ({ todo, onUnarchive }: any) => (
    <div>
      <span>{todo.title}</span>
      <button onClick={onUnarchive}>Restore</button>
    </div>
  ),
}));

const categories = [
  { id: "1", name: "Work", color: "#6366f1" },
  { id: "2", name: "Personal", color: "#10b981" },
];

const todos = [
  {
    id: "arch-1",
    createdAt: Date.now(),
    title: "Archived todo #1",
    isCompleted: false,
    isArchive: true,
    category: "2",
    type: "text",
    content: "This todo is archived",
  },
  {
    id: "arch-2",
    createdAt: Date.now(),
    title: "Archived todo #2",
    isCompleted: true,
    isArchive: true,
    category: "2",
    type: "text",
    content: "This todo is archived",
  },
];

describe("ArchiveList", () => {
  test("renders archived todos", () => {
    render(
      <ArchiveList
        archivedTodos={todos}
        unarchiveTodo={() => {}}
        categories={categories}
      />
    );

    expect(screen.getByText("Archived todo #1")).toBeInTheDocument();
    expect(screen.getByText("Archived todo #2")).toBeInTheDocument();
  });

  test("renders empty state when no todos", () => {
    render(
      <ArchiveList
        archivedTodos={[]}
        unarchiveTodo={() => {}}
        categories={categories}
      />
    );

    expect(screen.getByText(/no archived todos/i)).toBeInTheDocument();
  });

  test("calls unarchiveTodo when restore is clicked", () => {
    const mockUnarchive = jest.fn();

    render(
      <ArchiveList
        archivedTodos={todos}
        unarchiveTodo={mockUnarchive}
        categories={categories}
      />
    );

    fireEvent.click(screen.getAllByText("Restore")[0]);
    expect(mockUnarchive).toHaveBeenCalledTimes(1);
  });
});
