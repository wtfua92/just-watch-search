import { render, screen, ComponentHarness } from "@testing-library/vue";

import SearchItem from "@/components/SearchItem.vue";
import { SearchItemInterface } from "@/utils/types";

// @ts-ignore
const renderSearchItem = props =>
  render(SearchItem, {
    props
  });

describe("SearchItem", () => {
  let props: SearchItemInterface;
  let component: ComponentHarness;

  beforeEach(() => {
    props = {
      id: 123,
      title: "Ozark",
      poster: "/POSTER.jpg",
      type: "show",
      year: 2017,
      rating: 100.234
    };

    component = renderSearchItem(props);
  });

  it("should render Search Item", () => {
    expect(component.baseElement).toMatchSnapshot();
  });

  it("should convert rating to 1 fraction digit", () => {
    expect(screen.getByText("100.2 ★")).toBeVisible();
  });

  it("should convert poster to full image url", () => {
    const { container } = component;
    expect(container.querySelector(".search-result__item")).toHaveAttribute(
      "style",
      "background-image: url(https://images.justwatch.com/POSTER.jpg);"
    );
  });
});
