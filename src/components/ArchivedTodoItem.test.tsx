import { render, screen, fireEvent } from "@testing-library/react";
import { ArchivedTodoItem } from "./ArchivedTodoItem";
// import { Button } from "./Button"; // If Button is custom, mock it
import "@testing-library/jest-dom";

// Mock Button to simplify testing click behavior
jest.mock("./Button", () => ({
  Button: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

describe("ArchivedTodoItem", () => {
  const mockOnUnarchive = jest.fn();

  const mockTodo = {
    id: "1",
    title: "Archived Task",
    isCompleted: false,
    category: "cat1",
    createdAt: "2024-01-01T00:00:00.000Z",
  };

  const mockCategories = [
    { id: "cat1", name: "Work", color: "#3498db" },
    { id: "cat2", name: "Home", color: "#2ecc71" },
  ];

  beforeEach(() => {
    mockOnUnarchive.mockClear();
  });

  test("renders todo title", () => {
    render(
      <ArchivedTodoItem
        todo={mockTodo}
        onUnarchive={mockOnUnarchive}
        categories={mockCategories}
      />
    );

    expect(screen.getByText("Archived Task")).toBeInTheDocument();
  });

  test("renders category badge when category exists", () => {
    render(
      <ArchivedTodoItem
        todo={mockTodo}
        onUnarchive={mockOnUnarchive}
        categories={mockCategories}
      />
    );

    expect(screen.getByText("Work")).toBeInTheDocument();
  });

  test("renders formatted date", () => {
    render(
      <ArchivedTodoItem
        todo={mockTodo}
        onUnarchive={mockOnUnarchive}
        categories={mockCategories}
      />
    );

    const formattedDate = new Date(mockTodo.createdAt).toLocaleDateString();
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  test("calls onUnarchive when Restore button is clicked", () => {
    render(
      <ArchivedTodoItem
        todo={mockTodo}
        onUnarchive={mockOnUnarchive}
        categories={mockCategories}
      />
    );

    fireEvent.click(screen.getByText("↩️ Restore"));
    expect(mockOnUnarchive).toHaveBeenCalledTimes(1);
  });

  test("changes opacity on hover", () => {
    const { container } = render(
      <ArchivedTodoItem
        todo={mockTodo}
        onUnarchive={mockOnUnarchive}
        categories={mockCategories}
      />
    );

    const li = container.querySelector("li")!;
    expect(li).toHaveStyle("opacity: 0.92");

    fireEvent.mouseEnter(li);
    expect(li).toHaveStyle("opacity: 1");

    fireEvent.mouseLeave(li);
    expect(li).toHaveStyle("opacity: 0.92");
  });
});
