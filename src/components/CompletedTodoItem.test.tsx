import { render, screen, fireEvent } from "@testing-library/react";
import { CompletedTodoItem } from "./CompletedTodoItem";
import "@testing-library/jest-dom";

// // Mock Button so we don't test MUI internals
// jest.mock("./Button", () => ({
//   Button: ({ children, onClick }: any) => (
//     <button onClick={onClick}>{children}</button>
//   ),
// }));

const categories = [
  { id: "1", name: "Work", color: "#6366f1" },
  { id: "2", name: "Personal", color: "#10b981" },
];

const todo = {
  id: "t1",
  title: "Finish project",
  createdAt: "2024-01-01T00:00:00.000Z",
  isCompleted: true,
  isArchive: false,
  category: "2",
  type: "text",
  content: "Done",
};

describe("CompletedTodoItem", () => {
  test("renders todo title", () => {
    render(
      <CompletedTodoItem
        todo={todo}
        onUncomplete={() => {}}
        categories={categories}
      />
    );

    expect(screen.getByText("Finish project")).toBeInTheDocument();
  });

  test("renders category badge", () => {
    render(
      <CompletedTodoItem
        todo={todo}
        onUncomplete={() => {}}
        categories={categories}
      />
    );

    expect(screen.getByText("Personal")).toBeInTheDocument();
  });

  test("renders formatted date", () => {
    render(
      <CompletedTodoItem
        todo={todo}
        onUncomplete={() => {}}
        categories={categories}
      />
    );

    const formatted = new Date(todo.createdAt).toLocaleDateString();
    expect(screen.getByText(formatted)).toBeInTheDocument();
  });

  test("calls onUncomplete when 'Mark active' is clicked", () => {
    const mockUncomplete = jest.fn();

    render(
      <CompletedTodoItem
        todo={todo}
        onUncomplete={mockUncomplete}
        categories={categories}
      />
    );

    fireEvent.click(screen.getByText("Mark active"));
    expect(mockUncomplete).toHaveBeenCalledTimes(1);
  });

  test("calls onDelete when delete button is clicked", () => {
    const mockDelete = jest.fn();

    render(
      <CompletedTodoItem
        todo={todo}
        onUncomplete={() => {}}
        onDelete={mockDelete}
        categories={categories}
      />
    );

    fireEvent.click(screen.getByText("delete"));
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });

  test("does not render delete button when onDelete is not provided", () => {
    render(
      <CompletedTodoItem
        todo={todo}
        onUncomplete={() => {}}
        categories={categories}
      />
    );

    expect(screen.queryByText("delete")).toBeNull();
  });

  test("changes opacity on hover", () => {
    const { container } = render(
      <CompletedTodoItem
        todo={todo}
        onUncomplete={() => {}}
        categories={categories}
      />
    );

    const li = container.querySelector("li")!;
    expect(li).toHaveStyle("opacity: 0.95");

    fireEvent.mouseEnter(li);
    expect(li).toHaveStyle("opacity: 1");

    fireEvent.mouseLeave(li);
    expect(li).toHaveStyle("opacity: 0.95");
  });
});
