import { render, screen } from "@testing-library/vue";
import Badge from "@/components/Badge.vue";

describe("Badge", () => {
  let props: {
    content: string | Node;
    title: string;
  };

  beforeEach(() => {
    props = {
      content: "show",
      title: "Ozark"
    };
  });

  it("should render a badge", () => {
    render(Badge, {
      props
    });

    const badge = screen.getByText("show");

    expect(badge).toBeVisible();
    expect(badge).toHaveAttribute("title", props.title);
    expect(badge).toMatchSnapshot();
  });

  it("should render a badge with HTML content", () => {
    props.content = `<i data-testid="test-id">Test</i>`;

    const { container } = render(Badge, {
      props
    });

    const htmlContent = screen.getByTestId("test-id");

    expect(htmlContent).toBeVisible();
    expect(htmlContent).toHaveTextContent("Test");
    expect(container.querySelector(".badge")).toMatchSnapshot();
  });

  it("should not render a badge if content isn't provided", () => {
    render(Badge);

    expect(screen.queryByText("show")).toBeFalsy();
  });
});
