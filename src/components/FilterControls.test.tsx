import { render, screen, fireEvent } from "@testing-library/react";
import { FilterControls } from "./FilterControls";
import "@testing-library/jest-dom";

// Mock Input component
jest.mock("./Input", () => ({
  Input: ({ value, onChange, ...props }: any) => (
    <input
      data-testid={props["data-testid"] || "input"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  ),
}));

// Mock Button component
jest.mock("./Button", () => ({
  Button: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

const categories = [
  { id: "1", name: "Work", color: "#6366f1" },
  { id: "2", name: "Personal", color: "#10b981" },
];

const filters = {
  query: "",
  category: "",
  type: "all",
  fromDate: "",
  toDate: "",
  sortOrder: "asc",
};

describe("FilterControls", () => {
  test("updates search query", () => {
    const mockChange = jest.fn();

    render(
      <FilterControls
        filters={filters}
        onFilterChange={mockChange}
        onClearFilters={() => {}}
        categories={categories}
      />
    );

    const searchInput = screen.getAllByTestId("input")[0];
    fireEvent.change(searchInput, { target: { value: "hello" } });

    expect(mockChange).toHaveBeenCalledWith({ query: "hello" });
  });

  test("updates category filter", () => {
    const mockChange = jest.fn();

    render(
      <FilterControls
        filters={filters}
        onFilterChange={mockChange}
        onClearFilters={() => {}}
        categories={categories}
      />
    );

    const categorySelect = screen.getByRole("combobox", { name: /category/i });
    fireEvent.change(categorySelect, { target: { value: "2" } });
    expect(mockChange).toHaveBeenCalledWith({ category: "2" });

  });

  test("updates type filter", () => {
    const mockChange = jest.fn();

    render(
      <FilterControls
        filters={filters}
        onFilterChange={mockChange}
        onClearFilters={() => {}}
        categories={categories}
      />
    );

    const typeSelect = screen.getByRole("combobox", { name: /type/i });
    fireEvent.change(typeSelect, { target: { value: "image" } });
    expect(mockChange).toHaveBeenCalledWith({ type: "image" });

  });

  test("updates fromDate filter", () => {
    const mockChange = jest.fn();

    render(
      <FilterControls
        filters={filters}
        onFilterChange={mockChange}
        onClearFilters={() => {}}
        categories={categories}
      />
    );

    const fromDateInput = screen.getAllByTestId("input")[1];
    fireEvent.change(fromDateInput, { target: { value: "2024-01-01" } });

    expect(mockChange).toHaveBeenCalledWith({ fromDate: "2024-01-01" });
  });

  test("updates toDate filter", () => {
    const mockChange = jest.fn();

    render(
      <FilterControls
        filters={filters}
        onFilterChange={mockChange}
        onClearFilters={() => {}}
        categories={categories}
      />
    );

    const toDateInput = screen.getAllByTestId("input")[2];
    fireEvent.change(toDateInput, { target: { value: "2024-01-10" } });

    expect(mockChange).toHaveBeenCalledWith({ toDate: "2024-01-10" });
  });

  test("updates sort order", () => {
    const mockChange = jest.fn();

    render(
      <FilterControls
        filters={filters}
        onFilterChange={mockChange}
        onClearFilters={() => {}}
        categories={categories}
      />
    );

    const sortSelect = screen.getByRole("combobox", { name: /sort/i });
    fireEvent.change(sortSelect, { target: { value: "desc" } });
    expect(mockChange).toHaveBeenCalledWith({ sortOrder: "desc" });

  });

  test("calls onClearFilters when Clear Filters button is clicked", () => {
    const mockClear = jest.fn();

    render(
      <FilterControls
        filters={filters}
        onFilterChange={() => {}}
        onClearFilters={mockClear}
        categories={categories}
      />
    );

    fireEvent.click(screen.getByText(/Clear Filters/i));
    expect(mockClear).toHaveBeenCalledTimes(1);
  });
});
