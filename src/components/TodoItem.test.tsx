import { render, screen, fireEvent } from "@testing-library/react";
import { TodoItem } from "./TodoItem";
import "@testing-library/jest-dom";

// Mock Button so we don't test MUI or custom Button internals
jest.mock("./Button", () => ({
  Button: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

const categories = [
  { id: "1", name: "Work", color: "#6366f1" },
  { id: "2", name: "Personal", color: "#10b981" },
];

const baseTodo = {
  id: "t1",
  title: "Test Todo",
  createdAt: "2024-01-01T00:00:00.000Z",
  isCompleted: false,
  isArchive: false,
  category: "2",
  type: "text",
  content: "This is a test todo",
};

describe("TodoItem", () => {
  test("renders title", () => {
    render(
      <TodoItem
        todo={baseTodo}
        onToggle={() => {}}
        onArchive={() => {}}
        onDelete={() => {}}
        categories={categories}
      />
    );

    expect(screen.getByText("Test Todo")).toBeInTheDocument();
  });

  test("renders category badge", () => {
    render(
      <TodoItem
        todo={baseTodo}
        onToggle={() => {}}
        onArchive={() => {}}
        onDelete={() => {}}
        categories={categories}
      />
    );

    expect(screen.getByText("Personal")).toBeInTheDocument();
  });

  test("renders text content for text-type todos", () => {
    render(
      <TodoItem
        todo={baseTodo}
        onToggle={() => {}}
        onArchive={() => {}}
        onDelete={() => {}}
        categories={categories}
      />
    );

    expect(screen.getByText("This is a test todo")).toBeInTheDocument();
  });

  test("calls onToggle when checkbox is clicked", () => {
    const mockToggle = jest.fn();

    render(
      <TodoItem
        todo={baseTodo}
        onToggle={mockToggle}
        onArchive={() => {}}
        onDelete={() => {}}
        categories={categories}
      />
    );

    fireEvent.click(screen.getByRole("checkbox"));
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  test("calls onArchive when archive button is clicked", () => {
    const mockArchive = jest.fn();

    render(
      <TodoItem
        todo={baseTodo}
        onToggle={() => {}}
        onArchive={mockArchive}
        onDelete={() => {}}
        categories={categories}
      />
    );

    fireEvent.click(screen.getByText("archive"));
    expect(mockArchive).toHaveBeenCalledTimes(1);
  });

  test("calls onDelete when delete button is clicked", () => {
    const mockDelete = jest.fn();

    render(
      <TodoItem
        todo={baseTodo}
        onToggle={() => {}}
        onArchive={() => {}}
        onDelete={mockDelete}
        categories={categories}
      />
    );

    fireEvent.click(screen.getByText("delete"));
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });

  test("renders image when type is image", () => {
    const imageTodo = {
      ...baseTodo,
      type: "image",
      imageUrl: "http://example.com/image.jpg",
    };

    render(
      <TodoItem
        todo={imageTodo}
        onToggle={() => {}}
        onArchive={() => {}}
        onDelete={() => {}}
        categories={categories}
      />
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", imageTodo.imageUrl);
  });

  test("renders location details when type is location", () => {
    const locationTodo = {
      ...baseTodo,
      type: "location",
      location: {
        lat: 12.345678,
        lng: 98.765432,
        address: "123 Test Street",
      },
    };

    render(
      <TodoItem
        todo={locationTodo}
        onToggle={() => {}}
        onArchive={() => {}}
        onDelete={() => {}}
        categories={categories}
      />
    );

    expect(screen.getByText("Location Details")).toBeInTheDocument();
    expect(screen.getByText("123 Test Street")).toBeInTheDocument();
  });

  test("changes hover state (opacity/transform) on mouse enter/leave", () => {
    const { container } = render(
      <TodoItem
        todo={baseTodo}
        onToggle={() => {}}
        onArchive={() => {}}
        onDelete={() => {}}
        categories={categories}
      />
    );

    const wrapper = container.firstChild as HTMLElement;

    // initial state
    expect(wrapper).toHaveStyle("transform: translateY(0)");

    fireEvent.mouseEnter(wrapper);
    expect(wrapper).toHaveStyle("transform: translateY(-2px)");

    fireEvent.mouseLeave(wrapper);
    expect(wrapper).toHaveStyle("transform: translateY(0)");
  });
});
