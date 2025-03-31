import themeSettingsReducer, {
  toggleMenuCollapse,
} from "./../../src/redux/slices/themeSettings.slice";
interface ThemeSettingsState {
  isMenuCollapsed: boolean;
}

describe("themeSettingsSlice", () => {
  it("should return the initial state", () => {
    const initialState: ThemeSettingsState = {
      isMenuCollapsed: false,
    };
    expect(themeSettingsReducer(undefined, { type: "INIT" })).toEqual(
      initialState
    );
  });

  it("should handle toggleMenuCollapse", () => {
    const previousState: ThemeSettingsState = {
      isMenuCollapsed: false,
    };
    const expectedState: ThemeSettingsState = {
      isMenuCollapsed: true,
    };
    expect(themeSettingsReducer(previousState, toggleMenuCollapse())).toEqual(
      expectedState
    );
  });

  it("should toggle isMenuCollapsed back to false", () => {
    const previousState: ThemeSettingsState = {
      isMenuCollapsed: true,
    };
    const expectedState: ThemeSettingsState = {
      isMenuCollapsed: false,
    };
    expect(themeSettingsReducer(previousState, toggleMenuCollapse())).toEqual(
      expectedState
    );
  });
});
