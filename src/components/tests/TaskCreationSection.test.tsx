import { render, screen } from "@testing-library/react";
import { TaskCreationSection } from "../TaskCreationSection";

describe("TaskCreationSection", () => {
  const mockOnCreateTask = jest.fn();

  it("renders the component with correct elements", () => {
    render(<TaskCreationSection onCreateTask={mockOnCreateTask} />);

    expect(screen.getByText("Add New Task")).toBeInTheDocument();
    expect(screen.getByLabelText("Task description")).toBeInTheDocument();
    expect(screen.getByLabelText("Add new task")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter a new task...")).toBeInTheDocument();
  });
});